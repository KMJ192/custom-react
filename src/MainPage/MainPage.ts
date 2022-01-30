import { useState } from '@react';
import { useInjection } from '@react';

function MainPage() {
  const [value, setValue] = useState(0);

  const onChange = (e: Event) => {
    setValue(Number((e.target as HTMLInputElement).value));
  };
  useInjection(() => {
    const test = document.getElementsByClassName('test')[0];
    if (test) {
      test.addEventListener('input', onChange);
    }
  });
  return `
    <input value='${value}' class='test' />
    <div>${value}</div>
  `;
}

export default MainPage;
