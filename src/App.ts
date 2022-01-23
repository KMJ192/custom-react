import router from '@router';

import NotFound from './NotFound';
import MainPage from './MainPage';
import Component1 from './Component1';
import Component2 from './Component2';

function App() {
  return router(MainPage, NotFound, [
    { element: Component1, path: '/component1', exact: true },
    {
      element: Component2,
      path: '/component2',
      exact: false,
      queryString: true,
    },
  ]);
}

export default App;
