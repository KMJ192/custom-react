import { useState } from '@react';

function Component2() {
  const [count, setCount] = useState(0);

  const increament = () => {
    setCount(count + 1);
  };

  const decreament = () => {
    setCount(count - 1);
  };

  return {
    tagName: 'div',
    childNode: [
      {
        tagName: 'div',
        childNode: `Component2 : ${count}`,
      },
      {
        tagName: 'button',
        childNode: 'increament',
        event: [
          {
            type: 'click',
            eventFunc: () => {
              increament();
            },
          },
        ],
      },
      {
        tagName: 'button',
        childNode: 'decreament',
        event: [
          {
            type: 'click',
            eventFunc: () => {
              decreament();
            },
          },
        ],
      },
    ],
    props: {
      className: 'compo2',
    },
  };
}

export default Component2;
