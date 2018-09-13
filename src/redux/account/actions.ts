/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Redux actions for account management.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { createStandardAction } from 'typesafe-actions';

import { Redirection } from '#definitions';
import { State } from '#redux/account';

export const login = createStandardAction('account/LOGIN')<Redirection>();

export const success = createStandardAction('account/AUTH_SUCCESS')();

export const profile = createStandardAction('account/PROFILE')<
  NonNullable<State['profile']>
>();

export const cancel = createStandardAction('account/AUTH_CANCEL')();

export const fail = createStandardAction('account/AUTH_FAIL')();

export const logout = createStandardAction('account/LOGOUT')<Redirection>();
