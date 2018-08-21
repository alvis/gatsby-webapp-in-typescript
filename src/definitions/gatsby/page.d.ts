/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Definition for the component props supplied
 *            to a gatsby page.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { navigate } from 'gatsby';
import { History, Location } from 'history';

import { PageResources } from './browser';

/** The common props suppied to a gatsby page or app */
export interface ContextProps {
  location: Location; // the location of the page
  navigate: typeof navigate; // a modified navigate method from @reach/router
  pageContext: object; // context of the page specified during node generation
  pageResources: PageResources; // internal information about the comonent of the pages
  uri: string; // the full path
}

export interface PathProps {
  path: string; // the parametric path e.g. /page/:id
  [param: string]: string; // the parameters for the path e.g. id
}

export type PageQuery<
  Query extends object | undefined = undefined
> = Query extends undefined
  ? {}
  : {
      data?: Query;
    };

export type PageProps<
  Query extends object | undefined = undefined
> = ContextProps & PathProps & PageQuery<Query>;
