interface RouterType {
  element: (props?: any) => ReactDOM;
  path: string;
  exact?: boolean;
}

interface React {
  useState<T>(initState: T): [T, (newVal: T) => void];
  useState<T = undefined>(
    initState?: T,
  ): [T | undefined, (newVal: T | undefined) => void];
  useEffect(effect: () => any, deps?: readonly any[]): void;
  routeRender(): void;
}

interface ReactClosureOptions {
  stateKey: number;
  states: any[];
  root: Element | null;
  virtualDom: ReactDOM | ReactDOM[] | null;
  component?: (() => ReactDOM[]) | (() => ReactDOM) | null;
}

interface ReactDOM {
  tagName: string;
  props?: {
    [key: string]: string;
  };
  event?: {
    type: string;
    eventFunc: () => void;
  };
  childNode?: ReactDOM | ReactDOM[] | string;
  key?: any;
}

export { React, RouterType, ReactClosureOptions, ReactDOM };
