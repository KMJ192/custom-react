import { customElement } from '../React';

function heuristicsAlgorithm(
  prevDom: customElement[],
  nextDom: customElement[],
) {
  if (prevDom.length === 0 || nextDom.length === 0) return;
  console.log('prev', prevDom);
  console.log('next', nextDom);
  if (prevDom.length === nextDom.length) {
    sameNodeCnt(prevDom, nextDom);
  } else {
    diffNodeCnt(prevDom, nextDom);
  }
}

function sameNodeCnt(prevDom: customElement[], nextDom: customElement[]) {}

function diffNodeCnt(prevDom: customElement[], nextDom: customElement[]) {}

export default heuristicsAlgorithm;
