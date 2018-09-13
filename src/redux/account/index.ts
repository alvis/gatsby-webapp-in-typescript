/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The is a redux module for account management.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import reducers from './reducers';
export { initialState } from './state';
export { actions, reducers };

import { Action as RootAction, State as RootState } from '#redux';

export type Action = ActionType<typeof actions>;
export { State } from './state';

/* ----- Logic ----- */

import { applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';

import * as logics from './logic';

export const enhancer = (): ReturnType<typeof applyMiddleware> =>
  applyMiddleware(
    createLogicMiddleware<RootState, {}, RootAction>(
      Object.values(logics as object),
      {}
    )
  );

// ---------------------------------------- //
