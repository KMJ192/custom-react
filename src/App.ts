import { useState, useEffect } from '@react';
import Component1 from './Component1';
import Component2 from './Component2';

function App() {
  const [count, setCount] = useState(0);

  const increament = () => {
    setCount(count + 1);
  };

  const decreament = () => {
    setCount(count - 1);
  };

  return [Component1({ count, increament, decreament }), Component2()];
}

export default App;
