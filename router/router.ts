import { ReactDOM } from '@react/React';
import { RouterType } from './types';

export const navigation = (url: string) => {
  history.pushState(null, '', url);
};

function router(
  MainPage: () => ReactDOM,
  NotFound: () => ReactDOM,
  component: RouterType[],
): ReactDOM {
  if (component.length === 0) {
    return MainPage();
  }

  const { pathname } = location;
  if (pathname === '/') return MainPage();

  for (const compo of component) {
    console.log(compo);
    if (pathname.indexOf(compo.path) >= 0) {
      return compo.element();
    }
  }

  return NotFound();
}

export default router;
