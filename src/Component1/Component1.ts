import { ReactDOM } from '@react/React';

interface Props {
  count: number;
  increament: () => void;
  decreament: () => void;
}

function Component1({ count, increament, decreament }: Props): ReactDOM {
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
