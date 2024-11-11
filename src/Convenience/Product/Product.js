export default class Product {
  #name;
  #price;
  #defaultQuantity;
  #promotionQuantity
  #promotionName;

  constructor({name, price, defaultQuantity, promotionQuantity, promotionName}) {
    this.#name = name;
    this.#price = Number(price);
    this.#defaultQuantity = Number(defaultQuantity);
    this.#promotionQuantity = Number(promotionQuantity);
    this.#promotionName = promotionName;

  }

  addToDefaultQuantity(quantity) {
    this.#defaultQuantity += quantity;
  }

  addToPromotionQuantity(quantity) {
    this.#promotionQuantity += quantity;
  }

  isPromotionStockSufficient(purchaseQuantity){
    return purchaseQuantity <= this.#promotionQuantity;
  }

  removeFromDefaultQuantity(quantity) {
    this.#defaultQuantity = Math.max(0, this.#defaultQuantity - quantity);
  }

  removeFromPromotionQuantity(quantity) {
    this.#promotionQuantity = Math.max(0, this.#promotionQuantity - quantity);
  }

  getInfo() {
    return {
      name: this.#name,
      price: this.#price,
      defaultQuantity: this.#defaultQuantity,
      promotionQuantity: this.#promotionQuantity,
      promotionName: this.#promotionName,
    };
  };


  }
