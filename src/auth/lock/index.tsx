/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A login component using auth0 lock.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */
import Auth0Lock from 'auth0-lock';
import { navigate } from 'gatsby';
import React, { Component } from 'react';

import { decrypt, encrypt, env, generateHash } from '#utilities';
import auth, { responseType, scope } from '../';
import connect from './connector';

import { Redirection } from '#definitions';
import { ReduxProps } from './connector';

interface DefaultProps {
  origin: Redirection;
}

type Props = DefaultProps & ReduxProps;

interface NormalState {
  stage: 'init' | 'processing';
}

interface SuccessState {
  stage: 'success' | 'cancel';
  redirection: Redirection;
}

interface ErrorState {
  stage: 'fail';
  error: string;
}

type State = NormalState | SuccessState | ErrorState;

const { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } = env;

class Lock extends Component<Props, State> {
  public static defaultProps: Pick<Props, 'origin'> = {
    origin: {
      path: '/'
    }
  };

  public state: State = {
    stage: 'init'
  };

  private id: string = `auth0-${generateHash(window.location.pathname)}`;

  private lock: Auth0LockStatic = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      audience: AUTH0_AUDIENCE,
      responseType,
      params: {
        scope
      }
    },
    autoclose: true,
    autofocus: true,
    container: this.id
  });

  constructor(props: Props) {
    super(props);

    this.lock.on('authenticated', result => {
      this.lock.hide();
      auth.setSession(result);
      this.setState({
        stage: 'success',
        redirection: decrypt(result.state, { json: true })
      });
      this.props.success();
    });

    this.lock.on('authorization_error', error => {
      // dispatch a fail event
      this.setState({ stage: 'fail', error: error.description });
      this.props.fail();
    });

    // this.lock.on('hide', () => {
    //   this.setState({ stage: 'cancel', redirection: this.props.origin });
    //   this.props.cancel();
    // });
  }

  public componentDidMount(): void {
    if (this.state.stage !== 'success') {
      this.lock.show({
        auth: {
          params: {
            state: encrypt(
              this.props.origin ? this.props.origin : Lock.defaultProps,
              { decryptable: true }
            )
          }
        }
      });
    }
  }

  public componentDidUpdate(): void {
    switch (this.state.stage) {
      case 'success':
      case 'cancel':
        if (this.state.redirection.path) {
          // go back to the previous page
          navigate(this.state.redirection.path);
        }
        break;
      default:
      // do nothing
    }
  }

  public render(): React.ReactNode {
    switch (this.state.stage) {
      case 'success':
        return (
          <>
            <p>Success! Redirecting...</p>
          </>
        );
      case 'fail':
      // the lock can manage the failure message itself
      case 'processing':
      case 'init':
      default:
        return <div id={this.id} />;
    }
  }
}

export const ConnectedLock = connect(Lock);

// TODO: to be fixed by https://github.com/DefinitelyTyped/DefinitelyTyped/pull/28189
export default ConnectedLock as any;
