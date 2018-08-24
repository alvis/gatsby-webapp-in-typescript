/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A test for the landing page.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';
import renderer from 'react-test-renderer';

import Index from '#pages/index';

import { IndexQuery } from '#definitions/gatsby';
import { ContextProps, PageProps, PathProps } from '#definitions/gatsby/page';

interface PagePropsGeneratorOptions<
  Query extends object | undefined = undefined
> {
  /** data from GraphQL */
  data: Query;
  /** path of the page */
  path: string;
}

/**
 * Generate dummy page props for testing pages.
 * @param options.path: the path of the page supposed to render
 */
function generatePageProps<Query extends object | undefined = undefined>(
  options?: Partial<PagePropsGeneratorOptions<Query>>
): PageProps<Query> {
  const { data, path } = {
    data: undefined,
    path: '/',
    ...options,
  };

  const contextProps: ContextProps = {
    location: { pathname: path, search: '', state: null, hash: '' },
    navigate: jest.fn(),
    pageContext: {},
    pageResources: {
      component: Index,
      page: { path: '', jsonName: '', componentChunkName: '' },
    },
    uri: path,
  };

  const pathProps: PathProps = { '*': '', path: `${path}/*` };

  return { data, ...contextProps, ...pathProps } as any;
}

describe('Index page', () => {
  const title = 'title';

  const data: IndexQuery = {
    site: {
      siteMetadata: {
        title,
      },
    },
  };

  it('should render correctly', () => {
    const indexWithData = renderer
      .create(<Index {...generatePageProps({ data })} />)
      .toJSON();
    expect(indexWithData).toMatchSnapshot();
    expect(indexWithData).toContainEqual({
      type: 'h1',
      props: {},
      children: [title],
    });

    const indexWithoutData = renderer
      .create(<Index {...generatePageProps()} />)
      .toJSON();
    expect(indexWithoutData).toMatchSnapshot();
  });
});
