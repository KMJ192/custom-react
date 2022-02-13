import { useRequest } from '@api/Api';
import { ActionType } from '@redux/types';

import { asyncAction, REQUEST_REDUX_TYPE } from './request';

function requestMiddleware() {
  return async (disp: (type: string) => (action?: ActionType) => void) => {
    const dispatch = disp(REQUEST_REDUX_TYPE);
    const { request, success, failure } = asyncAction;
    dispatch(request());
    try {
      const result = await requestApi();
      dispatch(success(result));
    } catch (e) {
      dispatch(failure());
    }
  };
}

async function requestApi() {
  const response = await useRequest('http://58.226.169.200:3001/redux-test');
  return response;
}

export { requestMiddleware };
