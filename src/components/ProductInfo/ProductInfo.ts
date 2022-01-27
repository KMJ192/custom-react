import { useRedirection } from '@router';
import {
  ProductInfoType,
  SelectedType,
} from '@src/container/ProductInfoContainer/types';

interface Props {
  selectHandler: (idx: number) => void;
  selectedProduct?: SelectedType;
  productInfo?: ProductInfoType;
}

function ProductInfo({ selectedProduct, productInfo, selectHandler }: Props) {
  console.log(selectedProduct);
  return {
    tagName: 'div',
    props: {
      className: 'ProductDetailPage',
    },
    childNode: [
      {
        tagName: 'h1',
        childNode: productInfo?.name,
      },
      {
        tagName: 'div',
        props: {
          className: 'ProductDetail',
        },
        childNode: [
          {
            tagName: 'img',
            props: {
              src: productInfo && productInfo.imageUrl,
            },
          },
          {
            tagName: 'div',
            props: {
              className: 'ProductDetail__info',
            },
            childNode: [
              {
                tagName: 'h2',
                childNode: productInfo?.name,
              },
              {
                tagName: 'div',
                childNode: `${productInfo?.price}원~`,
                props: {
                  className: 'ProductDetail__price',
                },
              },
              {
                tagName: 'select',
                event: {
                  type: 'click',
                  eventFunc: function () {
                    const { options } = this;
                    selectHandler(options.selectedIndex);
                  },
                },
                childNode: productInfo
                  ? [
                      {
                        tagName: 'option',
                        childNode: '선택하세요',
                      },
                      ...(productInfo as ProductInfoType).productOptions.map(
                        (option) => {
                          const { name, price, stock } = option;
                          return {
                            tagName: 'option',
                            childNode:
                              stock === 0
                                ? `(품절) ${productInfo.name}${name}`
                                : price === 0
                                ? `${productInfo.name}${name}`
                                : `${productInfo.name}${name}(+${price}원)`,
                            props: {
                              disabled: stock === 0,
                              value: name,
                            },
                          };
                        },
                      ),
                    ]
                  : [
                      {
                        tagName: 'option',
                        childNode: '선택하세요',
                      },
                    ],
              },
              {
                tagName: 'div',
                props: {
                  className: 'ProductDetail__selectedOptions',
                },
                childNode: [
                  {
                    tagName: 'h3',
                    childNode: '선택된 상품',
                  },
                  {
                    tagName: 'ul',
                    childNode: selectedProduct && [
                      Object.keys(selectedProduct).map((id: string) => {
                        return {
                          tagName: 'li',
                          childNode: selectedProduct[id].name,
                          // frontStringNode: selectedProduct[id].name,
                          // childNode: {
                          //   tagname: 'div',
                          //   childNod
                          // }
                        };
                      }),
                    ],
                    // childNode: selectedProduct && [
                    //   Object.keys(selectedProduct).map((id: string) => {
                    //     console.log(id);
                    //     return {
                    //       tagName: 'li',
                    //       frontStringNode: selectedProduct[id].name,
                    //       childNode: {
                    //         tagName: 'div',
                    //         childNode: {
                    //           tagName: 'input',
                    //           props: {
                    //             type: 'number',
                    //             value: selectedProduct[id].price,
                    //           },
                    //           backStringNode: '개',
                    //         },
                    //       },
                    //     };
                    //   }),
                    // ],
                  },
                  {
                    tagName: 'div',
                    props: {
                      className: 'ProductDetail__totalPrice',
                    },
                  },
                  {
                    tagName: 'button',
                    props: {
                      className: 'OrderButton',
                    },
                    childNode: '주문하기',
                    event: {
                      type: 'click',
                      eventFunc: () => {
                        useRedirection(`/web/cart`);
                      },
                    },
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
