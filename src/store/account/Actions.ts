/** @format */

import {IHomeActionPayload} from 'types';

export const AccountActions = {
  GET_BASE_ACTIONS: 'GET_BASE_ACTIONS_ACCOUNT',
  POST_BASE_ACTIONS: 'POST_BASE_ACTIONS_ACCOUNT',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: AccountActions.GET_BASE_ACTIONS,
  callback,
});

export const postBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || AccountActions.POST_BASE_ACTIONS,
  callback,
});
