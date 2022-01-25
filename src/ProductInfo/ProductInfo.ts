import { useEffect, useState } from '@react/React';
import { useParam } from '@router';
import api, { serverAddr } from '@src/api';
import { ProductInfoType } from './types';

function ProductInfo() {
  const [productInfo, setProductInfo] = useState<ProductInfoType>();
  const { id } = useParam();
  const getProductInfo = async () => {
    const pi = await api('get', `${serverAddr}/product/${id}`);
    setProductInfo(pi);
  };

  useEffect(() => {
    getProductInfo();
  }, [getProductInfo]);

  return {
    tagName: 'div',
    props: {
      className: 'ProductDetailPage',
    },
    childNode: [
      `<h1>${productInfo && productInfo.name} 상품 정보</h1>`,
      {
        tagName: 'div',
        props: {
          className: 'ProductDetail',
        },
        childNode: [
          `<img src='${productInfo && productInfo.imageUrl}'/>`,
          {
            tagName: 'div',
            props: {
              className: 'ProductDetail__info',
            },
            childNode: [
              `<h2>${productInfo && productInfo.name}</h2>
              <div class='ProductDetail__price'>${
                productInfo && productInfo.price
              }원~</div>`,
              {
                tagName: 'select',
                childNode: [
                  `<option>선택하세요</option>`,
                  {
                    tagName: 'option',
                    childNode: '100개 번들',
                  },
                  {
                    tagName: 'option',
                    childNode: '1000개 번들(+5,000)',
                  },
                ],
              },
              {
                tagName: 'div',
                childNode: [
                  `<h3>선택된 상품</h3>`,
                  {
                    tagName: 'ul',
                    childNode: [
                      {
                        tagName: 'li',
                        childNode: [
                          '커피잔 100개 번들 10000원',
                          {
                            tagName: 'div',
                            childNode: [
                              {
                                tagName: 'input',
                                props: {
                                  type: 'number',
                                  value: '10',
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

export default ProductInfo;
