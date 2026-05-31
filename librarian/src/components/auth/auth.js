import { createAuth0Client } from '@auth0/auth0-spa-js';
import history from '../../history';
import { AUTH_CONFIG } from './auth0-variables';

class Auth {
  constructor() {
    this.auth0Client = null;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
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
    // The callback URL is convention-independent, so stash the convention path
    // (/org/{id}/con/{id}/librarian/...) in appState and restore it after login.
    const returnTo = window.location.pathname + window.location.search + window.location.hash;
    await this.auth0Client.loginWithRedirect({ appState: { returnTo } });
  }

  async handleAuthentication(successCallback) {
    await this.clientReady;
    try {
      const result = await this.auth0Client.handleRedirectCallback();
      const returnTo = result && result.appState && result.appState.returnTo;
      if (returnTo && new URL(returnTo, window.location.origin).pathname !== window.location.pathname) {
        // Different convention prefix than the callback URL — full-page navigate
        // so the router basename and API base recompute under it.
        window.location.replace(returnTo);
        return;
      }
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
    if (this.auth0Client) {
      this.auth0Client.logout({
        logoutParams: {
          returnTo: AUTH_CONFIG.logoutReturnUrl,
        },
      });
    }
  }

  async getAccessToken() {
    await this.clientReady;
    try {
      return await this.auth0Client.getTokenSilently();
    } catch (err) {
      if (['login_required', 'invalid_grant', 'missing_refresh_token', 'consent_required'].includes(err.error)) {
        await this.login();
      }
      throw err;
    }
  }
}

export const authInstance = new Auth();
export default Auth;
