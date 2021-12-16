import { PageTypes, routeInfo, RouterProps } from './types';

function router(): string {
  const { pathname } = location;
  const routing: PageTypes[] = routeInfo.map((page: RouterProps) => {
    const result = { route: page };

    if (page.path === '/') {
      return {
        ...result,
        isMatch: pathname === page.path,
      };
    }
    if (page.queryString !== undefined && page.queryString === true) {
      const id = pathname.split('/');
      return {
        ...result,
        isMatch: pathname.indexOf(page.path) >= 0,
        param: {
          id: id[id.length - 1],
        },
      };
    }

    return {
      ...result,
      isMatch: pathname.indexOf(page.path) >= 0,
    };
  });

  let renderPage = routing.find((match) => match.isMatch);

  if (!renderPage) {
    renderPage = {
      route: routeInfo[0],
      isMatch: true,
    };
  }

  return renderPage.route.component();
}

export default router;
