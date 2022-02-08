import { combineReducers } from '@redux/redux';
import count from './count';

const rootReducer = combineReducers({
  count,
});

export default rootReducer;
