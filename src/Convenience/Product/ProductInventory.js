import ERRORS from '../../constants/error.js';

export default class ProductInventory  {
  #productList

  constructor(products) {
    this.#productList = products;
  }

  checkProductQuantity(targetProductName, targetQuantity) {
    const product = this.#productList.find(product => product.getInfo().name === targetProductName);
    if(!product) {
      throw new Error(ERRORS.PRODUCT_NOT_FOUND);
    }

    const { defaultQuantity, promotionQuantity } = product.getInfo();
    const totalQuantity = defaultQuantity + promotionQuantity;
    if (targetQuantity > totalQuantity) {
      throw new Error(ERRORS.EXCEEDS_STOCK);
    }
  }

  getProductList() {
    return this.#productList.map(product => product.getInfo());
  }

  findProductByName(targetProductName) {
    return this.#productList.find(product => product.getInfo().name === targetProductName);
  }

  updateProductList(targetProductName, promotionStockUsed, defaultStockUsed){
    const product = this.findProductByName(targetProductName);
    product.removeFromPromotionQuantity(promotionStockUsed);
    product.removeFromDefaultQuantity(defaultStockUsed);
    console.log("Updated product:", product.getInfo());
  }
}