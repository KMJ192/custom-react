import React from '@react';
// import routing from '@router';

const { useState, useEffect } = React;

function App() {
  // return routing();

  const [count, setCount] = useState(1);
  const [mount, setMount] = useState(false);
  useEffect(() => {
    if (!mount) {
      setMount(true);
      setCount(count + 1);
    }
  }, [count, mount]);

  return [
    {
      tagName: 'div',
      props: {
        'test-id': 'test',
        class: 'test',
      },
      value: count,
      childNode: [
        {
          tagName: 'div',
          props: {
            'test-id': 'test',
          },
          event: {
            type: 'click',
            eventRun: (e: MouseEvent) => {
              console.log((e.currentTarget as Element).textContent);
            },
          },
          value: count + 1,
        },
        {
          tagName: 'div',
          props: {
            'test-id': 'test',
          },
          value: count + 2,
          childNode: [
            {
              tagName: 'div',
              props: {
                'test-id': 'test',
              },
              value: count + 3,
            },
            {
              tagName: 'div',
              props: {
                'test-id': 'test',
              },
              value: count + 4,
            },
          ],
        },
      ],
    },
  ];
}

export default App;
