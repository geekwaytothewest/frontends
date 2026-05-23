import { createAuth0Client } from '@auth0/auth0-spa-js';
import env from './App/environmentVariables';

class Auth {
  constructor() {
    this.auth0Client = null;
    this._isAuthenticated = false;
    this._profile = null;

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.renewSession = this.renewSession.bind(this);

    this.clientReady = createAuth0Client({
      domain: env.authDomain,
      clientId: env.authClientId,
      authorizationParams: {
        redirect_uri: env.authCallbackUrl,
        audience: env.apiIdentifier,
        scope: 'openid offline_access profile create:game-collection read:game-collections create:copy delete:copy create:attendee update:attendee update:copy',
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }).then(client => {
      this.auth0Client = client;
      return client;
    });
  }

  isAuthenticated() {
    return this._isAuthenticated;
  }

  getProfile() {
    return this._profile;
  }

  async getAccessToken() {
    await this.clientReady;
    return this.auth0Client.getTokenSilently();
  }

  signIn() {
    this.clientReady.then(() => this.auth0Client.loginWithRedirect());
  }

  async renewSession() {
    await this.clientReady;
    try {
      await this.auth0Client.getTokenSilently();
      this._isAuthenticated = await this.auth0Client.isAuthenticated();
      if (this._isAuthenticated) {
        this._profile = await this.auth0Client.getUser();
      }
    } catch {
      this._isAuthenticated = false;
      this._profile = null;
    }
  }

  async handleAuthentication() {
    await this.clientReady;
    await this.auth0Client.handleRedirectCallback();
    this._isAuthenticated = await this.auth0Client.isAuthenticated();
    if (this._isAuthenticated) {
      this._profile = await this.auth0Client.getUser();
    }
  }

  signOut() {
    this._isAuthenticated = false;
    this._profile = null;
    if (this.auth0Client) {
      this.auth0Client.logout({
        logoutParams: {
          returnTo: env.logoutReturnUrl,
        },
      });
    }
  }
}

const auth0Client = new Auth();
export default auth0Client;
