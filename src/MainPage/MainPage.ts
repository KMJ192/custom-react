import { useState, useDocument } from '@react';
// import Animation from '@src/Canvas/Animation';

function MainPage() {
  // useDocument(() => {
  //   const animation = new Animation('canvas');
  // });
  // return {
  //   tagName: 'canvas',
  //   props: {
  //     id: 'canvas',
  //     width: 500,
  //     height: 400,
  //   },
  // };

  // useDocument(() => {
  //   const input = document.getElementById('input') as HTMLInputElement;
  //   const div = document.getElementById('div');
  //   const onChange = (e: Event) => {
  //     const cur = (e.target as HTMLInputElement).value;
  //     input.value = cur;
  //     if (div) div.innerText = cur;
  //   };
  //   if (input) {
  //     input.addEventListener('input', onChange);
  //   }
  //   return () => {
  //     if (input) {
  //       input.removeEventListener('input', onChange);
  //     }
  //   };
  // });
  // return [
  //   {
  //     tagName: 'input',
  //     props: {
  //       id: 'input',
  //     },
  //   },
  //   {
  //     tagName: 'div',
  //     props: {
  //       id: 'div',
  //     },
  //   },
  // ];
  const [count, setCount] = useState(0);

  useDocument(() => {
    const inc = document.getElementById('increase');
    const dec = document.getElementById('decrease');
    const increament = () => {
      setCount(count + 1);
    };
    const decreament = () => {
      setCount(count - 1);
    };
    if (inc && dec) {
      inc.addEventListener('click', increament);
      dec.addEventListener('click', decreament);
    }
    return () => {
      if (inc && dec) {
        inc.removeEventListener('click', increament);
        dec.removeEventListener('click', decreament);
      }
    };
  });

  return `
    <div>${count}</div>
    <button id='increase'>증가</button>
    <button id='decrease'>감소</button>
  `;
}

export default MainPage;
