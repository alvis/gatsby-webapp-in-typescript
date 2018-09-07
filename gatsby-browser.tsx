/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Define actions to be loaded in the clients' browser.
 *
 *            See https://www.gatsbyjs.org/docs/browser-apis
 *            for detailed usage.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from '#redux';

import Browser from '#definitions/gatsby/browser';

interface ReduxWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}

declare var window: ReduxWindow;

// export const disableCorePrefetching: Browser.disableCorePrefetching = (): boolean => {};

// export const onClientEntry: Browser.onClientEntry = (): void => {}

// export const onInitialClientRender: Browser.onInitialClientRender = (): void => {};

// export const onPrefetchPathname: Browser.onPrefetchPathname = (parameters): void => {};

// export const onPreRouteUpdate: Browser.onPreRouteUpdate = (parameters): void => {};
// export const onRouteUpdate: Browser.onRouteUpdate = (parameters): void => {};
// export const onRouteUpdateDelayed: Browser.onRouteUpdateDelayed = (parameters): void => {};

// export const onServiceWorkerActive: Browser.onServiceWorkerActive = (parameters): void => {};
// export const onServiceWorkerInstalled: Browser.onServiceWorkerInstalled = (parameters): void => {};
// export const onServiceWorkerRedundant: Browser.onServiceWorkerRedundant = (parameters): void => {};
// export const onServiceWorkerUpdateFound: Browser.onServiceWorkerUpdateFound = (parameters): void => {};
// export const registerServiceWorker: Browser.registerServiceWorker = (): boolean => {};

// export const replaceComponentRenderer: Browser.replaceComponentRenderer = (parameters): void => {};

// export const shouldUpdateScroll: Browser.shouldUpdateScroll = (parameters): void => {};

// export const wrapRootElement: Browser.wrapRootElement = (parameters): JSX.Element => {};
// export const wrapRootComponent: Browser.wrapRootComponent = (parameters): JSX.Element => {};

export const wrapRootElement: Browser.wrapRootElement = ({
  element,
}): JSX.Element => {
  const middlewares: any[] = [];

  // add a middleware for the Redux DevTool Extension
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const { store, persistor } = createStore(...middlewares);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {element}
      </PersistGate>
    </Provider>
  );
};
