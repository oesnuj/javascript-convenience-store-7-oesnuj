import ERRORS from '../../src/constants/error.js';

class Validator {

  static checkProductSelection(selectedProducts) {
    selectedProducts.forEach(([name, quantity]) => {
      if (typeof name !== 'string') {
        throw new Error(ERRORS.INVALID_INPUT);
      }
      if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
        throw new Error(ERRORS.INVALID_PRODUCT_QUANTITY);
      }
    });
  }


  static checkYesOrNoInput(input) {
    const normalizedInput = input.trim().toUpperCase();
    if (normalizedInput !== 'Y' && normalizedInput !== 'N') {
      throw new Error(ERRORS.INVALID_INPUT);
    }
    return normalizedInput;
  }
}

export default Validator;
