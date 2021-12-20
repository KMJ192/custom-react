import { customElement } from '../React';

function heuristicsAlgorithm(
  prevDom: customElement[],
  nextDom: customElement[],
) {
  if (prevDom.length === 0 || nextDom.length === 0) return;
  if (prevDom.length === nextDom.length) {
    sameNodeCnt(prevDom, nextDom);
  } else {
    diffNodeCnt(prevDom, nextDom);
  }
}

function sameNodeCnt(prevDom: customElement[], nextDom: customElement[]) {
  const len = prevDom.length;
  for (let i = 0; i < len; i++) {
    const {
      tagName: prevTagName,
      value: prevValue,
      event: prevEvent,
      props: prevProps,
    } = prevDom[i];
    const { tagName: nextTagName } = nextDom[i];
    // if (JSON.stringify(prevDom[i]) !== JSON.stringify(nextDom[i])) {
    //   console.log('update');
    //   nextDom[i].dirty = true;
    // }
  }
}

function diffNodeCnt(prevDom: customElement[], nextDom: customElement[]) {}

export default heuristicsAlgorithm;
