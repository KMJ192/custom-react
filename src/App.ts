import { useRouter } from '@router';

import MainPage from './MainPage';
import NotFound from './NotFound';
import ProductInfoContainer from './container/ProductInfoContainer';
import CartContainer from './container/CartContainer';

function App() {
  return useRouter(MainPage, NotFound, [
    {
      element: ProductInfoContainer,
      path: '/web/products/:id',
      queryString: true,
    },
    {
      element: CartContainer,
      path: '/web/cart',
    },
  ]);
}

export default App;
