import Product from '../../src/Convenience/Product.js';

describe('Product 클래스', () => {
  let product;

  beforeEach(() => {
    product = new Product({ name: '콜라', price: 1000, quantity: 10, promotionInfo: '탄산2+1' });
  });

  test('constructor가 인스턴스의 초기 값을 설정해야 합니다.', () => {
    expect(product.getName()).toBe('콜라');
    expect(product.getPrice()).toBe(1000);
    expect(product.getQuantity()).toBe(10);
    expect(product.getPromotionInfo()).toBe('탄산2+1');
  });

  test('buyProduct 메서드가 구매한 수량만큼 quantity를 줄여야 합니다.', () => {
    product.buyProduct(3);
    expect(product.getQuantity()).toBe(7);
  });

  test('buyProduct 메서드에서 quantity가 0 이하가 되지 않도록 설정해야 합니다.', () => {
    product.buyProduct(15); // 구매 수량이 현재 수량보다 많을 경우
    expect(product.getQuantity()).toBe(0);
  });

  test('getQuantity 메서드가 현재 quantity를 반환해야 합니다.', () => {
    expect(product.getQuantity()).toBe(10); // 초기값이 10
    product.buyProduct(2);
    expect(product.getQuantity()).toBe(8);
  });

  test('getName 메서드가 name을 반환해야 합니다.', () => {
    expect(product.getName()).toBe('콜라');
  });

  test('getPrice 메서드가 price를 반환해야 합니다.', () => {
    expect(product.getPrice()).toBe(1000);
  });

  test('getPromotionInfo 메서드가 promotionInfo를 반환해야 합니다.', () => {
    expect(product.getPromotionInfo()).toBe('탄산2+1');
  });
});
