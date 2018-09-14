/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A component handling the callback return from auth0.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */
import { navigate } from 'gatsby';
import React from 'react';

import auth from '../';
import connect from './connector';

import { Auth0Error } from 'auth0-js';

import { Redirection } from '#definitions';
import { ReduxProps } from './connector';

type Props = ReduxProps;

interface NormalState {
  stage: 'init' | 'processing';
}

interface SuccessState {
  stage: 'success';
  redirection: Redirection;
}

interface ErrorState {
  stage: 'fail';
  error: string;
}

type State = NormalState | SuccessState | ErrorState;

export class Callback extends React.Component<Props, State> {
  state: State = {
    stage: 'init',
  };

  public componentDidMount(): void {
    this.setState({
      stage: 'processing',
    });
  }

  public async componentDidUpdate(): Promise<void> {
    switch (this.state.stage) {
      case 'processing':
        try {
          const redirection = await auth.handleAuthentication();
          if (redirection) {
            // either success or cancelled
            this.setState({
              stage: redirection.context.reason,
              redirection,
            });
          }
        } catch (error) {
          this.setState({
            stage: 'fail',
            error: (error as Auth0Error).errorDescription,
          });
        }
        break;
      case 'success':
        this.props.success();
        navigate(this.state.redirection.path);
        break;
      case 'fail':
        this.props.fail();
        break;
      default:
      // do nothing and show error message otherwise
    }
  }

  public render(): JSX.Element {
    switch (this.state.stage) {
      case 'success':
        return (
          <>
            <p>Success! Redirecting...</p>
          </>
        );
      case 'fail':
        return (
          <>
            <p>Something went wrong: {this.state.error}</p>
          </>
        );
      case 'processing':
      case 'init':
      default:
        return <>Loading...</>;
    }
  }
}

export const ConnectedCallback = connect(Callback);

export default ConnectedCallback;
