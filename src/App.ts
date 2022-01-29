import { useRouter } from '@router';

import MainPage from './MainPage';
import NotFound from './NotFound';

import '../static/style.css';

function App() {
  return useRouter(MainPage, NotFound);
}

export default App;
