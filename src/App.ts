import { useRouter } from '@router';

import MainPage from './MainPage';
import NotFound from './NotFound';
import TestComponent from './TestComponent';

import '../static/style.css';

function App() {
  return useRouter(MainPage, NotFound, [
    {
      element: TestComponent,
      path: '/test',
    },
  ]);
}

export default App;