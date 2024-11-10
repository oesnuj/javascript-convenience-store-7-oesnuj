import { createProducts } from '../../src/utils/createProducts.js';
import Item from '../../src/Convenience/Item.js';
import { convenienceInfo } from '../../src/constants/convenienceInfo.js';

describe('createProducts', () => {
  it('products.md 파일의 내용을 파싱하여 Item 인스턴스를 생성해야 합니다.', async () => {
    const result = await createProducts(convenienceInfo.PRODUCT_INFO_PATH);

    expect(result).toEqual([
      new Item({ name: '콜라', price: '1000', quantity: '10', promotionInfo: '탄산2+1' }),
      new Item({ name: '콜라', price: '1000', quantity: '10', promotionInfo: 'null' }),
      new Item({ name: '사이다', price: '1000', quantity: '8', promotionInfo: '탄산2+1' }),
      new Item({ name: '사이다', price: '1000', quantity: '7', promotionInfo: 'null' }),
      new Item({ name: '오렌지주스', price: '1800', quantity: '9', promotionInfo: 'MD추천상품' }),
      new Item({ name: '탄산수', price: '1200', quantity: '5', promotionInfo: '탄산2+1' }),
      new Item({ name: '물', price: '500', quantity: '10', promotionInfo: 'null' }),
      new Item({ name: '비타민워터', price: '1500', quantity: '6', promotionInfo: 'null' }),
      new Item({ name: '감자칩', price: '1500', quantity: '5', promotionInfo: '반짝할인' }),
      new Item({ name: '감자칩', price: '1500', quantity: '5', promotionInfo: 'null' }),
      new Item({ name: '초코바', price: '1200', quantity: '5', promotionInfo: 'MD추천상품' }),
      new Item({ name: '초코바', price: '1200', quantity: '5', promotionInfo: 'null' }),
      new Item({ name: '에너지바', price: '2000', quantity: '5', promotionInfo: 'null' }),
      new Item({ name: '정식도시락', price: '6400', quantity: '8', promotionInfo: 'null' }),
      new Item({ name: '컵라면', price: '1700', quantity: '1', promotionInfo: 'MD추천상품' }),
      new Item({ name: '컵라면', price: '1700', quantity: '10', promotionInfo: 'null' }),
    ]);
  });
});
