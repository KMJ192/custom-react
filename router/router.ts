import React from '@react';
import { ReactDOM } from '@react/React';
import { RouterType } from './types';

const navigation = (url: string) => {
  history.pushState(null, '', url);
  React.routeRender();
};

function router(
  MainPage: () => ReactDOM,
  NotFound: () => ReactDOM,
  components: RouterType[],
): ReactDOM {
  if (components.length === 0) {
    return MainPage();
  }

  const { pathname } = location;
  if (pathname === '/') return MainPage();

  for (const component of components) {
    const { exact, path, element, queryString } = component;
    if (
      (exact === true && pathname === path) ||
      (!exact && pathname.indexOf(path) >= 0)
    ) {
      return element();
    }
    // console.log(queryString, pathname, path);
    if (queryString && pathname.indexOf(path) >= 0) {
      return element();
    }
  }

  return NotFound();
}

export default router;

export { navigation };
