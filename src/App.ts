import React, { useState, useEffect } from '@react';
// import routing from '@router';

function App() {
  // return routing();
  const [count, setCount] = useState(0);
  const [string, setString] = useState('');
  const [list, setList] = useState([]);
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
        eventFunc: () => {
          setCount(count + 1);
        },
      },
      value: '증가',
    },
    {
      tagName: 'button',
      event: {
        type: 'click',
        eventFunc: () => {
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
      childNode: [
        {
          tagName: 'div',
          event: {
            type: 'click',
            eventRun: (e: MouseEvent) => {
              console.log((e.currentTarget as Element).textContent);
            },
          },
          value: count,
        },
      ],
    },
    {
      tagName: 'button',
      value: '추가',
      event: {
        type: 'click',
        eventFunc: () => {
          setList();
        },
      },
    },
    {
      tagName: 'div',
      value: 'first',
      childNode: [
        {
          tagName: 'input',
          props: {
            onchange: (e: any) => {
              console.log(e);
            },
          },
          // event: {
          //   type: 'change',
          //   eventFunc: (e: any) => {
          //     console.log(e);
          //   },
          // },
        },
      ],
    },
    {
      tagName: 'div',
      value: 'second',
      childNode: [
        {
          tagName: 'input',
        },
      ],
    },
  ];
}

export default App;
