import { useState, useDocument, useDispatch, useSelector } from '@react';
import { useRedirection } from '@router';
import { COUNT_REDUX_TYPE, increase, decrease } from '@src/store/count';
import {
  COUNT2_REDUX_TYPE,
  increase as increase2,
  decrease as decrease2,
} from '@src/store/count2';
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
  const dispatch2 = useDispatch(COUNT2_REDUX_TYPE);
  const count = useSelector((state: any) => state);

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

    const inc2 = document.getElementById('increase2');
    const dec2 = document.getElementById('decrease2');
    const increament2 = () => {
      dispatch2(increase2());
    };
    const decreament2 = () => {
      dispatch2(decrease2());
    };
    if (inc2 && dec2) {
      inc2.addEventListener('click', increament2);
      dec2.addEventListener('click', decreament2);
    }

    return () => {
      if (inc && dec && inc2 && dec2) {
        inc.removeEventListener('click', increament);
        dec.removeEventListener('click', decreament);

        inc2.removeEventListener('click', increament2);
        dec2.removeEventListener('click', decreament2);
      }
    };
  });

  return `
    <div>${count.count.count}</div>
    <div>${count.count2.count}</div>
    <button id='increase'>증가</button>
    <button id='decrease'>감소</button>
    <button id='increase2'>증가2</button>
    <button id='decrease2'>감소2</button>
    <button id='move'>이동</button>

  `;
}

export default MainPage;
