/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Specify the configuration related to
 *            server-side rendering.
 *
 *            See https://www.gatsbyjs.org/docs/ssr-apis
 *            for defailed usage
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

import SSR from '#definitions/gatsby/ssr';

// export const onPreRenderHTML: SSR.onPreRenderHTML = (parameters): void => {};
// export const onRenderBody: SSR.onRenderBody = (parameters): void => {};

// export const replaceRenderer: SSR.replaceRenderer = (parameters): void => {};

// export const wrapPageElement: SSR.wrapPageElement = (parameters): JSX.Element => {};
// export const wrapRootElement: SSR.wrapRootElement = (parameters): JSX.Element => {};

export const wrapRootElement: SSR.wrapRootElement = ({
  element,
}): JSX.Element => {
  const { store, persistor } = createStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {element}
      </PersistGate>
    </Provider>
  );
};
