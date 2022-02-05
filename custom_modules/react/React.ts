import { ReactType, ReactClosureOptions, ReactDOM } from './types';
import { createDOM, debounceFrame } from './untils/untils';

const React: ReactType = (function () {
  const _this: ReactClosureOptions = {
    stateKey: 0,
    states: [],
    root: null,
    component: null,
    unmount: undefined,
    injected: {
      event: () => {},
      unmount: undefined,
    },
  };

  /**
   * 컴포넌트 렌더링 기능
   * requestAnimationFrame으로 렌더링 횟수 제한
   */
  const reactRenderer = debounceFrame(() => {
    const { root, component } = _this;
    if (!root || !component) return;
    const vDOM: ReactDOM[] | ReactDOM | null = component();
    root.innerHTML = '';
    createDOM(root as HTMLElement, vDOM);
    _this.stateKey = 0;
    _this.injected.unmount = _this.injected.event();
  });

  /**
   * 상태관리 시스템
   * @param initState - 제너릭 타입 상태 및 상태 업데이트 기능 제공
   * @returns [state, setState] - 상태, 상태 업데이트 함수
   */
  function useState<T = undefined>(initState: T): [T, (newVal: T) => void] {
    const { states, stateKey: key } = _this;
    if (states.length === key) states.push(initState);
    const state = states[key];
    const setState = (newState: T) => {
      if (newState === state) return;
      if (JSON.stringify(newState) === JSON.stringify(state)) return;

      states[key] = newState;
      reactRenderer();
    };
    _this.stateKey += 1;
    return [state, setState];
  }

  /**
   * 상태관리 시스템, 렌더링을 진행하지 않음
   * @param initState - 제너릭 타입 상태 및 상태 업데이트 기능 제공
   * @returns [state, setState] - 상태, 상태 업데이트 함수
   */
  function useStateNoRender<T = undefined>(
    initState: T,
  ): [T, (newVal: T) => void] {
    const { states, stateKey: key } = _this;
    if (states.length === key) states.push(initState);
    const state = states[key];
    const setState = (newState: T) => {
      if (newState === state) return;
      if (JSON.stringify(newState) === JSON.stringify(state)) return;

      states[key] = newState;
    };
    _this.stateKey += 1;
    return [state, setState];
  }

  /**
   * 컴포넌트의 생명주기를 관리
   * @param effect - mount, update, unmount 컴포넌트 생명주기 관리
   * @param depsArray - 상태 비교를 위한 deps
   */
  function useEffect(effect: () => any, depsArray?: any[]) {
    const { states, stateKey: currStateKey } = _this;

    // 실제로 React는 Deps배열이 없으면 callback함수를 실행시킨다.
    const hasNoDeps = !depsArray;
    const deps = states[currStateKey];
    const hasChangedDeps: boolean = deps
      ? !depsArray?.every((el: any, i: number) => el === deps[i])
      : true;
    if (hasNoDeps || hasChangedDeps) {
      _this.unmount = effect();
      states[currStateKey] = depsArray;
    }
    _this.stateKey++;
  }

  /**
   * 컴포넌트에서 document api를 사용하여 커스터마이징 로직 작성 지원
   * @param event
   */
  function useDocument(event: () => any) {
    _this.injected.event = event;
  }

  /**
   * React 받아온 컴포넌트를 클로저에 저장 후 렌더링 실행
   * @param component - React 컴포넌트
   * @param rootElement - root 노드
   */
  function render(component: () => ReactDOM[], rootElement: Element | null) {
    _this.component = component;
    _this.root = rootElement;
    reactRenderer();
  }

  /**
   * Routing시 렌더링 실행
   */
  function routeRender() {
    _this.states = [];
    if (_this.unmount) {
      _this.unmount();
    }
    if (_this.injected.unmount) {
      _this.injected.unmount();
    }
    reactRenderer();
  }

  return {
    useState,
    useEffect,
    useDocument,
    useStateNoRender,
    render,
    routeRender,
  };
})();

export const { useState, useEffect, useDocument, useStateNoRender } = React;
export { ReactDOM };
export default React;
