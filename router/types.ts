interface RouterProps {
  path: string;
  component: () => string;
  queryString?: boolean;
}

interface PageTypes {
  route: RouterProps;
  isMatch: boolean;
  param?: any;
}

const routeInfo: RouterProps[] = [
  {
    path: '/',
    component: (): string => {
      const component = `<div>main component</div>`;
      return component;
    },
    queryString: false,
  },
  {
    path: '/sub1',
    component: (): string => `<div>sub component1</div>`,
    queryString: false,
  },
  {
    path: '/sub2',
    component: (): string => `<div>sub component2</div>`,
    queryString: false,
  },
];

export { RouterProps, PageTypes, routeInfo };
