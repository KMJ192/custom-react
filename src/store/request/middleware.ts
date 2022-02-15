import { useRequest } from '@api/Api';
import { dispatch } from '@redux';

import { asyncAction, REQUEST_REDUX_TYPE } from './request';

async function requestMiddleware() {
  const dis = dispatch(REQUEST_REDUX_TYPE);
  const { request, success, failure } = asyncAction;
  dis(request());
  try {
    const result = await requestApi();
    dis(success(result));
  } catch (e) {
    dis(failure());
  }
}

async function requestApi() {
  const response = await useRequest('http://58.226.169.200:3001/redux-test');
  return response;
}

export { requestMiddleware };
