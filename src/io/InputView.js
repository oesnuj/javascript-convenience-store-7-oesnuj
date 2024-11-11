import { Console } from '@woowacourse/mission-utils';
import { PROMPT_MESSAGES } from '../constants/messages.js';

export default class InputView {
  async getProducts() {
    return await Console.readLineAsync(PROMPT_MESSAGES.INPUT.PRODUCT_SELECTION);
  }

  async getPromotionProductAddition(productName) {
    return await Console.readLineAsync(PROMPT_MESSAGES.INPUT.PROMOTION_PRODUCT_ADDITION(productName));
  }

  async getPurchaseWithoutPromotion(productName, productQuantity) {
    return await Console.readLineAsync(PROMPT_MESSAGES.INPUT.PURCHASE_WITHOUT_PROMOTION(productName, productQuantity));
  }

  async getMembershipDiscount() {
    return await Console.readLineAsync(PROMPT_MESSAGES.INPUT.MEMBERSHIP_DISCOUNT);
  }

  async getAdditionalPurchase() {
    return await Console.readLineAsync(PROMPT_MESSAGES.INPUT.ADDITIONAL_PURCHASE);
  }
}