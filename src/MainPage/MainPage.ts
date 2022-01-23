import { useState, useEffect } from '@react';
import { navigation } from '@router/router';

function MainPage() {
  // useEffect(() => {}, []);

  return {
    tagName: 'div',
    childNode: `
      <button onclick='onClick()'>컴포넌트1로 이동</button><button>컴포넌트2로 이동</button>
    `,
    // childNode: [
    //   {
    //     tagName: 'button',
    //     childNode: '컴포넌트1로 이동',
    //     event: [
    //       {
    //         type: 'click',
    //         eventFunc: () => {
    //           navigation('/component1');
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     tagName: 'button',
    //     childNode: '컴포넌트2로 이동',
    //     event: [
    //       {
    //         type: 'click',
    //         eventFunc: () => {
    //           navigation('/component2');
    //         },
    //       },
    //     ],
    //   },
    // ],
  };
}

export default MainPage;
