import debounceFrame from './debounceFrame';
import { React, ReactClosureOptions, ReactDOM } from './types';

const React: React = (function () {
  const _this: ReactClosureOptions = {
    stateKey: 0,
    states: [],
    root: null,
    component: null,
    unmount: undefined,
    callbackResult: undefined,
  };

  const appendNodeList = (node: HTMLElement, dom: ReactDOM) => {
    const { tagName, event, props, childNode } = dom;
    const element: HTMLElement = document.createElement(tagName);
    if (props) {
      for (const [key, value] of Object.entries(props)) {
        (element as any)[key] = value;
      }
    }
    if (event) {
      event.forEach((e: any) => {
        const { type, eventFunc } = e;
        element.addEventListener(type, eventFunc);
      });
    }

    if (element) {
      node.appendChild(element);
    }

    if (childNode !== undefined) {
      creatRealDom(element, childNode);
    }
  };

  const creatRealDom = (
    node: HTMLElement,
    dom?: ReactDOM[] | ReactDOM | string | null,
  ) => {
    if (dom === undefined || dom === null) return;
    if (typeof dom === 'string') {
      node.innerHTML = dom;
      return;
    }

    if (Array.isArray(dom)) {
      dom.forEach((d: ReactDOM | string) => {
        if (typeof d === 'string') {
          node.innerHTML = d;
        } else {
          appendNodeList(node, d);
        }
      });
      return;
    }

    appendNodeList(node, dom);
  };

  const reactRenderer = debounceFrame(() => {
    const { root, component } = _this;
    if (!root || !component) return;
    const vDom: ReactDOM[] | ReactDOM | null = component();

    root.innerHTML = '';
    creatRealDom(root as HTMLElement, vDom);
    _this.stateKey = 0;
  });

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
    reactRenderer();
  }

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

  function useEffect(mountCallback: () => any, depArray?: any[]) {
    const { states, stateKey: currStateKey } = _this;

    // 실제로 React는 Deps배열이 없으면 callback함수를 실행시킨다.
    const hasNoDeps = !depArray;
    const deps = states[currStateKey];
    const hasChangedDeps: boolean = deps
      ? !depArray?.every((el: any, i: number) => el === deps[i])
      : true;
    if (hasNoDeps || hasChangedDeps) {
      _this.unmount = mountCallback();
      states[currStateKey] = depArray;
    }
    _this.stateKey++;
  }

  // function useCallback(callback: (arg?: any) => any, depArray?: any[]) {
  //   const { states, stateKey: currStateKey } = _this;
  //   const deps = states[currStateKey];
  //   const hasNoDeps = !depArray;
  //   const hasChangedDeps: boolean = deps
  //     ? !depArray?.every((el: any, i: number) => el === deps[i])
  //     : true;
  //   if (hasNoDeps || hasChangedDeps || _this.callbackResult !== callback()) {
  //     _this.callbackResult = callback()();
  //     states[currStateKey] = depArray;
  //   }
  //   _this.stateKey++;
  // }

  // function useMemo(callback: (arg?: any) => any) {}
  // function useSuspence() {}

  return {
    useState,
    useEffect,
    useCallback,
    render,
    routeRender,
  };
})();

export default React;
export const { useState, useEffect, useCallback } = React;
export { ReactDOM };
