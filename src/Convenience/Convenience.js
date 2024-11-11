import createProducts from '../utils/createProducts.js';
import createPromotionsInfo from '../utils/createPromotionsInfo.js';
import ProductInventory from '../Convenience/Product/productInventory.js';
import InputView from '../io/InputView.js';
import OutputView from '../io/OutputView.js';
import ReceiptCalculator from './ReceiptCalculator.js';
import Validator from '../utils/Validator.js';

export default class Convenience {
  #productList;
  #promotionList;
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = new InputView;
    this.#outputView = new OutputView;
  }

  async #initialize() {
    this.#productList = new ProductInventory(await createProducts());
    this.#promotionList = await createPromotionsInfo();
  }


  async execute(){
    await this.#initialize();
    while(true){
      this.#outputView.printWelcomeMessage();
      this.#outputView.printProductInventoryList(this.#productList);

      const selectedProducts = await this.#getProductSelection();
      const purchaseRecords = [];

      for (const [targetProductName, purchaseQuantity] of selectedProducts){
        const purchaseInfo = await this.processPurchase(targetProductName, purchaseQuantity);

        if (purchaseInfo) {
          this.#productList.updateProductList(targetProductName, purchaseInfo.promotionStockUsed, purchaseInfo.defaultStockUsed);

          const product = this.#productList.findProductByName(targetProductName);
          const { price, name } = product.getInfo();

          const totalQuantity = purchaseInfo.promotionStockUsed + purchaseInfo.defaultStockUsed;
          const itemTotal = price * totalQuantity;
          const promotionDiscount = purchaseInfo.freeItemCount * price;


          purchaseRecords.push({
            name,
            quantity: totalQuantity,
            itemTotal,
            freeItemCount: purchaseInfo.freeItemCount,
            promotionDiscount,
          });
        }
      }
      const isMembership = await this.#getMembershipDiscount();
      const receiptInfo = ReceiptCalculator.calculateTotals(purchaseRecords, isMembership);
      this.#outputView.printReceipt(purchaseRecords, receiptInfo);

      const continueOrdering = await this.#getAdditionalPurchase();
      if (!continueOrdering) {
        break;
      }
    }
  }

  async #getProductSelection() {
    try {
      const selectedProductsString = await this.#inputView.getProducts();
      const selectedProducts = selectedProductsString.replace(/\[|\]/g, '').trim().split(',').map(product => {
        const [name, quantity] = product.split('-');
        this.#productList.checkProductQuantity(name, quantity);
        return [name, parseInt(quantity, 10)];
      });
      Validator.checkProductSelection(selectedProducts);
      return selectedProducts;
    }
    catch (error) {
      this.#outputView.printError(error.message);
      return this.#getProductSelection();
    }
  }



  async #getPromotionProductAddition(productName){
    try{
      const userResponse = await this.#inputView.getPromotionProductAddition(productName);
      Validator.checkYesOrNoInput(userResponse);
      return userResponse;

    }
    catch (error) {
      this.#outputView.printError(error.message);
      return this.#getPromotionProductAddition(productName);
    }
  }


  async #getPurchaseWithoutPromotion(productName, nonPromotionQuantity){
    try{
      const userResponse = await this.#inputView.getPurchaseWithoutPromotion(productName, nonPromotionQuantity);
      Validator.checkYesOrNoInput(userResponse);
      return userResponse;
    }
    catch (error) {
      this.#outputView.printError(error.message);
      return this.#getPurchaseWithoutPromotion(productName, nonPromotionQuantity);
    }

  }


  async #getMembershipDiscount(){
    try{
      const userResponse = await this.#inputView.getMembershipDiscount();
      Validator.checkYesOrNoInput(userResponse);
      return (userResponse === 'Y');
    }
    catch (error) {
      this.#outputView.printError(error.message);
      return this.#getMembershipDiscount();
    }

  }

  async #getAdditionalPurchase(){
    try{
      const userResponse = await this.#inputView.getAdditionalPurchase();
      Validator.checkYesOrNoInput(userResponse);
      return (userResponse === 'Y');
    }
    catch (error) {
      this.#outputView.printError(error.message);
      return this.#getAdditionalPurchase();
    }

  }


  async processPurchase(targetProductName, purchaseQuantity) {
    let purchaseInfo = { freeItemCount: 0, promotionStockUsed: 0, defaultStockUsed: purchaseQuantity };

    const product = this.#productList.findProductByName(targetProductName);
    const promotion = this.#promotionList.find(promo => promo.getName() === product.getInfo().promotionName);

    // 프로모션이 없는 상품이거나, 오늘이 해당상품의 프로모션 진행 기간이 아닌 경우
    if (!promotion || !promotion.isActive()) {
      return purchaseInfo;
    }

    // 구매하려는 제품 수량이 프로모션 제고 이상인 경우
    if (!product.isPromotionStockSufficient(purchaseQuantity)) {
      const userResponse = await this.#getPurchaseWithoutPromotion(product.getInfo().name, purchaseQuantity - product.getInfo().promotionQuantity);

      if(userResponse === 'N') return null; //N이라면 이 상품은 사지 않음.

      purchaseInfo.freeItemCount = promotion.calculateFreeItems(product.getInfo().promotionQuantity); //가능한 수량 내의 증정품 수량
      purchaseInfo.promotionStockUsed = product.getInfo().promotionQuantity; //프로모션 제고는 모두 사용함
      purchaseInfo.defaultStockUsed = purchaseQuantity -  purchaseInfo.promotionStockUsed; //나머지는 일반제고를 사용함

      return purchaseInfo;
    }

    //구매하려는 제품 수량이 프로모션 제고보다 작거나 같은 경우
    purchaseInfo.freeItemCount = promotion.calculateFreeItems(purchaseQuantity);
    purchaseInfo.promotionStockUsed = purchaseQuantity;
    purchaseInfo.defaultStockUsed = 0;

    if(promotion.canReceiveOneMoreFree(purchaseQuantity) && product.isPromotionStockSufficient(purchaseQuantity + 1)){
      const userResponse = await this.#getPromotionProductAddition(product.getInfo().name);
      if(userResponse === 'N') return purchaseInfo;

      purchaseInfo.freeItemCount += 1;
      purchaseInfo.promotionStockUsed += 1;
    }

    return purchaseInfo;
  }
}
