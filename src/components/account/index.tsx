/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   This is an example component for handling user profile.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { Location } from '@reach/router';
import { navigate } from 'gatsby';
import React from 'react';

import connect from './connector';

import { Redirection } from '#definitions';
import { ReduxProps } from './connector';

interface ComponentProps {
  greeting?: string;
}

type Props = ComponentProps & ReduxProps;

export class Account extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    greeting: 'Welcome back'
  };

  public render(): JSX.Element {
    return this.props.isAuthenticated ? (
      <>
        <p>
          {this.props.greeting}:{' '}
          {this.props.profile ? this.props.profile.name : ''}
        </p>
        <div>
          <Location>
            {({ location }): React.ReactNode => (
              <button
                onClick={this.props.logout.bind(undefined, {
                  path: location.pathname
                })}>
                Log out
              </button>
            )}
          </Location>
        </div>
      </>
    ) : (
      <div>
        <Location>
          {({ location }): React.ReactNode => (
            <>
              <button
                onClick={this.props.login.bind(undefined, {
                  path: location.pathname
                })}>
                Log in via Auth0
              </button>
              <span> or </span>
              <button
                onClick={this.login.bind(undefined, {
                  path: location.pathname
                })}>
                Log in via /login
              </button>
            </>
          )}
        </Location>
      </div>
    );
  }

  private login(origin: Redirection): void {
    navigate('/login', { state: origin });
  }
}

export const ConnectedAccount = connect(Account);

export default ConnectedAccount;
