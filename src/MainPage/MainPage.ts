import { useInjection } from '@react';
import Animation from '@src/Canvas/Animation';

function MainPage() {
  useInjection(() => {
    const animation = new Animation('canvas');
  });
  return {
    tagName: 'canvas',
    props: {
      id: 'canvas',
      width: 500,
      height: 400,
    },
  };
}

export default MainPage;
