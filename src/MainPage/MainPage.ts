import { useState, useDocument, useDispatch, useSelector } from '@react';
import { useRedirection } from '@router';
import { COUNT_REDUX_TYPE, increase, decrease } from '@src/store/count';
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
  // const [count, setCount] = useState(0);
  const dispatch = useDispatch(COUNT_REDUX_TYPE);
  const count = useSelector((state: any) => state.count.count);

  useDocument(() => {
    const inc = document.getElementById('increase');
    const dec = document.getElementById('decrease');
    const increament = () => {
      dispatch(increase());
    };
    const decreament = () => {
      dispatch(decrease());
    };
    if (inc && dec) {
      inc.addEventListener('click', increament);
      dec.addEventListener('click', decreament);
    }
    const move = document.getElementById('move');
    move?.addEventListener('click', () => {
      useRedirection('/test');
    });
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
    <button id='move'>이동</button>
  `;
}

export default MainPage;
