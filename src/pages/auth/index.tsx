/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A callback handler for authentication.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';

import Callback from '#auth/callback';

import { PageProps } from '#definitions/gatsby/page';

export default class extends React.PureComponent<PageProps> {
  public render(): JSX.Element {
    return <Callback />;
  }
}
