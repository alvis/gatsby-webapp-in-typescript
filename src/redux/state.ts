/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Global state.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

export interface State {
  isAuthenticated: boolean;
  profile: Auth0UserProfile | null;
}

/* ----- Initial State ----- */

export const initialState: State = {
  isAuthenticated: false,
  profile: null,
};

// ---------------------------------------- //
