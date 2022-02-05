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

  const reactRenderer = debounceFrame(() => {
    const { root, component } = _this;
    if (!root || !component) return;
    const vDOM: ReactDOM[] | ReactDOM | null = component();
    root.innerHTML = '';
    createDOM(root as HTMLElement, vDOM);
    _this.stateKey = 0;
    _this.injected.unmount = _this.injected.event();
  });

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

  function useDocument(event: () => any) {
    _this.injected.event = event;
  }

  function render(component: () => ReactDOM[], rootEle: Element | null) {
    _this.component = component;
    _this.root = rootEle;
    reactRenderer();
  }

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
    render,
    routeRender,
  };
})();

export const { useState, useEffect, useDocument } = React;
export { ReactDOM };
export default React;
