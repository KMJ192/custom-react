import { useState, useEffect } from '@react/React';
import { useParam } from '@router';

import ProductInfo from '@src/components/ProductInfo';
import api, { serverAddr } from '@src/api';

import { ProductInfoType, SelectedType } from './types';

function ProductInfoContainer() {
  const { id } = useParam();
  const [productInfo, setProductInfo] = useState<ProductInfoType>();
  const [selectedProduct, setSelectedProduct] = useState<SelectedType>();

  const selectHandler = (idx: number) => {
    if (idx === 0) return;
    if (productInfo) {
      const { id, name, price } = productInfo.productOptions[idx - 1];
      const select = {
        [String(id)]: {
          name,
          price,
        },
      };
      setSelectedProduct({
        ...selectedProduct,
        ...select,
      });
      console.log(selectedProduct);
    }
  };

  const getProductInfo = async () => {
    const pi = await api('get', `${serverAddr}/product/${id}`);
    setProductInfo(pi);
  };

  useEffect(() => {
    getProductInfo();
  }, [getProductInfo]);

  return ProductInfo({ selectedProduct, productInfo, selectHandler });
}

export default ProductInfoContainer;
