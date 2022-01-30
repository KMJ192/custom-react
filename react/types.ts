interface React {
  useState<T>(initState: T): [T, (newVal: T) => void];
  useState<T = undefined>(
    initState?: T,
  ): [T | undefined, (newVal: T | undefined) => void];
  useEffect(effect: () => any, deps?: readonly any[]): void;
  useInjection(event: () => void): void;
  routeRender(): void;
}

interface ReactClosureOptions {
  stateKey: number;
  states: any[];
  root: Element | null;
  callbackResult?: any;
  component?: (() => ReactDOM[]) | (() => ReactDOM) | null;
  unmount?: () => void;
  ref?: () => any;
}

interface ReactDOM {
  tagName: string;
  props?: {
    [key: string]: string;
  };
  event?:
    | {
        type: string;
        eventFunc: () => void;
      }
    | {
        type: string;
        eventFunc: () => void;
      }[];
  childNode?: ReactDOM | ReactDOM[] | string;
  key?: any;
  frontStringNode?: string;
  backStringNode?: string;
  node?: HTMLElement;
}

export { React, ReactClosureOptions, ReactDOM };
