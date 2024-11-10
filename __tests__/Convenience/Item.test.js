import Item from '../../src/Convenience/Item.js';

describe('Item 클래스', () => {
  let item;

  beforeEach(() => {
    item = new Item('콜라', 1000, 10, '탄산2+1');
  });

  test('constructor가 인스턴스의 초기 값을 설정해야 합니다.', () => {
    expect(item.getName()).toBe('콜라');
    expect(item.getPrice()).toBe(1000);
    expect(item.getQuantity()).toBe(10);
    expect(item.getPromotionInfo()).toBe('탄산2+1');
  });

  test('itemBought 메서드가 구매한 수량만큼 quantity를 줄여야 합니다.', () => {
    item.itemBought(3);
    expect(item.getQuantity()).toBe(7);
  });

  test('itemBought 메서드에서 quantity가 0 이하가 되지 않도록 설정해야 합니다.', () => {
    item.itemBought(15); // 구매 수량이 현재 수량보다 많을 경우
    expect(item.getQuantity()).toBe(0);
  });

  test('getQuantity 메서드가 현재 quantity를 반환해야 합니다.', () => {
    expect(item.getQuantity()).toBe(10); // 초기값이 10
    item.itemBought(2);
    expect(item.getQuantity()).toBe(8);
  });

  test('getName 메서드가 name을 반환해야 합니다.', () => {
    expect(item.getName()).toBe('콜라');
  });

  test('getPrice 메서드가 price를 반환해야 합니다.', () => {
    expect(item.getPrice()).toBe(1000);
  });

  test('getPromotionInfo 메서드가 promotionInfo를 반환해야 합니다.', () => {
    expect(item.getPromotionInfo()).toBe('탄산2+1');
  });
});
