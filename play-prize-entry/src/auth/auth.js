import { createAuth0Client } from '@auth0/auth0-spa-js';
import history from '../history';
import { AUTH_CONFIG } from './auth0-variables';

class Auth {
  tokenRenewalTimeout;
  auth0Client = null;
  clientReady;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.scheduleRenewal = this.scheduleRenewal.bind(this);
    this.renewToken = this.renewToken.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);

    this.clientReady = createAuth0Client({
      domain: AUTH_CONFIG.domain,
      clientId: AUTH_CONFIG.clientId,
      authorizationParams: {
        redirect_uri: AUTH_CONFIG.callbackUrl,
        audience: AUTH_CONFIG.apiIdentifier,
        scope: 'openid offline_access',
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }).then(client => {
      this.auth0Client = client;
      return client;
    });
  }

  async login() {
    await this.clientReady;
    await this.auth0Client.loginWithRedirect();
  }

  async handleAuthentication(successCallback) {
    await this.clientReady;
    try {
      await this.auth0Client.handleRedirectCallback();
      await this.scheduleRenewal();
      history.replace(window.location.pathname);
      successCallback(true);
    } catch (err) {
      history.replace(window.location.pathname);
      alert(`Error: ${err.error || err.message}. Check the console for further details.`);
    }
  }

  async isAuthenticated() {
    await this.clientReady;
    return this.auth0Client.isAuthenticated();
  }

  logout() {
    clearTimeout(this.tokenRenewalTimeout);
    if (this.auth0Client) {
      this.auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    }
  }

  async getAccessToken() {
    await this.clientReady;
    return this.auth0Client.getTokenSilently();
  }

  async renewToken() {
    await this.clientReady;
    try {
      await this.auth0Client.getTokenSilently();
      await this.scheduleRenewal();
    } catch (err) {
      alert(
        `Could not get a new token (${err.error}: ${err.message}).
          If the issue continues, let your administrator know.`
      );
      this.logout();
    }
  }

  async scheduleRenewal() {
    await this.clientReady;
    clearTimeout(this.tokenRenewalTimeout);

    const claims = await this.auth0Client.getIdTokenClaims();
    if (!claims) return;

    const expiresAt = claims.exp * 1000;
    const delay = expiresAt - Date.now() - (5 * 60 * 60 * 1000);

    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    } else {
      this.renewToken();
    }
  }
}

export const authInstance = new Auth();
export default Auth;
