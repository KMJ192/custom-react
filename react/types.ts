interface React {
  useState<T>(initState: T): [T, (newVal: T) => void];
  useState<T = undefined>(
    initState?: T,
  ): [T | undefined, (newVal: T | undefined) => void];
  useEffect(effect: () => any, deps?: readonly any[]): void;
  useCallback(callback: (arg?: any) => any): void;
  useParam(): any;
  routeRender(): void;
}

interface ReactClosureOptions {
  stateKey: number;
  states: any[];
  root: Element | null;
  component?: (() => ReactDOM[]) | (() => ReactDOM) | null;
  unmount?: () => void;
  callbackResult?: any;
}

interface ReactDOM {
  tagName: string;
  props?: {
    [key: string]: string;
  };
  event?: {
    type: string;
    eventFunc: () => void;
  }[];
  childNode?: ReactDOM | ReactDOM[] | string;
  key?: any;
}

export { React, ReactClosureOptions, ReactDOM };
