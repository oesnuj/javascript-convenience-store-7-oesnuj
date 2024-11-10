import { readFile } from 'fs/promises';
import Product from '../Convenience/Product/Product.js';

export async function createProducts(filepath) {
  const itemList = await readFile(filepath, 'utf-8');
  const parsedItemList = parseItemList(itemList);

  const productMap = new Map();

  parsedItemList.forEach((item) => {
    const [name, price, quantity, promotionInfo] = item;
    const key = `${name}-${price}`;

    if (productMap.has(key)) {
      updateExistingProduct(productMap, key, quantity, promotionInfo);
    } else {
      addNewProduct(productMap, key, name, price, quantity, promotionInfo);
    }
  });

  return Array.from(productMap.values());
}

function parseItemList(itemList) {
  return itemList.trim().split('\n').slice(1).map(item => item.trim().split(','));
}

function updateExistingProduct(productMap, key, quantity, promotionInfo) {
  const existingProduct = productMap.get(key);

  const { defaultQuantity, promotionQuantity } = calculateQuantities(quantity, promotionInfo);
  existingProduct.defaultQuantity += defaultQuantity;
  existingProduct.promotionQuantity += promotionQuantity;
}

function addNewProduct(productMap, key, name, price, quantity, promotionInfo) {
  const { defaultQuantity, promotionQuantity } = calculateQuantities(quantity, promotionInfo);

  productMap.set(key, new Product({
    name,
    price: Number(price),
    defaultQuantity,
    promotionQuantity,
    promotionInfo : promotionInfo === 'null' ? null : promotionInfo,
  }));
}


function calculateQuantities(quantity, promotionInfo) {
  let defaultQuantity = 0;
  let promotionQuantity = 0;

  if (promotionInfo && promotionInfo !== 'null') {
    promotionQuantity = Number(quantity);
  }

  if (!promotionInfo || promotionInfo === 'null') {
    defaultQuantity = Number(quantity);
  }

  return { defaultQuantity, promotionQuantity };
}
