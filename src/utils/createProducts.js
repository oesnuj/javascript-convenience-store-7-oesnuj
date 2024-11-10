import { readFile } from 'fs/promises';
import  Product from '../Convenience/Product.js';

export async function createProducts(filepath){
  try{
    const itemList = await readFile(filepath, 'utf-8');
    const parsedItemList = parseItemList(itemList);

    return parsedItemList.map((item) => {
      const [name, price, quantity, promotionInfo] = item;
      return new Product({name, price, quantity, promotionInfo});
    })

  }catch(error){
    throw new Error(`[ERROR] ${error.message}`)
  }
}


function parseItemList(itemList){
  const parsedItemList = itemList
  .trim()
  .split('\n')
  .slice(1)
  .map(item => item.trim().split(','));
  return parsedItemList;
}