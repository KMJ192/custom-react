import { useRouter } from '@router';

import MainPage from './MainPage';
import NotFound from './NotFound';
import ProductInfo from './ProductInfo';

function App() {
  return useRouter(MainPage, NotFound, [
    {
      element: ProductInfo,
      path: '/products/:id',
      queryString: true,
    },
  ]);
}

export default App;
