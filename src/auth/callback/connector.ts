/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Connect redux state to the callback component.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actions } from '#redux/account';

import { Action } from '#redux';

/* ----- Dispatch Props ----- */

export interface DispatchProps {
  success: typeof actions.success;
  fail: typeof actions.fail;
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return bindActionCreators(
    {
      success: actions.success,
      fail: actions.fail,
    },
    dispatch
  );
}

// ---------------------------------------- //

/* ----- Connector ----- */

export type ReduxProps = DispatchProps;

export const Connector = connect<null, DispatchProps>(
  null,
  mapDispatchToProps
);

export default Connector;

// ---------------------------------------- //
