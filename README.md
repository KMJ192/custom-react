# 기능을 구현해보며 이해하는 React

- vanilla ts로 spa를 만들어보는 프로젝트
- react의 기능을 구현해보며 라이브러리에 대한 이해도 향상
- virtual dom diffing알고리즘 적용으로 virtual dom에 대한 이해도 향상

### Hooks
- javascript의 클로저 메커니즘을 이용한다.
- 대표적으로 컴포넌트 별 상태관리를 담당하는 useState hook과 컴포넌트의 mount, unmount, update 기능을 제공하는 useEffect hook이 있다.

 ### Virtual DOM
- 브라우저 Rendering과정은 4가지가 있다.
```
1. Parsing
 - 토큰화 된 코드를 구조화 하는 과정
 - HTML파일은 DOM트리, CSS파일은 CSSOM트리로 구축됨
2. Render Tree
 - DOM 및 CSSOM을 결합하여 Render Tree를 구축함
 - 화면에 나타나는 요소를 결정하는 트리
 - 요소의 style이 계산된다
3. Layout/Reflow
 - 각 노드의 좌표가 주어지며, 화면에 그려야할 위치를 계산함
 - Root Object부터 재귀적으로 실행된다.
 - 노드의 크기와 위치가 처음 결정되는 시기를 Layout이라고 하며, 이를 후속 재계산한다면 Reflow라고 한다.
4. Painting
 - Rendering된 요소에 color를 입힌다.
 - Root Object부터 재귀적으로 실행되며, 트리의 각 Node를 거치며 paint() 메서드를 호출한다.
```
- DOM에 변화가 생길경우 위의 Rendering과정이 반복된다.
- 이에따라 DOM조작이 많이 발생하는데, 그때마다 위의 Rendering과정을 거치게 될 것이고, 이는 비효율 적인 작업이다.
- Virtual DOM을 이용한다면 그 내용을 Real DOM에 적용하기 전 Virtual DOM에 먼저 적용시킨 후 최종 결과를 RealDOM에 전달하므로 브라우저상에서 발생하는 연산의 양을 줄이는데 도움이 된다.

### Redux
1. 전역 상태 관리 시스템
2. closure, curring 기법을 활용하여 redux시스템을 구축한다.

redux는 인기있었던 전역 상태관리 라이브러리입니다.

redux와 같은 전역 상태관리라이브러리를 이용하여 상태 관리에 대한 단순화를 제공할 수 있습니다.

깊이가 50인 컴포넌트가 존재하고 root컴포넌트에서 최하위 컴포넌트에 상태를 전달하는데 그 사이의 컴포넌트에서는 그 상태를 전혀 사용하지 않는다고 생각해볼때 48개의 컴포넌트에 쓰지않는 코드가 추가되는 불합리한 구조를 가지게 됩니다.

전역 상태관리를 이용하여 root컴포넌트의 상태를 최하위 컴포넌트가 바로 접근하여 사용할 수 있다면 상태관리에 대한 단순함을 제공할 수 있게 됩니다.

redux의 데이터 흐름도는 다음과 같습니다.


React Component에서 변화가 일어남
action 생성함수(Action Creator)에서 action을 객체 형태로 만들어 reducer로 반환
reducer는 상태 변화를 일으키는 함수이며, action을 받아와서 새로운 상태를 반환
변화한 데이터는 Store를 통해 react에 새로운 state를 subscribe 함.
Redux의 규칙
하나의 application에는 하나의 store만 생성
readonly의 형태
- spread 연산자를 사용하여 객체를 복사 붙여넣기
- array에서 push, supply, reverse와 같이 불변성을 해치는 함수를 사용하면 안됨
- concat, filter, map, slice와 같이 불변성을 지키는 내장함수를 사용
reducer는 순수함수
- 이전 상태를 변경하지 않고 새로운 상태 객체를 만들어 반환
- 동일한 parameter로 호출된 reducer는 항상 같은 결과를 반환하여야 함
주요 키워드
Action
- 상태에 변화가 필요할 때 action을 발생
- action에는 type이 필수적임
Reducer
- 변화를 일으키는 함수
- state와 action 2가지 parameter를 가짐
- action.type을 가지고 action에 따라 state를 업데이트
- 불변셩을 유지하여야 함
- action.type중 default는 기본 상태를 반환
Store
- 현재 상태, reducer와 내장 함수(dispatch, subscribe)가 포함되어 있음
- subsctibe를 호출할 때 parameter로 특정 함수를 넣어주면, action이 dispatch될 때 마다 해당 함수를 실행
Redux 구현해보기
간단한 redux를 직접 만들어보겠습니다.

count라는 상태를 가지며, dispatch할때마다 count를 증가시키도록 하겠습니다.

증가, 감소, 리셋버튼이 있으며 p태그 내 counter 결과가 출력되도록 합니다.

최초 count 상태는 0입니다.

index.html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <p id="counter"></p>
    <div>
      <button id="btn-increase">증가</button>
      <button id="btn-decrease">감소</button>
      <button id="btn-reset">리셋</button>
    </div>
    <script src="index.js" type="module"></script>
  </body>
