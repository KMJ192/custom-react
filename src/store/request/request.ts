import { createAsyncAction } from '@redux';
import { RequestType } from './types';
import type { ActionType } from '@redux/types';

export const REQUEST_REDUX_TYPE = 'request';

export const REQUEST = 'request';
export const RESPONSE = 'response';
export const ERROR = 'error';

export const asyncAction = createAsyncAction(REQUEST, RESPONSE, ERROR);

const initState: RequestType = {
  message: '',
  loading: false,
  error: '',
};

function request(state = initState, action: ActionType): RequestType {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESPONSE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default request;
