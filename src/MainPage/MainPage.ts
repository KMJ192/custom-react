import { useState, useEffect } from '@react';
import { useRedirection } from '@router';
import api, { serverAddr } from '@src/api';

interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

function MainPage() {
  const [productList, setProductList] = useState([]);
  const apiTest = async () => {
    const pl = await api('get', `${serverAddr}/product-list`);
    setProductList(pl);
  };

  useEffect(() => {
    apiTest();
  }, [apiTest]);

  return {
    tagName: 'div',
    props: {
      className: 'ProductListPage',
    },
    childNode: [
      {
        tagName: 'h1',
        childNode: '상품 목록',
      },
      {
        tagName: 'ul',
        childNode:
          productList &&
          productList.map((product: ProductType) => {
            const { id, name, price, imageUrl } = product;
            return {
              tagName: 'li',
              childNode: `
                <img src='${imageUrl}'></img>
                <div class='Product__info'>
                  <div>${name}</div>
                  <div>${price}원 ~</div>
                </div>
              `,
              props: {
                className: 'Product',
              },
              event: [
                {
                  type: 'click',
                  eventFunc: () => {
                    useRedirection(`/products/${id}`);
                  },
                },
              ],
            };
          }),
      },
    ],
  };
}

export default MainPage;
