export default class Item {
  #name;
  #price;
  #quantity;
  #promotionInfo;

  constructor({name, price, quantity, promotionInfo}) {
    this.#name = name;
    this.#price = Number(price);
    this.#quantity = Number(quantity);
    this.#promotionInfo = promotionInfo;
  }

  itemBought(purchasedQuantity) {
    this.#quantity -= purchasedQuantity;
    if (this.#quantity < 0) {
      this.#quantity = 0;
    }
  }

  getQuantity() {
    return this.#quantity;
  }

  getName() {
    return this.#name;
  }

  getPrice() {
    return this.#price;
  }

  getPromotionInfo() {
    return this.#promotionInfo;
  }
}
