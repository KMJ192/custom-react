import { actionCreator } from '@redux';
import type { ActionType } from '@redux/types';

export const COUNT_REDUX_TYPE = 'count';

export const INCREASE = 'increase';
export const DECREASE = 'decrease';
export const INCREASE_DIFF = 'increase_diff';
export const DECREASE_DIFF = 'decrease_diff';
export const RESET = 'reset';

export const increase = actionCreator(INCREASE);
export const decrease = actionCreator(DECREASE);
export const increase_diff = actionCreator(INCREASE_DIFF);
export const reset = actionCreator(RESET);

const initCount = { count: 0 };

function countReducer(
  state: { count: number } = initCount,
  action: ActionType,
) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREASE:
      return {
        ...state,
        count: state.count - 1,
      };
    case INCREASE_DIFF:
      return {
        ...state,
        count: state.count + action.payload,
      };
    case DECREASE_DIFF:
      return {
        ...state,
        count: state.count - action.payload,
      };
    case RESET:
      return {
        ...state,
        count: 0,
      };
    default:
      return {
        ...state,
      };
  }
}

export default countReducer;
