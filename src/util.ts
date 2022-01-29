export function priceFormat(price: number) {
  const curr: string[] = [];
  const curPrice = String(price);
  const pointer = {
    first: curPrice.length - 3,
    second: curPrice.length,
  };

  while (pointer.first > 0) {
    curr.push(curPrice.substring(pointer.first, pointer.second));
    pointer.second = pointer.first;
    pointer.first = pointer.first - 3;
  }
  curr.push(curPrice.substring(pointer.first, pointer.second));
  return curr.reverse().join(',');
}
