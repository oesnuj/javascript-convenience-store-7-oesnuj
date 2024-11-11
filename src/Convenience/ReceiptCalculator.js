export default class ReceiptCalculator {
  static calculateTotals(purchaseRecords, isMembership) {
    let totalQuantity = 0;
    let totalCost = 0;
    let totalPromotionDiscount = 0;
    let membershipDiscount = 0;

    // 각 구매 항목의 수량, 총 금액, 프로모션 할인 계산
    purchaseRecords.forEach(record => {
      totalQuantity += record.quantity;
      totalCost += record.itemTotal;
      totalPromotionDiscount += record.promotionDiscount;
    });

    // 멤버십 할인 계산 (프로모션 할인이 없는 상품에 대해 30% 할인 적용)
    if (isMembership) {
      const nonPromotionTotal = purchaseRecords
      .filter(record => record.promotionDiscount === 0)
      .reduce((acc, record) => acc + record.itemTotal, 0);

      membershipDiscount = Math.floor(nonPromotionTotal * 0.3);
      membershipDiscount = Math.min(membershipDiscount, 8000);
    }

    // 최종 결제 금액 계산
    const finalCost = totalCost - totalPromotionDiscount - membershipDiscount;

    return {
      totalQuantity,
      totalCost,
      totalPromotionDiscount,
      membershipDiscount,
      finalCost,
    };
  }
}
