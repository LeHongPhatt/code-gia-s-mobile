/** @format */

import {createSlice} from '@reduxjs/toolkit';
import {IAccountState} from 'types';
const accountSlice = createSlice({
  name: 'account',
  initialState: {
    loading: false,
    error: null,
  } as IAccountState,
  reducers: {
    actionRequest: state => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    getDataSuccess: (state, {payload}: {payload: any}) => {
      return {
        ...state,
        error: null,
        loading: false,
        ...payload,
      };
    },
  },
});

export const {actionRequest, getDataSuccess} = accountSlice.actions;

export default accountSlice.reducer;
