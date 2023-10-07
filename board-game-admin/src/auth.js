import auth0 from 'auth0-js';
import env from './App/environmentVariables';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: env.authDomain,
      clientID: env.authClientId,
      redirectUri: env.authCallbackUrl,
      responseType: 'token id_token',
      audience: env.apiIdentifier,
      scope:
        'openid profile create:game-collection read:game-collections create:copy delete:copy create:attendee update:attendee update:copy'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  renewSession() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve(authResult);
        } else if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
          return reject(err);
        }
      });
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.accessToken = authResult.accessToken;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  signOut() {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.accessToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.auth0.logout({ returnTo: env.logoutReturnUrl });
  }
}

const auth0Client = new Auth();

export default auth0Client;
