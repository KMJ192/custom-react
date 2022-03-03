import { useSelector, useDocument, useDispatch } from '@react';
import { useRedirection } from '@router';
import { RootReducer } from '@src/store';

function TestComponent() {
  const moveHome = () => {
    useRedirection('/');
  };
  useDocument(() => {
    const moveHomeBtn = document.getElementsByClassName('move-home')[0];
    moveHomeBtn?.addEventListener('click', moveHome);
    return () => {
      moveHomeBtn?.removeEventListener('click', moveHome);
    };
  });

  return `
    <input class='input-form'/>
    <button class='reset1'>추가</button>
    <button class='reset2'>삭제</button>
    <button class='move-home'>홈</button>
  `;
}

export default TestComponent;
