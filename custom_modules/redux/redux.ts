import { StateType, Reducers, ActionType } from './types';

// actionCreator
const actionCreator =
  (type: string) =>
  (payload: any): StateType => ({
    type,
    payload,
  });

// Reducer combining
const combineReducers = (reducers: Reducers) => {
  return reducers;
};

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
  function createStore(rootReducer: Reducers) {
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
    function subscribe(handler: any) {
      handlers.push(handler);
    }

    /**
     * 새로운 action dispatch
     * @param type - dispatch할 대상
     * @param action - 갱신할 상태에 대한 action
     */
    const dispatch = (type: string) => (action: ActionType) => {
      state = {
        ...state,
        [type]: reducers[type](state[type], action),
      };
      handlers.forEach((handler: any) => {
        handler();
      });
    };

    /**
     * redux의 상태를 반환
     * @returns state
     */
    function reduxState() {
      return state;
    }

    return { subscribe, dispatch, reduxState };
  }

  return {
    createStore,
  };
})();

export { actionCreator, combineReducers };
export const { createStore } = redux;
export default redux;
