import { actionCreator } from '@redux';
import type { ActionType } from '@redux/types';

export const COUNT2_REDUX_TYPE = 'count2';

export const INCREASE = 'increase2';
export const DECREASE = 'decrease2';
export const INCREASE_DIFF = 'increase_diff2';
export const DECREASE_DIFF = 'decrease_diff2';
export const RESET = 'reset2';

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
        count: state.count + 2,
      };
    case DECREASE:
      return {
        ...state,
        count: state.count - 2,
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
