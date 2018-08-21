/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Definitions for gatsby-ssr.ts
 *
 *            See https://www.gatsbyjs.org/docs/ssr-apis
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

interface OnPreRenderHTML {
  getHeadComponents(): JSX.Element[]; // components in <head>
  replaceHeadComponents(components: JSX.Element[]): void; // replace components in <head>
  getPreBodyComponents(): JSX.Element[]; // components before <body>
  replacePreBodyComponents(components: JSX.Element[]): void; // replace components before <body>
  getPostBodyComponents(): JSX.Element[]; // components after <body>
  replacePostBodyComponents(components: JSX.Element[]): void; // replace components after <body>
}

export type onPreRenderHTML = (
  parameters: OnPreRenderHTML,
  pluginOptions: object
) => void;

interface OnRenderBody {
  pathname: string; // pathname of the page currently being rendered
  setHeadComponents(components: JSX.Element[]): void; // components which are passed to <head>
  setHtmlAttributes(attributes: object): void; // attributes which will spread into <html>
  setBodyAttributes(attributes: object): void; // attributes which will spread into <body>
  setPreBodyComponents(components: JSX.Element[]): void; // components which are passed to the top of <body>
  setPostBodyComponents(components: JSX.Element[]): void; // components which are passed to the bottom of <body>
  setBodyProps(props: object): void; // props which will supplied to bodyProps of the gatsby's body
}

export type onRenderBody = (
  parameters: OnRenderBody,
  pluginOptions: object
) => void;

interface ReplaceRenderer {
  bodyComponent: JSX.Element; // the body component
  replaceBodyHTMLString(html: string): void; // body html
  setHeadComponents(components: JSX.Element[]): void; // components which are passed to <head>
  setHtmlAttributes(attributes: object): void; // attributes which will spread into <html>
  setBodyAttributes(attributes: object): void; // attributes which will spread into <body>
  setPreBodyComponents(components: JSX.Element[]): void; // components which are passed to the top of <body>
  setPostBodyComponents(components: JSX.Element[]): void; // components which are passed to the bottom of <body>
  setBodyProps(props: object): void; // props which will supplied to bodyProps of the gatsby's body
}

export type replaceRenderer = (parameters: ReplaceRenderer) => void;

interface WrapPageElement {
  element: JSX.Element;
  props: object;
}
export type wrapPageElement = (parameters: WrapPageElement) => void;

interface WrapRootElement {
  element: JSX.Element;
}
export type wrapRootElement = (parameters: WrapRootElement) => void;
