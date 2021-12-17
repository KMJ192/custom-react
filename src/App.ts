import React from '@react';
import { customElement } from '@react/React';
// import routing from '@router';

const { useState, useEffect } = React;

function App(): customElement[] {
  // return routing();

  const [count, setCount] = useState(-1);
  const [count2, setCount2] = useState(0);
  // const [mount, setMount] = useState(false);

  // useEffect(() => {
  //   if (!mount) {
  //     setMount(true);
  //     setCount(count + 1);
  //   }
  // }, [count, mount]);

  return [
    {
      tagName: 'button',
      event: {
        type: 'click',
        eventRun: () => {
          setCount(count + 1);
        },
      },
      value: '증가',
    },
    {
      tagName: 'button',
      event: {
        type: 'click',
        eventRun: () => {
          setCount(count - 1);
        },
      },
      value: '감소',
    },
    {
      tagName: 'div',
      props: {
        className: 'test',
      },
      value: count,
      // childNode: [
      //   {
      //     tagName: 'div',
      //     event: {
      //       type: 'click',
      //       eventRun: (e: MouseEvent) => {
      //         console.log((e.currentTarget as Element).textContent);
      //       },
      //     },
      //     value: count + 1,
      //   },
      // ],
    },
  ];
}

export default App;