</html>
```
먼저 html 구조를 위의 형태로 작성합니다.

index.js
```
const counterDisplay = document.querySelector("#counter");
const btnIncrease = document.querySelector("#btn-increase");
const btnDecrease = document.querySelector("#btn-decrease");
const btnReset = document.querySelector("#btn-reset");
btnIncrease.addEventListener("click", () => {
  // 증가 버튼 클릭
});
btnDecrease.addEventListener("click", () => {
  // 감소 버튼 클릭
});
btnReset.addEventListener("click", () => {
  // 리셋버튼 클릭
});
```
index.js에 기본 적인 작동을 위한 템플릿을 만들었으니 이제 redux를 구현해보도록 하겠습니다.

Redux.js

redux에는 createStore가 필요합니다.

redux는 state가 필요합니다. 이를 closure로 가질 수 있도록 합니다.

```
function createStore(reducer) {
  let state = {};
  let handlers = [];
}
```
위의 형태가 createStore의 기본 템플릿 형태입니다.

reducer를 파라미터로 받아오며, state를 가집니다.

이 store의 state를 외부에서 볼 수 있도록 subscribe(구독)를 만들어야 합니다. 그리고 store의 state를 변경하기 위해서 필요한 것은 dispatch이며, 외부에서 발생한 action을 dispatch해주어야 합니다. 그리고 store의 state를 외부에서 보여줄 수 있도록 state를 return하는 함수도 필요합니다.

위의 조건을 만족시키도록 createStore를 채워보겠습니다.

먼저 subscribe입니다. 위에서 언급했듯 subscribe에 parameter로 함수를 넣어준다면 action이 dispatch될 때마다 그 함수를 실행시키도록 합니다.

function subscribe(handler) {
  handlers.push(handler);
}
dispatch입니다. action을 파라미터로 받아오며, createStore의 reducer에 state와 action을 넣어서 실행시킨 결과를 state로 저장합니다.

dispatch 될때마다 subscribe로 받아온 함수를 실행시키도록 합니다.
```
function dispatch(action) {
  state = reducer(state, action);
  handlers.forEach((handler) => handler());
}
```
여기서 reducer를 사용한 방법은 curring기법입니다.

curring
함수의 인자를 분리해서 받고 함수의 재활용, 호출지연 등의 프로그래밍 테크닉을 활용할 수 있음
즉 createStore에서 reducer를 받아둔 후 dispatch에서 action을 받아오고 나서 함수를 호출할 수 있도록 한것입니다.

store의 state를 외부로 전달해주는 getState함수를 만들어 봅시다.
```
fucntion getState() {
  return state;
}
```
여기서는 createStore의 lexical scope를 외부에서 접근할 수 있는 closure기법을 이용합니다.

이를 createStore에 적용해보겠습니다.
```
function createStore(reducer) {
  let state = {};
  let handlers = [];
  
  function dispatch(action) {
    state = reducer(state, action);
    handlers.forEach((handler) => handler());
  }
  function getState() {
    return state;
  }
  function subscribe(handler) {
    handlers.push(handler);
  }
  return {
    dispatch,
    subscribe,
    getState,
  }
}
```
위와 같이 간단하게 redux의 createStore를 만들어 볼수 있었습니다.

이제 다시 index.js로 돌아가서 이를 활용할 수 있도록 하겠습니다.

먼저 createStore를 호출하기 위해 reducer와 action이 필요합니다.

reducer.js

action을 위한 타입, 그리고 초기값을 만들어 보겠습니다.

```
// actions
export const INCREASE = "increase";
export const DECREASE = "decrease";
export const RESET = "reset";
// 초기 상태값
const InitializeState = {
  count: 0,
};
증가, 감소, 초기화 3가지 action이 있고, 초기상태값을 만들어둡니다.

그리고 action을 기반으로 reducer를 작성해봅시다.

function reducer(state = InitializeState, action) {
  switch (action.type) {
    case INCREASE:
      if (action.payload) {
        return {
          ...state,
          count: state.count + action.payload,
        };
      }
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREASE:
      return {
        ...state,
        count: state.count - 1,
      };
    case RESET:
      return {
        ...state,
        ...InitializeState,
      };
    case SET_COUNTER:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return { ...state };
  }
}
```
여기서 action은 { type, payload }로 구성됩니다.

type은 말그대로 어떤 action인지(type)을 구분하고, payload는 action에 대한 상태에 가할 행동을 넣어줍니다.

redux에서 action을 dispatch할 때, dispatch(액션(payload))과 같은 형태로 넘겨줍니다. 이와 같이 만들기 위해 curring기법을 이용하여 쉽게 타입에 대한 action을 만들어둘 수 있습니다.

const actionCreator = (actionType) => (payload) => ({
  type: actionType,
  payload
})
action creator를 이용하여 action타입에 대한 함수를 만들어 둘 수 있습니다.
```
const setCounter = actionCreator(SET_COUNTER);
const increase = actionCreator(INCREASE);
const decrease = actionCreator(DECREASE);
const reset = actionCreator(RESET);
```
index.js

redux의 createStore를 호출하고, 이를 subscribe합니다.

그리고 dispatch될때마다 p태그 내부에 count 상태를 보여질 수 있도록 subscribe내에 해당 로직을 실행하는 함수를 넣습니다.

iumport reducer from './reducer';
const store = createStore(reducer);
store.subscribe(function () => {
  const { count } = store.getState();
  counterDisplay.textContent = count;
});
이제 버튼을 누를때 마다 action을 dispatch하여 redux store의 상태를 변화시켜 보여줄 수 있습니다.

```
const dispatch = store.dispatch;
dispatch(setCounter(0));
btnReset.addEventListener("click", () => {
  dispatch(reset());
});
btnIncrease.addEventListener("click", () => {
  dispatch(increase());
});
btnDecrease.addEventListener("click", () => {
  dispatch(decrease());
});
```
최초의 dispatch로 count를 세팅하는 setCounter를 호출하며 payload로 0을 넣어줍니다.

그리고 각 버튼에 대한 action을 dispatch하도록 한다.

간단하게 redux의 작동 원리를 실습해보았습니다.

위의 로직상 여러가지 상태를 가지고, 비동기처리를 해주는 미들웨어 등을 적용하기 위해 좀더 복잡한 로직이 필요합니다.