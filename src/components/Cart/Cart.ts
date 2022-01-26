function Cart() {
  return {
    tagName: 'div',
    props: {
      className: 'CartPage',
    },
    childNode: [
      {
        tagName: 'h1',
        childNode: '장바구니',
      },
      {
        tagName: 'div',
        props: {
          className: 'Cart',
        },
        childNode: [
          {
            tagName: 'ul',
            childNode: [
              {
                tagName: 'li',
                childNode: `
                <img src=''/>
                <div class='Cart__itemDesription'>
                  <div>커피잔 100개 번들 10,000원 10개</div>
                  <div>100,000원</div>
                </div>
              `,
              },
            ],
          },
          {
            tagName: 'div',
            props: {
              className: 'Cart__totalPrice',
            },
            childNode: '총 상품가격',
          },
          {
            tagName: 'button',
            props: {
              className: 'OrderButton',
            },
            childNode: '주문하기',
          },
        ],
      },
    ],
  };
}

export default Cart;
