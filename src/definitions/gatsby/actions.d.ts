/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Definitions for Gatsby's actions
 *
 *            See https://www.gatsbyjs.org/docs/actions
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { TransformOptions as BabelConfig } from '@babel/core';
import { GraphQLSchema } from 'graphql';
import { Span } from 'opentracing';
import { Configuration as WebpackConfig } from 'webpack';

interface ActionOptions {
  followsSpan: Span;
  parentSpan: Span;
  traceId?: string;
}

interface Job {
  id: string; // the id of the job
  [key: string]: any; // job context
}

interface DeletePage {
  path: string; // the path of the page
}

interface CreatePage {
  path: string; // a route pattern (must start with a forward slash) e.g. /app/:path
  matchPath?: string; // a special key that's used for matching pages only on the client
  component: string; // the absolute path to the component for this page e.g. path.resolve('./src/components/app')
  context?: object; // the context data which will be passed to the component as props.pathContext (also as the context argument for the graphql query)
}

interface NodeInput {
  id: string; // the node’s ID
  parent: string; // the ID of the parent’s node
  children: string[]; // an array of children node IDs
  internal: CreateNodeInternal; // node fields that aren’t generally interesting to consumers of node data but are very useful for plugin writers and Gatsby core
}

interface CreateNodeInternal {
  mediaType: string; // an optional field to indicate to transformer plugins that your node has raw content they can transform. Use either an official media type (we use mime-db as our source (https://www.npmjs.com/package/mime-db) or a made-up one if your data doesn’t fit in any existing bucket. Transformer plugins use node media types for deciding if they should transform a node into a new one
  type: string; // an arbitrary globally unique type choo;129;47Msen by the plugin creating the node.
  content?: string; // the raw content of the node.
  contentDigest: string; // the digest for the content of this nod
  description?: string; // a human readable description of what this node represent
}

interface CreateNodeField {
  node: NodeInput; // the target node object
  name: string; // the name for the field
  value: string; // the value for the field
}

interface CreateParentChildLink {
  parent: NodeInput; // the parent node object
  child: NodeInput; // the child node object
}

interface CreateRedirect {
  fromPath: string; // any valid URL (must start with a forward slash)
  isPermanent: boolean; // this is a permanent redirect; defaults to temporary
  redirectInBrowser: boolean; // if you can't update your UI for some reason, set `redirectInBrowser` to true and Gatsby will handle redirecting in the client as well
  toPath: string; // the URL of a created page
  [key: string]: any; // meta data
}

interface Plugin {
  name: string; // the name of the plugin
}

interface SetBabelPluginAndPreset {
  name: string;
  options?: object;
}

export interface Actions {
  addThirdPartySchema(parameters: {
    schema: GraphQLSchema;
    plugin?: Plugin;
    traceId?: string;
  }): void;
  createJob(job: Job, plugin?: Plugin): void;
  createNode(node: NodeInput, plugin?: Plugin, options?: ActionOptions): void;
  createNodeField(
    parameters: CreateNodeField,
    plugin: Plugin,
    options?: ActionOptions
  ): void;
  createPage(page: CreatePage, plugin?: Plugin, traceId?: string): void;
  createParentChildLink(
    parameters: CreateParentChildLink,
    plugin?: Plugin
  ): void;
  createRedirect(parameters: CreateRedirect): void;
  deleteNode(parameters: { node: NodeInput }, plugin?: Plugin): void;
  deletePage(page: DeletePage): void;
  endJob(job: Job, plugin?: Plugin): void;
  replaceWebpackConfig(config: WebpackConfig, plugin?: Plugin): WebpackConfig;
  setBabelOptions(config: Exclude<BabelConfig, 'plugins' | 'presets'>): void;
  setBabelPlugin(config: SetBabelPluginAndPreset): void;
  setBabelPreset(config: SetBabelPluginAndPreset): void;
  setJob(job: Job, plugin?: Plugin): void;
  setPluginStatus(status: object, plugin: Plugin): void;
  setWebpackConfig(config: WebpackConfig, plugin?: Plugin): WebpackConfig;
  touchNode(parameters: { nodeId: string }, plugin?: Plugin): void;
}
