/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Definitions for gatsby-node.ts
 *
 *            See https://www.gatsbyjs.org/docs/node-apis
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { ExecutionResult as GraphQLResult, GraphQLField } from 'graphql';
import { Span } from 'opentracing';
import { Store } from 'redux';
import { Configuration as WebpackConfig } from 'webpack';
import { createReporter } from 'yurnalist';

import { Actions } from './actions';
import * as Config from './config';

interface Page {
  path: string; // any valid URL. Must start with a forward slash
  matchPath?: string; // a special key that's used for matching pages only on the client
  jsonName: string; // metadata of this page
  internalComponentName: string; // the name of the component referred internally
  componentChunkName: string; // the id of this component
  component: string; // the absolute path to the component for this page
  componentPath: string; // path to the component
  context: object; // additional data passed as props for this page
  pluginCreator___NODE: string; // id of the plugin which creates the page
  pluginCreatorId: string; // id of the plugin which creates the page
}

interface Node {
  id: string; // unique id of the node
  parent: string; // parent of the node
  children: string[]; // ids of the children nodes
  internal: {
    type: string;
    owner: string;
    contentDigest: string;
    mediaType?: string;
    content?: string;
    [key: string]: any;
  };
}

interface Site extends Node {
  port: string;
  host: string;
  buildTime: string;
  siteMetadata?: Config.siteMetadata;
  pathPrefix?: Config.pathPrefix;
  polyfill?: Config.polyfill;
  mapping?: Config.mapping;
  proxy?: Config.proxy;
  developMiddleware?: Config.developMiddleware;
  internal: {
    type: 'Site';
    owner: string;
    contentDigest: string;
  };
}

interface SitePage extends Node, Page {
  internal: {
    type: 'SitePage';
    owner: string;
    contentDigest: string;
    description: string;
  };
}

interface SitePlugin extends Node {
  name: string; // name of the plugin
  version: string; // bersion of the plugin
  pluginOptions: object; // options for the plugin
  nodeAPIs: string[]; // involved nodeAPIs
  browserAPIs: string[]; // involved browserAPIs
  ssrAPIs: string[]; // involved ssrAPIs
  pluginFilepath: string; // path to the plugin
  packageJson: object; // content of the package.json
  resolve: string; // path to the plugin
  internal: {
    type: 'SitePlugin';
    owner: string;
    contentDigest: string;
  };
}

type GatsbyNode = Node | Site | SitePage | SitePlugin;

type GraphQLRunner = <T = any>(
  query: string,
  context?: object
) => Promise<GraphQLResult<T>>;

interface NodeAPI {
  actions: Actions;
  parentSpan: Span;
  pathPrefix: string;
  reporter?: ReturnType<typeof createReporter>;
  store: Store;
  createNodeId(id: string): string;
  getNodeAndSavePathDependency(id: string, path: string): GatsbyNode;
  loadNodeContent(node: GatsbyNode): Promise<string>;
}

interface CreatePages extends NodeAPI {
  graphql: GraphQLRunner;
  tradeId: string;
  waitForCascadingActions: boolean;
}
export type createPages = (parameters: CreatePages) => Promise<void>;
export type createPagesStatefully = (parameters: CreatePages) => Promise<void>;

interface OnCreateBabelConfig extends NodeAPI {
  stage:
    | 'develop'
    | 'develop-html'
    | 'build-css'
    | 'build-html'
    | 'build-javascript';
}
export type onCreateBabelConfig = (
  parameters: OnCreateBabelConfig
) => Promise<void>;

interface OnCreateNode extends NodeAPI {
  node: GatsbyNode;
  tradeId: string;
  traceTags: {
    nodeId: string;
    nodeType: string;
  };
}
export type onCreateNode = (parameters: OnCreateNode) => void;

interface OnCreatePage extends NodeAPI {
  page: Page & {
    updatedAt: number; // the time when this component was last updated
  };
  traceId: string;
}
export type onCreatePage = (parameters: OnCreatePage) => void;

interface OnCreateWebpackConfig extends NodeAPI {
  stage: 'develop' | 'develop-html' | 'build-html' | 'build-javascript';
  rules: {
    [name: string]: Function;
  };
  loaders: {
    [name: string]: Function;
  };
  plugins: {
    [name: string]: Function;
  };
  getConfig(): WebpackConfig;
}
export type onCreateWebpackConfig = (
  parameters: OnCreateWebpackConfig
) => Promise<void>;

export type onPreInit = (parameters: NodeAPI) => Promise<void>;

export type onPreBootstrap = (parameters: NodeAPI) => Promise<void>;
export type onPostBootstrap = (parameters: NodeAPI) => Promise<void>;

export type onPreExtractQueries = (parameters: NodeAPI) => Promise<void>;

interface OnBuild extends NodeAPI {
  graphql: GraphQLRunner;
}
export type onPostBuild = (parameters: OnBuild) => Promise<void>;
export type onPreBuild = (parameters: OnBuild) => Promise<void>;

interface PreprocessSource extends NodeAPI {
  filename: string;
  contents: string;
}
export type preprocessSource = (
  parameters: PreprocessSource
) => Promise<string>;

interface ResolvableExtensions extends NodeAPI {
  traceId: string;
}
export type resolvableExtensions = (
  parameters: ResolvableExtensions
) => Promise<string[]>;

interface SetFieldsOnGraphQLNodeType extends NodeAPI {
  type: {
    name: string;
    nodes: GatsbyNode[];
  };
  allNodes: GatsbyNode[];
  tradeId: string;
}

export type setFieldsOnGraphQLNodeType = (
  parameters: SetFieldsOnGraphQLNodeType
) => Promise<{
  [name: string]: GraphQLField<any, any>;
}>;

interface SourceNodes extends NodeAPI {
  graphql: GraphQLRunner;
  tradeId: string;
  waitForCascadingActions: boolean;
}
export type sourceNodes = (parameters: SourceNodes) => Promise<void>;
