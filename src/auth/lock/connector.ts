/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Connect redux state to the lock component.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import auth from '#auth';
import { actions } from '#redux/account';

import { Action, State } from '#redux';

/* ----- State Props ----- */

export interface StateProps {
  isAuthenticated: typeof auth.isAuthenticated;
}

function mapStateToProps(state: State): StateProps {
  return {
    isAuthenticated: auth.isAuthenticated,
  };
}

// ---------------------------------------- //

/* ----- Dispatch Props ----- */

export interface DispatchProps {
  success: typeof actions.success;
  cancel: typeof actions.cancel;
  fail: typeof actions.fail;
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return bindActionCreators(
    {
      success: actions.success,
      cancel: actions.cancel,
      fail: actions.fail,
    },
    dispatch
  );
}

// ---------------------------------------- //

/* ----- Connector ----- */

export type ReduxProps = StateProps & DispatchProps;

export const Connector = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
);

export default Connector;

// ---------------------------------------- //
