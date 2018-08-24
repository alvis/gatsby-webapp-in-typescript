/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The layout for the landing page.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React, { PureComponent } from 'react';

interface LayoutProps {
  /** children of the element */
  children?: React.ReactNode;
}

export default class extends PureComponent<LayoutProps> {
  /** @inheritdoc */
  public displayName: string = 'Layout';

  /** @inheritdoc */
  public render(): JSX.Element {
    return (
      <>
        <React.StrictMode>{this.props.children}</React.StrictMode>
      </>
    );
  }
}
