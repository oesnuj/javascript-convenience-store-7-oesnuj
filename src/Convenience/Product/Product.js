export default class Product {
  #name;
  #price;
  #defaultQuantity;
  #promotionQuantity
  #promotionInfo;

  constructor({name, price, defaultQuantity, promotionQuantity, promotionInfo}) {
    this.#name = name;
    this.#price = Number(price);
    this.#defaultQuantity = Number(defaultQuantity);
    this.#promotionQuantity = Number(promotionQuantity);
    this.#promotionInfo = promotionInfo;
  }
}
