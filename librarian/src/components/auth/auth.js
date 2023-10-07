import history from '../../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  tokenRenewalTimeout;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiIdentifier,
    responseType: 'token id_token',
    scope:
      'openid read:recent-checkouts read:longest-checkouts create:checkout update:checkout read:copy-search read:copy'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.scheduleRenewal = this.scheduleRenewal.bind(this);
    this.renewToken = this.renewToken.bind(this);

    this.scheduleRenewal();
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace(window.location.pathname);
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

    this.auth0.logout({ returnTo: AUTH_CONFIG.logoutReturnUrl });

    // LOGOUT_RETURN_URL
    // navigate to the home route
    // history.replace(window.location.pathname);
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
            Refresh the page. 
            If the issue continues, let your administrator know.`
        );
      } else {
        this.setSession(result);
      }
    });
  }

  scheduleRenewal() {
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    var delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }
}
