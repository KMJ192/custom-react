import { combineReducers } from '@redux';
import count from './count';
import count2 from './count2';
import request from './request';
import { requestMiddleware } from './request/middleware';

const rootReducer = combineReducers({
  count,
  count2,
  request,
});

export const rootAsyncMiddleware = () => ({
  requestMiddleware,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
