import { ReactDOM, useState } from '@react/React';

function Component1(): ReactDOM {
  const [count, setCount] = useState(0);

  const increament = () => {
    setCount(count + 1);
  };

  const decreament = () => {
    setCount(count - 1);
  };
  console.log('first component');

  return {
    tagName: 'div',
    childNode: [
      {
        tagName: 'div',
        childNode: `Component1: ${count}`,
      },
      {
        tagName: 'button',
        childNode: 'increament',
        event: {
          type: 'click',
          eventFunc: () => {
            increament();
          },
        },
      },
      {
        tagName: 'button',
        childNode: 'decreament',
        event: {
          type: 'click',
          eventFunc: () => {
            decreament();
          },
        },
      },
    ],
    props: {
      className: 'compo1',
    },
  };
}

export default Component1;
