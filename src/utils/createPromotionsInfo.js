import { readFile } from 'fs/promises';
import Promotion from '../Convenience/Promotion/Promotion.js';
import path from 'path';


export default async function createPromotionsInfo() {
  const filepath = path.join(process.cwd(), 'public/promotions.md');

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