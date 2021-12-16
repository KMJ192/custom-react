import React from '@react';
import App from '@src/App';

const { render, useState, useEffect } = React();

// render(App, document.getElementById('App'));

function Test() {
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

render(Test, document.getElementById('App'));
