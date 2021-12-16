import debounceFrame from './debounceFrame';
import diffingAlgorithm from './diffingAlgorithm';

export interface customElement {
  tagName: string;
  value: any;
  props?: {
    [key: string]: string;
  };
  event?: {
    type: string;
    eventRun: () => void;
  };
  dirty?: boolean;
  childNode?: customElement[];
}

const React = (function () {
  const _this = {
    currStateKey: 0,
    states: [],
    component: null,
    root: null,
    virtualDom: null,
  };

  const creatRealDom = (root: Element, dom?: customElement[]) => {
    if (dom === undefined) return;

    for (let i = 0; i < dom.length; i++) {
      const { tagName, value, event, props, childNode } = dom[i];

      const element: HTMLElement = document.createElement(tagName);
      element.innerText = String(value);

      // element에 option 적용 기능 필요
      // if (props) {
      //   for (const [key, value] of Object.entries(props)) {
      //     (element as any)[key] = value;
      //   }
      // }

      if (event) {
        const { type, eventRun } = event;
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
    if (root === null || component === null) return;

    if (virtualDom === null) {
      root.innerHTML = '';
      creatRealDom(root, component());
    } else {
      // diffing 알고리즘 추가 필요, 휴리스틱알고리즘 1차 적용, fiber 알고리즘 2차 적용
      root.innerHTML = '';
      creatRealDom(root, component());
    }

    _this.currStateKey = 0;
  });

  function render(
    inputComponent: () => customElement,
    rootEle: Element | null,
  ) {
    _this.component = inputComponent;
    _this.root = rootEle;
    reactRenderer();
  }

  function useState<T>(initState: T): [T, (newVal: T) => void] {
    const { states, currStateKey } = _this;

    const state = states[currStateKey] || initState;
    const _currStateKey = currStateKey;

    const setState = (newState: T) => {
      // map set과 같은 원시타입은 비교하지 걸러내지 못하므로 로직이 추가로 필요함...
      if (newState === state) return;
      if (JSON.stringify(newState) === JSON.stringify(state)) return;

      states[_currStateKey] = newState;
      reactRenderer();
    };

    _this.currStateKey++;
    return [state, setState];
  }

  function useEffect(callback: () => any, depArray?: any[]) {
    const { states, currStateKey } = _this;

    // 실제로 React는 Deps배열이 없으면 callback함수를 실행시킨다.
    const hasNoDeps = !depArray;
    const deps = states[currStateKey];
    const hasChangedDeps: boolean = deps
      ? !depArray?.every((el: any, i: number) => el === deps[i])
      : true;

    console.log(hasNoDeps, hasChangedDeps);

    if (hasNoDeps || hasChangedDeps) {
      callback();
      states[currStateKey] = depArray;
    }
    _this.currStateKey++;
  }

  function useMemo() {}

  function useCallback() {}

  function memo() {}

  return {
    useState,
    useEffect,
    render,
  };
})();

export default React;
