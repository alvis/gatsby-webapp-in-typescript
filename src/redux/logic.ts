/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Use redux-logic as a middleware.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { navigate } from 'gatsby';
import { createLogic } from 'redux-logic';
import { getType } from 'typesafe-actions';

import * as actions from './actions';

import { State as RootState } from '#redux';

export const home = createLogic<RootState>({
  type: getType(actions.navigate),

  process: ({ action }, dispatch, done): void => {
    if (!action.error) {
      navigate('/');
    }
    done();
  },
});
