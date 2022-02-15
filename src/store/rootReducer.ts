import { combineReducers } from '@redux';
import count from './count';
import count2 from './count2';
import request from './request';

const rootReducer = combineReducers({
  count,
  count2,
  request,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
