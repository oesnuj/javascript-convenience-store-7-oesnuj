import { readFile } from 'fs/promises';
import path from 'path';
import Product from '../Convenience/Product/Product.js';

export default async function createProducts() {
  const filepath = path.join(process.cwd(), 'public/products.md');
  const itemList = await readFile(filepath, 'utf-8');
  const parsedItemList = parseItemList(itemList);
  const productMap = new Map();

  parsedItemList.forEach((item) => {
    const [name, price, quantity, promotionName] = item;
    const key = `${name}-${price}`;

    if (productMap.has(key)) {
      updateExistingProduct(productMap, key, quantity, promotionName);
    } else {
      addNewProduct(productMap, key, name, price, quantity, promotionName);
    }
  });

  return Array.from(productMap.values());
}



function parseItemList(itemList) {
  return itemList.trim().split('\n').slice(1).map(item => item.trim().split(','));
}



function updateExistingProduct(productMap, key, quantity, promotionName) {
  const existingProduct = productMap.get(key);
  const { defaultQuantity, promotionQuantity } = calculateQuantities(quantity, promotionName);
  existingProduct.addToDefaultQuantity(defaultQuantity);
  existingProduct.addToPromotionQuantity(promotionQuantity);
}



function addNewProduct(productMap, key, name, price, quantity, promotionName) {
  const { defaultQuantity, promotionQuantity } = calculateQuantities(quantity, promotionName);

  productMap.set(key, new Product({
    name : name,
    price: Number(price),
    defaultQuantity : defaultQuantity,
    promotionQuantity : promotionQuantity,
    promotionName : promotionName === 'null' ? null : promotionName,
  }));
}




function calculateQuantities(quantity, promotionInfo) {
  let defaultQuantity = 0;
  let promotionQuantity = 0;

  if (promotionInfo && promotionInfo !== 'null') {
    promotionQuantity = Number(quantity);
  } else {
    defaultQuantity = Number(quantity);
  }

  return { defaultQuantity, promotionQuantity };
}
