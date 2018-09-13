/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The handler for authentication.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import auth0 from 'auth0-js';

import { decrypt, encrypt, env, Store } from '#utilities';

import { Auth0DecodedHash } from 'auth0-js';

import { Redirection } from '#definitions';

// take the api variables
const { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } = env;

const additionalScopes = ['email']; // a list of extra scopes to be requested
export const scope = ['openid', 'profile', ...additionalScopes].join(' ');
export const responseType = 'token id_token';

export class AuthError extends Error {
  constructor(message: string = 'access denied') {
    super(message);

    Error.captureStackTrace(this, AuthError);
  }
}

export class Auth {
  // an encrpyted store used for storing the authentication information
  private store: Store = new Store();

  // initialise the auth0 instance
  private auth0: auth0.WebAuth = new auth0.WebAuth({
    audience: AUTH0_AUDIENCE, // the API address where the app will talk to
    domain: AUTH0_DOMAIN, // an auth0 domain where the login procedure happens
    clientID: AUTH0_CLIENT_ID, // the client ID of the Auto0 application
    redirectUri: `${typeof window !== `undefined` &&
      window.location.origin}/auth`, // the URI where auth0 will redirect the browser to
    scope,
    responseType,
  });

  // setup a timer for token renewal
  private tokenRenewalTimeout: NodeJS.Timer;

  constructor() {
    // bind the functions for prop mapping
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);

    // schedule a token renewal
    this.scheduleTokenRenewal();
  }

  /** get access token  */
  public get accessToken(): string | null {
    return this.store.get('access_token');
  }

  /** get expiresAt */
  public get expiresAt(): number {
    const expiresAt = this.store.get('expires_at');

    return expiresAt ? Number(expiresAt) : 0;
  }

  /** get id token  */
  public get idToken(): string | null {
    return this.store.get('id_token');
  }

  /** check if the current session is active */
  public get isAuthenticated(): boolean {
    return (
      this.idToken !== null &&
      this.accessToken !== null &&
      new Date().getTime() < this.expiresAt
    );
  }

  /** get grantedScopes */
  public get grantedScopes(): string[] {
    const grantedScopes = this.store.get('scopes');

    return grantedScopes ? JSON.parse(grantedScopes) : [];
  }

  /** get a user profile from auth0  */
  public async getProfile(): Promise<auth0.Auth0UserProfile | null> {
    const accessToken = this.accessToken;

    if (accessToken && this.isAuthenticated) {
      // use the accessToken to read the profile
      return new Promise<auth0.Auth0UserProfile>(
        (resolve, reject): void => {
          this.auth0.client.userInfo(
            accessToken,
            (error, profile): void => {
              if (error) {
                reject(error);
              } else {
                resolve(profile);
              }
            }
          );
        }
      );
    } else {
      return null;
    }
  }

  /**
   * handle the hash passed to the call back page after authentication
   * @return indicate whether the session is set successfully
   */
  public async handleAuthentication(): Promise<Redirection<{
    reason: 'success';
  }> | null> {
    const result = await new Promise<Auth0DecodedHash>(
      (resolve, reject): void => {
        this.auth0.parseHash((error, authResult) => {
          if (error) {
            reject(error);
          } else {
            resolve(authResult);
          }
        });
      }
    );

    if (result && result.accessToken && result.idToken) {
      this.setSession(result);
      const redirection = result.state
        ? (decrypt(result.state, { json: true }) as Redirection)
        : null;
      const redirectionWithContext: Redirection<{ reason: 'success' }> = {
        path: '/',
        context: { reason: 'success' },
        ...redirection,
      };

      return redirectionWithContext;
    } else {
      throw new AuthError('the token is missing');
    }
  }

  /** redirect the browser to the auth0 authentication process */
  public login(context: Redirection): void {
    this.auth0.authorize({
      state: encrypt(context),
    });
  }

  /** logout current session */
  public logout(): void {
    // clear everything
    this.store.clearAll();

    // remove any previous timeout
    clearTimeout(this.tokenRenewalTimeout);
  }

  /** renew all tokens to extends its expiry time */
  public renewToken(): void {
    this.auth0.checkSession({}, (error, authResult) => {
      if (error) {
        throw error;
      } else {
        this.setSession(authResult);
      }
    });
  }

  /**
   * set the tokens to the storage
   * @param result the result returned from auth0
   */
  public setSession(result: auth0.Auth0DecodedHash): void {
    const { accessToken, idToken, expiresIn } = result;

    // check if there is any missing bit
    if (
      typeof accessToken !== 'string' ||
      typeof idToken !== 'string' ||
      typeof expiresIn !== 'number'
    ) {
      throw new Error(
        `There is something wrong with the hash from auth0: ${JSON.stringify(
          result
        )}`
      );
    }

    const grantedScopes = result.scope || additionalScopes || '';

    // store the result
    this.store.set('scopes', JSON.stringify(grantedScopes).split(' '));
    this.store.set('access_token', accessToken);
    this.store.set('id_token', idToken);
    this.store.set(
      'expires_at',
      JSON.stringify(expiresIn * 1000 + new Date().getTime())
    );

    // schedule a token renewal
    this.scheduleTokenRenewal();
  }

  private scheduleTokenRenewal(): void {
    // remove any previous timeout
    clearTimeout(this.tokenRenewalTimeout);

    const delay = this.expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }
}

export const auth = new Auth();
export default auth;
