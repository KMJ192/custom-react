import React from '@react';
import { ReactDOM } from '@react/React';
import { RouterType } from './types';

const Router = (function () {
  let query: { [key: string]: string } = {};

  function useRouter(
    MainPage: () => ReactDOM,
    NotFound: () => ReactDOM,
    components: RouterType[],
  ): ReactDOM {
    query = {};
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

      if (queryString) {
        const nowPath = pathname.split('/');
        const objPath = path.split('/');
        if (nowPath.length === objPath.length) {
          const pathLen = nowPath.length;
          for (let i = 0; i < pathLen; i++) {
            if (objPath[i].length > 0 && objPath[i][0] === ':') {
              query = {
                ...query,
                [objPath[i].substring(1)]: nowPath[i],
              };
            } else if (objPath[i] !== nowPath[i]) {
              return NotFound();
            }
          }
          return element();
        }
      }
    }

    return NotFound();
  }

  function useRedirection(url: string) {
    history.pushState(null, '', url);
    React.routeRender();
  }

  function useParam() {
    return query;
  }

  return {
    useRouter,
    useRedirection,
    useParam,
  };
})();

export default Router;
export const { useRouter, useRedirection, useParam } = Router;
