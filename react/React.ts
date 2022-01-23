import debounceFrame from './debounceFrame';

export interface ReactDOM {
  tagName: string;
  props?: {
    [key: string]: string;
  };
  event?: {
    type: string;
    eventFunc: () => void;
  };
  childNode?: ReactDOM[] | string;
  key?: any;
}

interface ReactClosureOptions {
  stateKey: number;
  states: any[];
  root: Element | null;
  component: () => ReactDOM[] | null;
  virtualDom: ReactDOM[] | null;
}

export interface React {
  useState<T>(initState: T): [T, (newVal: T) => void];
  // useState<T = undefined>(): [
  //   T | undefined,
  //   (newVal: T | undefined) => void,
  // ];
  useEffect(effect: () => any, deps?: readonly any[]): void;
}

const React: React = (function () {
  const _this: ReactClosureOptions = {
    stateKey: 0,
    states: [],
    component: null,
    root: null,
    virtualDom: null,
  };

  const creatRealDom = (node: Element, dom?: ReactDOM[] | string | null) => {
    if (dom === undefined || dom === null) return;
    if (typeof dom === 'string') {
      node.appendChild(document.createTextNode(dom));
      return;
    }

    for (let i = 0; i < dom.length; i++) {
      const { tagName, event, props, childNode } = dom[i] as ReactDOM;

      const element: HTMLElement = document.createElement(tagName);

      if (props) {
        for (const [key, value] of Object.entries(props)) {
          (element as any)[key] = value;
        }
      }

      if (event) {
        const { type, eventFunc: e } = event;
        element.addEventListener(type, e);
      }

      node.appendChild(element);
      if (childNode !== undefined) {
        creatRealDom(element, childNode);
      }
    }
  };

  const reactRenderer = debounceFrame(() => {
    const { root, component, virtualDom } = _this;
    if (!root || !component) return;
    const newVirtualDom: ReactDOM[] | null = component();

    if (virtualDom === null) {
      _this.virtualDom = newVirtualDom;
      root.innerHTML = '';
      creatRealDom(root, newVirtualDom);
    } else {
      // diffing 알고리즘 => 휴리스틱알고리즘 1차 적용, fiber 알고리즘 2차 적용 예정
      // diffingAlgorithm(virtualDom, newVirtualDom);
      root.innerHTML = '';
      creatRealDom(root, newVirtualDom);
    }
    _this.stateKey = 0;
  });

  function render(inputComponent: () => ReactDOM[], rootEle: Element | null) {
    _this.component = inputComponent;
    _this.root = rootEle;
    reactRenderer();
  }

  function useState<T>(initState: T): [T, (newVal: T) => void] {
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

  return {
    useState,
    useEffect,
    render,
  };
})();

export default React;
export const { useState, useEffect } = React;
