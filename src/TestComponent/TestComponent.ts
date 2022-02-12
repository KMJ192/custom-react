import { useSelector, useDocument, useDispatch } from '@react';
import { useRedirection } from '@router/Router';
import { RootReducer } from '@src/store';

import { COUNT_REDUX_TYPE, reset } from '@src/store/count';
import { COUNT2_REDUX_TYPE, reset as count2Reset } from '@src/store/count2';

function TestComponent() {
  const count = useSelector((state: RootReducer) => state);
  const dispatch1 = useDispatch(COUNT_REDUX_TYPE);
  const dispatch2 = useDispatch(COUNT2_REDUX_TYPE);
  useDocument(() => {
    const reset1Btn = document.getElementsByClassName('reset1')[0];
    const reset2Btn = document.getElementsByClassName('reset2')[0];
    const moveHome = document.getElementsByClassName('move-home')[0];
    if (reset1Btn) {
      const resetDispatch = () => {
        dispatch1(reset());
      };
      reset2Btn.addEventListener('click', resetDispatch);
    }

    if (reset2Btn) {
      const resetDispatch = () => {
        dispatch2(count2Reset());
      };
      reset2Btn.addEventListener('click', resetDispatch);
    }

    if (moveHome) {
      const homeBtn = () => {
        useRedirection('/');
      };
      moveHome.addEventListener('click', homeBtn);
    }
  });
  return `
    <div>
      ${count.count.count}
    </div>
    <div>
      ${count.count2.count}
    </div>
    <button class='reset1'>count1 리셋</button>
    <button class='reset2'>count2 리셋</button>
    <button class='move-home'>홈</button>
  `;
}

export default TestComponent;
