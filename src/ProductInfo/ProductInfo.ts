import { useParam } from '@router';

function ProductInfo() {
  const { id } = useParam();

  return {
    tagName: 'div',
    childNode: 'test',
  };
}

export default ProductInfo;
