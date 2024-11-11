export const PROMPT_MESSAGES = Object.freeze({
  INPUT: {
    PRODUCT_SELECTION: '\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
    PROMOTION_PRODUCT_ADDITION: (productName) => `현재 ${productName}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`,
    PURCHASE_WITHOUT_PROMOTION: (productName, productQuantity) => `현재 ${productName} ${productQuantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`,
    MEMBERSHIP_DISCOUNT: '멤버십 할인을 받으시겠습니까? (Y/N)\n',
    ADDITIONAL_PURCHASE: '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n',
  },
  OUTPUT:{
    WELCOME:'안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n'
  }

});

