import auth0 from 'auth0-js';
import history from '../history';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  tokenRenewalTimeout;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiIdentifier,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.scheduleRenewal = this.scheduleRenewal.bind(this);
    this.renewToken = this.renewToken.bind(this);

    this.renewToken();
    this.scheduleRenewal();
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(successCallback) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace(window.location.pathname);
        successCallback(true);
      } else if (err) {
        history.replace(window.location.pathname);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.scheduleRenewal();

    // navigate to the home route
    history.replace(window.location.pathname);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    clearTimeout(this.tokenRenewalTimeout);
    // navigate to the home route
    history.replace(window.location.pathname);
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).
            Close this dialog box to retry.
            If the issue continues, let your administrator know.`
        );
        setTimeout(() => {
          this.renewToken();
        }, 12 * 60 * 60 * 1000); // Retry after 12 hours
      } else {
        this.setSession(result);
      }
    });
  }

  scheduleRenewal() {
    this.tokenRenewalTimeout = setTimeout(() => {
      this.renewToken();
    }, 3 * 60 * 60 * 1000); // 3 hour refresh
  }
}
