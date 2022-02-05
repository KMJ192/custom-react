import { useDocument } from '@react';
import Animation from '@src/Canvas/Animation';

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

  useDocument(() => {
    const input = document.getElementById('input') as HTMLInputElement;
    const div = document.getElementById('div');
    const onChange = (e: Event) => {
      const cur = (e.target as HTMLInputElement).value;
      input.value = cur;
      if (div) div.innerText = cur;
    };
    if (input) {
      input.addEventListener('input', onChange);
    }
    return () => {
      if (input) {
        console.log(1);
        input.removeEventListener('input', onChange);
      }
    };
  });

  return [
    {
      tagName: 'input',
      props: {
        id: 'input',
      },
    },
    {
      tagName: 'div',
      props: {
        id: 'div',
      },
    },
  ];
}

export default MainPage;
