/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Helper functions related to encryption.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */
// import { enc, AES, SHA1 } from 'crypto-js';

import AES from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';
import SHA1 from 'crypto-js/sha1';

export const ENCRYPTION_KEY = SHA1(
  typeof window !== 'undefined' ? window.location.hostname : 'e^(iπ)+1=0'
).toString();

interface EncryptionOptions {
  decryptable: boolean;
  key: string;
}

/** encrypt a string or object using ENCRYPTION_KEY */
export function encrypt(
  subject?: object | string,
  options?: Partial<EncryptionOptions>
): string {
  const _options = { decryptable: true, key: ENCRYPTION_KEY, ...options };
  // if (!subject) {
  //   // check the content
  //   return '';
  // }

  const message =
    typeof subject === 'string' ? subject : JSON.stringify(subject);
  const method = _options.decryptable ? AES.encrypt : SHA1;

  return method(message, _options.key).toString();
}

export interface DecryptionOptions<JSON extends boolean> {
  json: JSON;
  key: string;
}

/** decrypt a message using ENCRYPTION_KEY */
export function decrypt<JSON extends boolean = true>(
  encrypted: string,
  options?: Partial<DecryptionOptions<JSON>>
): JSON extends true ? object : string {
  const _options = { json: true, key: ENCRYPTION_KEY, ...options };
  // if (!encrypted) {
  //   // check the content
  //   return '';
  // }

  const message = AES.decrypt(encrypted, _options.key).toString(UTF8);

  return _options.json ? JSON.parse(message) : message;
}

export function generateUUID(): string {
  if (typeof window !== 'undefined' && window.crypto) {
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(
      /[018]/g,
      (c: string): string =>
        (
          parseInt(c) ^
          (window.crypto.getRandomValues(new Uint8Array(1))[0] &
            (15 >> (parseInt(c) / 4)))
        ).toString(16)
    );
  } else {
    // a fallback generator when window.crypto is unavailable
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c: string): string => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;

        return v.toString(16);
      }
    );
  }
}

export function generateHash(message: string): number {
  let hash = 0;

  if (message.length === 0) {
    return hash;
  }

  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // convert to 32bit integer
  }

  return hash;
}
