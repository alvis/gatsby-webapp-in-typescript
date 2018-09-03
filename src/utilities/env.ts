/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Helper functions related to environment variables.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */
export const env = new Proxy(process.env, {
  get: (env, key: string): string => {
    const value = env[key];

    if (value !== undefined) {
      return value;
    } else {
      throw new Error(`Environment variable '${key}' is missing`);
    }
  }
}) as Record<string, string>;
