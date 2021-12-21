// 컴포넌트에 dirty를 표현하는 방법
// virtual dom 비교 결과를 호출하는 방법

import { customElement } from '../React';

function heuristicsAlgorithm(
  prevDom: customElement[],
  nextDom: customElement[],
) {
  // if (prevDom.length === 0 || nextDom.length === 0) return;
  // if (prevDom.length === nextDom.length) {
  //   sameNodeCnt(prevDom, nextDom);
  // } else {
  //   diffNodeCnt(prevDom, nextDom);
  // }
}

function sameNodeCnt(prevDom: customElement[], nextDom: customElement[]) {
  const len = prevDom.length;
  for (let i = 0; i < len; i++) {
    const {
      tagName: prevTagName,
      value: prevValue,
      event: prevEvent,
      props: prevProps,
      key: prevKey,
    } = prevDom[i];
    const {
      tagName: nextTagName,
      value: nextValue,
      event: nextEvent,
      props: nextProps,
      key: nextKey,
    } = nextDom[i];
    // if (prevValue !== nextValue) {
    //   nextDom[i].dirty = true;
    // }
  }
}

function diffNodeCnt(prevDom: customElement[], nextDom: customElement[]) {}

export default heuristicsAlgorithm;
