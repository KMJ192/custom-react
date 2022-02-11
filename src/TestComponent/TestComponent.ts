import { useSelector, useDocument, useDispatch } from '@react';
import { useRedirection } from '@router/Router';
import { RootReducer } from '@src/store';

import { COUNT_REDUX_TYPE, reset } from '@src/store/count';

function TestComponent() {
  const count = useSelector((state: RootReducer) => state.count.count);
  const dispatch = useDispatch(COUNT_REDUX_TYPE);
  useDocument(() => {
    const resetBtn = document.getElementsByClassName('reset')[0];
    const moveHome = document.getElementsByClassName('move-home')[0];
    if (resetBtn) {
      const resetDispatch = () => {
        dispatch(reset());
      };
      resetBtn.addEventListener('click', resetDispatch);
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
      ${count}
    </div>
    <button class='reset'>리셋</button>
    <button class='move-home'>홈</button>
  `;
}

export default TestComponent;
