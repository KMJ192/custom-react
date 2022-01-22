import { ReactDOM } from '@react/React';

interface RouterType {
  element: (props?: any) => ReactDOM;
  path: string;
  exact?: boolean;
}

export { RouterType };
