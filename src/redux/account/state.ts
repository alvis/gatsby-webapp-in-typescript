/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   State for account management.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { Auth0UserProfile } from 'auth0-js';

export interface State {
  isAuthenticated: boolean;
  profile: Auth0UserProfile | null;
}

/* ----- Initial State ----- */

export const initialState: State = {
  isAuthenticated: false,
  profile: null
};

// ---------------------------------------- //
