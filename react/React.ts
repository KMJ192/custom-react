import debounceFrame from './debounceFrame';

export interface customElement {
  tagName: string;
  value: any;
  props?: {
    [key: string]: string;
  };
  event?: {
    type: string;
    eventFunc: () => void;
  };
  childNode?: customElement[];
  key?: any;
}

interface ReactClosureOptions {
  stateKey: number;
  states: any[];
  root: Element | null;
  component: () => customElement[] | null;
  virtualDom: customElement[] | null;
}

const React = (function () {
  const _this: ReactClosureOptions = {
    stateKey: 0,
    states: [],
    component: null,
    root: null,
    virtualDom: null,
  };

  const creatRealDom = (root: Element, dom?: customElement[] | null) => {
    if (dom === undefined || dom === null) return;

    for (let i = 0; i < dom.length; i++) {
      const { tagName, value, event, props, childNode } = dom[i];

      const element: HTMLElement = document.createElement(tagName);
      if (value !== undefined && value !== null) element.innerText = value;

      if (props) {
        for (const [key, value] of Object.entries(props)) {
          (element as any)[key] = value;
        }
      }

      if (event) {
        const { type, eventFunc: eventRun } = event;
        element.addEventListener(type, eventRun);
      }

      root.appendChild(element);
      if (childNode !== undefined) {
        creatRealDom(element, childNode);
      }
    }
  };

  const reactRenderer = debounceFrame(() => {
    const { root, component, virtualDom } = _this;
    if (!root || !component) return;
    const newVirtualDom: customElement[] | null = component();

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

  function render(
    inputComponent: () => customElement[],
    rootEle: Element | null,
  ) {
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

  function useMemo() {}

  function useCallback() {}

  function useSuspence() {}

  return {
    useState,
    useEffect,
    render,
  };
})();

export default React;
export const { useState, useEffect } = React;
