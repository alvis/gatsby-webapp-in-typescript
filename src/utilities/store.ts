/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A secure local storage engine using storejs as the backend.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import store from 'store';
import { createStore } from 'store/src/store-engine';
import storageEnglnes from 'store/storages/all';

import { decrypt, encrypt, generateUUID } from './secret';

/** for an encryption plugin for store */
interface Encryptor {
  get(fn: typeof store.get, key: string): ReturnType<typeof store.get>;
  remove(fn: typeof store.remove, key: string): ReturnType<typeof store.remove>;
  set(
    fn: typeof store.set,
    key: string,
    value: any
  ): ReturnType<typeof store.set>;
}

export class Store {
  private uuid: string;
  private store: StoreJsAPI = createStore(storageEnglnes, [
    this.secureStorage.bind(this)
  ]);

  // create a memory store
  private cache: Map<string, any> = new Map();

  constructor() {
    // before using an uuid for encryption, let's set it up.
    const uuid = this.getUUID();
    this.uuid = uuid ? uuid : this.storeUUID();
  }

  public clearAll(): void {
    this.store.clearAll();
  }

  public get(key: string): any {
    return this.store.get(key);
  }

  public remove(key: string): void {
    this.store.remove(key);
  }

  public set(key: string, value: any): void {
    this.store.set(key, value);
  }

  private getUUID(): string | null {
    // note that it uses an unencrypted store
    const encryptedUUID = store.get(encrypt('UUID', { decryptable: false }));

    return encryptedUUID ? decrypt(encryptedUUID, { json: false }) : null;
  }

  private storeUUID(): string {
    // note that it uses an unencrypted store
    const uuid = generateUUID();
    store.set(
      encrypt('UUID', { decryptable: false }),
      encrypt(uuid, { decryptable: true })
    );

    return uuid;
  }

  /** create a plugin for store to encrypt/decrypt all the message through it */
  private secureStorage(): Encryptor {
    const get = (
      fn: typeof store.get,
      key: string
    ): ReturnType<typeof store.get> => {
      // try the cache first, if not availanle, try again to obtain the content in the storage
      let value = this.cache.get(key);

      if (value) {
        return value;
      } else {
        value = fn(encrypt(key, { decryptable: false, key: this.uuid }));

        return value ? decrypt(value, { json: false, key: this.uuid }) : null;
      }
    };

    const remove = (
      fn: typeof store.remove,
      key: string
    ): ReturnType<typeof store.remove> => {
      fn(encrypt(key, { decryptable: false, key: this.uuid }));
    };

    const set = (
      fn: typeof store.set,
      key: string,
      value: any
    ): ReturnType<typeof store.set> => {
      // store the value in memory cache
      this.cache.set(key, value);

      // encrypt it and store it in the store
      return fn(
        encrypt(key, {
          decryptable: false,
          key: this.uuid
        }),
        encrypt(value, { decryptable: true, key: this.uuid })
      );
    };

    return { get, remove, set };
  }
}
