/** @format */

import {axiosClient} from 'utils';
import {takeLatest, put, all} from 'redux-saga/effects';
import {IHomeActionPayload, INofifyState} from 'types';
import {AccountActions} from './Actions';
import {actionRequest, getDataSuccess} from './Reducer';
import {error} from 'store/notify';

function* onGetBaseActionsRequest(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    console.log(
      'onGetAccount-action',
      JSON.stringify(action),
      `${action.payload.endPoint}`,
    );
    const rs = yield axiosClient.get(`${action.payload.endPoint}`);
    console.log(
      'onGetAccount-rs',
      `${action.payload.endPoint}`,
      rs.status === 200,
    );

    if (rs.status === 200) {
      const dataKey = action?.payload?.dataKey;
      const data = action?.payload?.isPaginate
        ? rs?.data
        : action?.payload?.isObject
        ? rs?.data?.result[0]
        : rs?.data?.result;
      const payload = dataKey ? {[`${dataKey}`]: data} : {};
      console.log('onGetAccount-payload', `${action.payload.endPoint}`, data);

      yield put(getDataSuccess(payload));
      if (action?.callback) {
        action?.callback?.(rs);
      }
    }
  } catch (e: any) {
    console.log('onGetAccount-action-err', JSON.stringify(e));
    yield put(
      error({
        message: 'some_thing_wrong',
        options: {useI18n: true},
      } as INofifyState),
    );
    yield put(getDataSuccess({}));
    return action?.callback?.({...e});
  }
}

function* watchGetBaseActions() {
  yield takeLatest(
    AccountActions.GET_BASE_ACTIONS as any,
    onGetBaseActionsRequest,
  );
}

function* onPostBaseAction(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    console.log(
      'onPostAccount-action',
      JSON.stringify(action),
      `${action.payload.endPoint}`,
    );
    const rs = yield axiosClient.post(
      `${action.payload.endPoint}`,
      JSON.stringify(action?.payload?.formData),
    );
    console.log(
      'onPostAccount-rs',
      JSON.stringify(rs.status),
      `${action.payload.endPoint}`,
    );

    const dataKey = action?.payload?.dataKey;
    const data = action?.payload?.isPaginate
      ? rs?.data
      : action?.payload?.isObject
      ? rs?.data?.result[0]
      : rs?.data?.result;
    const payload = dataKey && rs?.data?.result ? {[`${dataKey}`]: data} : {};
    console.log('onPostAccount-payload', `${action.payload.endPoint}`, data);

    yield put(getDataSuccess(payload));
    if (action?.callback) {
      action?.callback?.(rs);
    }
  } catch (e: any) {
    console.log('onPostAccount-action-err', JSON.stringify(e));
    yield put(
      error({
        message: 'some_thing_wrong',
        options: {useI18n: true},
      } as INofifyState),
    );
    yield put(getDataSuccess({}));
    if (action?.callback) {
      action?.callback?.({success: false, ...e});
    }
  }
}

function* watchPostBaseActions() {
  yield takeLatest(AccountActions.POST_BASE_ACTIONS as any, onPostBaseAction);
}

export default function* accountSagas() {
  yield all([watchGetBaseActions(), watchPostBaseActions()]);
}
