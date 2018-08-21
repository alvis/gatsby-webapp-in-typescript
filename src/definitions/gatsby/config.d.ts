/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Definitions for gatsby-config.ts
 *
 *            See https://www.gatsbyjs.org/docs/gatsby-config
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { Application as ExpressApplication } from 'express';

export type siteMetadata = object;

export interface Plugin {
  resolve: string;
  options?: object;
}

export type Plugins = Array<string | Plugin>;

export type pathPrefix = string;

export type polyfill = boolean;

export type mapping = {
  [key: string]: string;
};

export type proxy = {
  prefix: string;
  url: string;
};

export type developMiddleware = (app: ExpressApplication) => void;
