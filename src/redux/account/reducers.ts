/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The redux reducers for account management.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import auth from '#auth';
import * as actions from './actions';
import { initialState } from './state';

import { Action, State } from './';

export const reducers = combineReducers<State, Action>({
  isAuthenticated(
    state: State['isAuthenticated'],
    action: Action
  ): State['isAuthenticated'] {
    switch (action.type) {
      case getType(actions.success):
        return true;
      case getType(actions.logout):
        return false;
      case getType(actions.login):
      case getType(actions.cancel):
      case getType(actions.fail):
      default:
        // these event shouldn't change the state
        return state === undefined ? auth.isAuthenticated : state;
    }
  },
  profile(state: State['profile'], action: Action): State['profile'] {
    switch (action.type) {
      case getType(actions.logout):
        return null;
      case getType(actions.profile):
        return action.payload;
      case getType(actions.login):
      case getType(actions.success):
      case getType(actions.cancel):
      case getType(actions.fail):
      default:
        // these event shouldn't change the state
        return state === undefined ? initialState.profile : state;
    }
  }
});

export default reducers;
