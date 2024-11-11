import { Console } from '@woowacourse/mission-utils'
import { PROMPT_MESSAGES } from '../constants/messages.js'

export default class OutputView {
  printWelcomeMessage() {
    Console.print(PROMPT_MESSAGES.OUTPUT.WELCOME);
  }

  printProductInventoryList(productInventory){
    const productList = productInventory.getProductList();
    productList.forEach(({ name, price, defaultQuantity, promotionQuantity, promotionName }) => {
      const formattedPrice = price.toLocaleString();

      if (promotionQuantity >= 0) {
        Console.print(`- ${name} ${formattedPrice}원 ${promotionQuantity}개 ${promotionName}`);
      } else if (promotionQuantity === 0 && promotionName) {
        Console.print(`- ${name} ${formattedPrice}원 재고 없음 ${promotionName}`);
      }
      if (defaultQuantity >= 0) {
        Console.print(`- ${name} ${formattedPrice}원 ${defaultQuantity}개`);
      } else if (defaultQuantity === 0) {
        Console.print(`- ${name} ${formattedPrice}원 재고 없음`);
      }
    })
  }

  printReceipt(purchaseRecords, totals) {
    Console.print("\n==============W 편의점================");
    Console.print("상품명\t\t수량\t금액");

    purchaseRecords.forEach(record => {
      const formattedItemTotal = record.itemTotal.toLocaleString();
      Console.print(`${record.name}\t\t${record.quantity}\t${formattedItemTotal}`);
    });

    Console.print("=============증\t정===============");
    purchaseRecords.forEach(record => {
      if (record.freeItemCount > 0) {
        Console.print(`${record.name}\t\t${record.freeItemCount}`);
      }
    });

    Console.print("====================================");
    Console.print(`총구매액\t\t${totals.totalQuantity}\t${totals.totalCost.toLocaleString()}`);
    Console.print(`행사할인\t\t\t-${totals.totalPromotionDiscount.toLocaleString()}`);
    Console.print(`멤버십할인\t\t\t-${totals.membershipDiscount.toLocaleString()}`);
    Console.print(`내실돈\t\t\t\t${totals.finalCost.toLocaleString()}`);
  }


  printError(errorMessage) {
    Console.print(errorMessage);
  }

}