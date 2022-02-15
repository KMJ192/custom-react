import { dispatch } from '@redux';
import { useRequest } from '@api/Api';
import { asyncAction, REQUEST_REDUX_TYPE } from './request';

async function asyncRequest() {
  const requestDispatch = dispatch(REQUEST_REDUX_TYPE);
  const { request, success, failure } = asyncAction;
  requestDispatch(request());
  try {
    const response = await useRequest('http://localhost:3001/redux-test');
    requestDispatch(success(response));
  } catch (e) {
    requestDispatch(failure((e as any).message));
  }
}

export { asyncRequest };
