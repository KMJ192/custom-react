// 컴포넌트에 dirty를 표현하는 방법
// virtual dom 비교 결과를 호출하는 방법

import { ReactDOM } from '../React';

function heuristicsAlgorithm(prevDom: ReactDOM[], nextDom: ReactDOM[]) {
  // if (prevDom.length === 0 || nextDom.length === 0) return;
  // if (prevDom.length === nextDom.length) {
  //   sameNodeCnt(prevDom, nextDom);
  // } else {
  //   diffNodeCnt(prevDom, nextDom);
  // }
}

function sameNodeCnt(prevDom: ReactDOM[], nextDom: ReactDOM[]) {
  const len = prevDom.length;
  for (let i = 0; i < len; i++) {
    const {
      tagName: prevTagName,
      event: prevEvent,
      props: prevProps,
      key: prevKey,
    } = prevDom[i];
    const {
      tagName: nextTagName,
      event: nextEvent,
      props: nextProps,
      key: nextKey,
    } = nextDom[i];
    // if (prevValue !== nextValue) {
    //   nextDom[i].dirty = true;
    // }
  }
}

function diffNodeCnt(prevDom: ReactDOM[], nextDom: ReactDOM[]) {}

export default heuristicsAlgorithm;

/*
  fiber 알고리즘 자료
  https://github.com/acdlite/react-fiber-architecture
  https://bumkeyy.gitbook.io/bumkeyy-code/frontend/a-deep-dive-into-react-fiber-internals
  https://chchoing88.github.io/ho_blog/react-fiber02/
*/
