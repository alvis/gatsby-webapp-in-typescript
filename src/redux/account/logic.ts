/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Use redux-logic as a middleware for account management.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { createLogic } from 'redux-logic';
import { getType } from 'typesafe-actions';

import auth from '#auth';
import * as actions from './actions';

import { Redirection } from '#definitions';
import { State as RootState } from '#redux';

export const login = createLogic<RootState, Redirection, undefined, {}>({
  type: getType(actions.login),

  process: ({ action }, dispatch, done): void => {
    if (!action.error) {
      auth.login(action.payload);
    }
    done();
  }
});

export const success = createLogic<RootState>({
  type: getType(actions.success),

  process: async ({}, dispatch, done): Promise<void> => {
    try {
      // load the profile
      const profile = await auth.getProfile();
      if (profile) {
        dispatch(actions.profile(profile));
      }
    } catch {
      // do nothing
    }

    // finish the process
    done();
  }
});

export const fail = createLogic<RootState>({
  type: getType(actions.fail)
});

export const logout = createLogic<RootState, Redirection>({
  type: getType(actions.logout),

  process: (): void => {
    auth.logout();
  }
});
