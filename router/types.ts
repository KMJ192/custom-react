import { ReactDOM } from '@react/React';

interface RouterType {
  element: (props?: any) => ReactDOM;
  path: string;
  queryString?: boolean;
  exact?: boolean;
}

export { RouterType };
