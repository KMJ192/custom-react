import { useState, useEffect } from '@react/React';
import { useParam } from '@router';

import ProductInfo from '@src/components/ProductInfo';
import api, { serverAddr } from '@src/api';

import { ProductInfoType } from './types';

function ProductInfoContainer() {
  const { id } = useParam();
  const [productInfo, setProductInfo] = useState<ProductInfoType>();
  const [selectedProduct, setSelectedPrice] = useState({
    name: '',
    price: 0,
  });

  const getProductInfo = async () => {
    const pi = await api('get', `${serverAddr}/product/${id}`);
    // console.log(pi);
    setProductInfo(pi);
  };

  useEffect(() => {
    getProductInfo();
  }, [getProductInfo]);

  return ProductInfo({ selectedProduct, productInfo });
}

export default ProductInfoContainer;
