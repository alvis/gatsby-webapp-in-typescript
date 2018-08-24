/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Specify the configuration related to
 *            node generation.
 *
 *            See https://www.gatsbyjs.org/docs/node-apis
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import generate from 'apollo/lib/generate';
import { readFileSync } from 'fs';
import glob from 'glob';
import { resolve } from 'path';
import { CompilerOptions } from 'typescript';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { GenerationOptions } from 'apollo/lib/generate';

import Node from '#definitions/gatsby/node';

// export const createPages: Node.createPages = async (parameters): Promise<void> => {};
// export const createPagesStatefully: Node.createPagesStatefully = async (parameters): Promise<void> => {};

// export const onCreateBabelConfig: Node.onCreateBabelConfig = async (parameters): Promise<void> => {};

// export const onCreateNode: Node.onCreateNode = async (parameters): Promise<void> => {};
// export const onCreatePage: Node.onCreatePage = async (parameters): Promise<void> => {};

// export const onCreateWebpackConfig: Node.onCreateWebpackConfig = async (parameters): Promise<void> => {};

// export const onPreInit: Node.onPreInit = async (parameters): Promise<void> => {};
// export const onPreExtractQueries: Node.onPreExtractQueries = async (parameters): Promise<void> => {};

// export const onPreBootstrap: Node.onPreBootstrap = async (parameters): Promise<void> => {};
// export const onPostBootstrap: Node.onPostBootstrap = async (parameters): Promise<void> => {};

// export const onPreBuild: Node.onPreBuild = async (parameters): Promise<void> => {};
// export const onPostBuild: Node.onPostBuild = async (parameters): Promise<void> => {};

// export const preprocessSource: Node.preprocessSource = async (parameters): Promise<string> => {};
// export const resolvableExtensions: Node.resolvableExtensions = async (parameters): Promise<string[]> => {};
// export const setFieldsOnGraphQLNodeType: Node.setFieldsOnGraphQLNodeType = async (parameters): Promise<{ [field: string]: GraphQLField<any, any> }> => {};
// export const sourceNodes: Node.sourceNodes = async (parameters): Promise<void> => {};

export const onCreateWebpackConfig: Node.onCreateWebpackConfig = async ({
  stage,
  actions,
}): Promise<void> => {
  // ignore changes in hidden files (avoid tools like flycheck to trigger rebuild)
  actions.setWebpackConfig({
    plugins: [new webpack.WatchIgnorePlugin([/\/\./])],
  });

  // report bundle size
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
        }),
      ],
    });
  }
};

// use babel to transpile typescript
export const onCreateBabelConfig: Node.onCreateBabelConfig = async ({
  actions,
  stage,
}): Promise<void> => {
  actions.setBabelPreset({
    name: '@babel/preset-typescript',
  });
  actions.setBabelPreset({
    name: '@babel/preset-env',
    options: {
      targets: '> 0.25%, not dead',
    },
  });

  // add module resolution configuration specified in tsconfig
  const tsconfig: {
    /** the compilerOptions in tsconfig.json */
    compilerOptions?: CompilerOptions;
  } = JSON.parse(readFileSync(resolve(__dirname, 'tsconfig.json')).toString());
  if (tsconfig.compilerOptions) {
    const {
      compilerOptions: { baseUrl, paths },
    } = tsconfig;

    if (paths) {
      const alias = Object.assign(
        {},
        ...Object.entries(paths)
          .filter(([key]): boolean => key.endsWith('/*'))
          .map(
            ([key, path]): Record<string, string> => ({
              [key.replace('/*', '')]: resolve(
                baseUrl ? baseUrl : '',
                path[0].replace('/*', '')
              ),
            })
          )
      );
      actions.setBabelPlugin({
        name: 'babel-plugin-module-resolver',
        options: {
          extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx'],
          alias,
        },
      });
    }
  }
};

export const onPostBootstrap: Node.onPostBootstrap = async ({
  reporter,
  store,
}): Promise<void> => {
  const activity = reporter.activityTimer('generate types for queries');

  /* ----- code generation ----- */

  const { schema } = store.getState();

  try {
    activity.start();
    generate(
      glob.sync('src/**/[!.]*.ts?(x)'),
      schema,
      'src/definitions/gatsby/index.d.ts',
      undefined,
      'typescript',
      'graphql',
      false,
      {} as GenerationOptions
    );
    activity.end();
  } catch (error) {
    reporter.error(`codegen fail to run `, error);
  }

  // ---------------------------------------- //
};

// export const onPreBootstrap: Node.onPreBootstrap = async ({
//   reporter,
//   store
// }): Promise<void> => {
//   const activity = reporter.activityTimer('generate types for queries');

//   /* ----- code generation ----- */

//   const { schema } = store.getState();

//   try {
//     activity.start();
//     generate(
//       glob.sync('src/**/[!.]*.ts?(x)'),
//       schema,
//       'src/definitions/gatsby/index.d.ts',
//       undefined,
//       'typescript',
//       'graphql',
//       false,
//       {} as GenerationOptions
//     );
//     activity.end();
//   } catch (error) {
//     reporter.error(`codegen fail to run `, error);
//   }

//   // ---------------------------------------- //
// };
