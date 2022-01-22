import router from '@router';
import NotFound from './NotFound';
import MainPage from './MainPage/MainPage';
import Component1 from './Component1';
import Component2 from './Component2';

function App() {
  return [
    router(MainPage, NotFound, [
      { element: Component1, path: '/component1' },
      { element: Component2, path: '/component2' },
    ]),
  ];
}

export default App;
