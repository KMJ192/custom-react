import { ReactDOM } from '@react/React';
import { navigation } from '@router/router';

function MainPage(): ReactDOM {
  return {
    tagName: 'div',
    childNode: [
      {
        tagName: 'button',
        childNode: '컴포넌트1로 이동',
        event: {
          type: 'click',
          eventFunc: () => {
            // console.log('이동');
            navigation('/component1');
          },
        },
      },
      {
        tagName: 'button',
        childNode: '컴포넌트2로 이동',
        event: {
          type: 'click',
          eventFunc: () => {
            // console.log('이동');
            navigation('/component2');
          },
        },
      },
    ],
  };
}

export default MainPage;
