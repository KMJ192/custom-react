import debounceFrame from './debounceFrame';
import { React, ReactClosureOptions, ReactDOM } from './types';

const React: React = (function () {
  const _this: ReactClosureOptions = {
    stateKey: 0,
    states: [],
    root: null,
    component: null,
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
      dom.forEach((d: ReactDOM) => {
        const { tagName, event, props, childNode } = d;
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
        if (childNode !== undefined) {
          node.appendChild(element);
          creatRealDom(element, childNode);
        }
      });
      return;
    }

    const { tagName, event, props, childNode } = dom as ReactDOM;
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
    if (childNode !== undefined) {
      node.appendChild(element);
      creatRealDom(element, childNode);
    }
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

  function useEffect(callback: () => any, depArray?: any[]) {
    const { states, stateKey: currStateKey } = _this;

    // 실제로 React는 Deps배열이 없으면 callback함수를 실행시킨다.
    const hasNoDeps = !depArray;
    const deps = states[currStateKey];
    const hasChangedDeps: boolean = deps
      ? !depArray?.every((el: any, i: number) => el === deps[i])
      : true;
    if (hasNoDeps || hasChangedDeps) {
      callback();
      states[currStateKey] = depArray;
    }
    _this.stateKey++;
  }

  // function useCallback() {}

  // function useMemo() {}

  // function useSuspence() {}

  function useParam() {
    const path = location.pathname.split('/');
    let pathInfo = {};
    path.forEach((queryString) => {
      if (queryString.length > 0 && queryString[1] === ':') {
        pathInfo = {
          ...pathInfo,
          [queryString]: queryString,
        };
      }
    });

    return pathInfo;
  }

  return {
    useState,
    useEffect,
    render,
    routeRender,
    useParam,
  };
})();

export default React;
export const { useState, useEffect, useParam } = React;
export { ReactDOM };
