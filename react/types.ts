import { ReactDOM } from './React';

interface RouterType {
  element: (props?: any) => ReactDOM;
  path: string;
  exact?: boolean;
}

export { RouterType };
