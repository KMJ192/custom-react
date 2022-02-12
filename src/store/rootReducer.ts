import { combineReducers } from '@redux';
import count from './count';
import count2 from './count2';

const rootReducer = combineReducers({
  count,
  count2,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
