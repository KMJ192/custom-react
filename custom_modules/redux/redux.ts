import { StateType, Reducers, ActionType } from './types';
import { useDispatch } from '@react/React';

// actionCreator
const actionCreator =
  (type: string) =>
  (payload: { [key: string]: any }): StateType => ({
    type,
    payload,
  });

const createAsyncAction = (
  request: string,
  response: string,
  error: string,
) => {
  return {
    request: actionCreator(request),
    success: actionCreator(response),
    failure: actionCreator(error),
  };
};

// Reducer combining
const combineReducers = (reducers: Reducers) => {
  return reducers;
};

// middleware array return
function applyMiddleware(...middlewares: any) {
  return middlewares;
}

/**
 * redux - 전역 상태관리 시스템
 */
const redux = (function () {
  // redux state
  let state: { [key: string]: any };

  // reducer 함수
  let reducers: Reducers;

  // redux 구독시에 대한 로직 배열
  const handlers: any = [];

  // reducer initalState 초기화를 위한 더미 데이어
  const initAction = {
    type: '',
  };

  /**
   * reducer에 대한 store 생성
   * @param rootReducer - Combined reducers
   */
  const createStore = (rootReducer: Reducers, middlewares: Array<any> = []) => {
    reducers = rootReducer;
    for (const [reducerName, reducer] of Object.entries(reducers)) {
      reducers = {
        ...reducers,
        [reducerName]: reducer,
      };
      state = {
        ...state,
        [reducerName]: reducer(undefined, initAction),
      };
    }

    /**
     * redux 구독
     * @param handler - 실행할 함수
     */
    const subscribe = (handler: any) => {
      handlers.push(handler);
    };

    /**
     * 새로운 action dispatch
     * @param type - dispatch할 대상
     * @param action - 갱신할 상태에 대한 action
     */
    const dispatch = (type: string) => (action: ActionType) => {
      console.log(type, action);
      state = {
        ...state,
        [type]: reducers[type](state[type], action),
      };
      handlers.forEach((handler: any) => {
        handler();
      });
      console.log(state[type]);
    };

    /**
     * redux의 상태를 반환
     * @returns state
     */
    const reduxState = () => {
      return state;
    };
    const store = { subscribe, dispatch, reduxState };

    middlewares.forEach((middleware) => {
      Object.values(middleware()).forEach((m: any) => {
        m()(dispatch);
      });
    });

    return store;
  };

  return {
    createStore,
  };
})();

export { actionCreator, createAsyncAction, combineReducers, applyMiddleware };
export const { createStore } = redux;
export default redux;
