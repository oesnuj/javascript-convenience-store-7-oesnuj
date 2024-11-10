import { readFile } from 'fs/promises';
import Promotion from '../Convenience/Promotion/Promotion.js';


export default async function createPromotionsInfo(filepath) {
  const promotionList = await readFile(filepath, 'utf-8');
  const parsedPromotionList = parsePromotionList(promotionList);

  return parsedPromotionList.map((promotion) => {
    const [name, buy, get, start_date, end_date] = promotion;
    return new Promotion({name,buy, get, start_date, end_date});
  });

}

function parsePromotionList(itemList) {
  return itemList.trim().split('\n').slice(1).map(promotion => promotion.trim().split(','));
}