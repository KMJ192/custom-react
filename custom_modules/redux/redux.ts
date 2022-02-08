import {
  StateType,
  ReducerType,
  StoreType,
  Reducers,
  ActionType,
} from './types';

// actionCreator
const actionCreator =
  (type: string) =>
  (payload: any): StateType => ({
    type,
    payload,
  });

const combineReducers = (reducers: Reducers) => {
  return reducers;
};

const redux = (function () {
  let state;
  let stateKey = 0;
  let reducers: Reducers;
  let handlers = [];
  let dp: (action: ActionType) => void;
  function createStore(rootReducer: Reducers) {
    reducers = rootReducer;

    function dispatch(action: ActionType) {}

    function subscribe() {}

    dp = dispatch;
  }

  function useDispatch() {
    return dp;
  }

  function useSelector() {}

  return {
    createStore,
    useDispatch,
    useSelector,
  };
})();

export { actionCreator, combineReducers };
export const { createStore, useDispatch, useSelector } = redux;
export default redux;
