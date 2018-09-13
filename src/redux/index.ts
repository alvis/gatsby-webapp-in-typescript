/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The main redux configuration.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import * as account from './account';

/* ----- Action ----- */

import * as actions from './actions';
export { actions };

import { ActionType } from 'typesafe-actions';

type AppAction = NonNullable<
  ActionType<typeof actions> | ActionType<typeof account.actions>
>;

export type Action = AppAction;

// ---------------------------------------- //

/* ----- State ----- */

export interface State {
  account: account.State;
}

// ---------------------------------------- //

/* ----- Reducer ----- */

import { combineReducers } from 'redux';

export const rootReducer = combineReducers<State, Action>({
  account: account.reducers,
});

// ---------------------------------------- //

/* ----- Store Initialiser ----- */

import {
  applyMiddleware,
  compose,
  createStore,
  Store,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
} from 'redux';

import { createLogicMiddleware } from 'redux-logic';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { Persistor } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';

import * as logics from './logic';

interface PreparedStore {
  /** the data store */
  store: Store<State>;

  /** the contollor for data persistence */
  persistor: Persistor;
}

/** the store creator */
export default function prepareStore(
  ...enhancers: StoreEnhancer[]
): PreparedStore {
  const internalEnhancers = [
    applyMiddleware(
      createLogicMiddleware<State, {}, Action>(Object.values(logics as object))
    ),
  ];

  // combine other middlewares
  const combinedEnhancer = compose<StoreEnhancerStoreCreator>(
    account.enhancer(),
    ...internalEnhancers,
    // external enhancers
    ...enhancers
  );

  // make the redux store persistent
  const persistConfig = {
    key: 'root',
    storage,
    transforms: [
      createEncryptor({
        secretKey: JSON.stringify(process.env),
      }),
    ],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore<State, Action, {}, {}>(
    persistedReducer,
    combinedEnhancer
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

// ---------------------------------------- //
