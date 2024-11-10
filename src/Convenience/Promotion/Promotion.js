export default class Promotion {
  #name;
  #buy;
  #get;
  #start_date;
  #end_date;

  constructor({name, buy, get, start_date, end_date}) {
    this.#name = name;
    this.#buy = buy;g
    this.#get = get;
    this.#start_date = new Date(start_date);
    this.#end_date = new Date(end_date);
  }

  isActive(){
    const currentDate = new Date();
    return currentDate >= this.#start_date && currentDate <= this.#end_date;
  }

  calculateBonusProducts(buyProductQuantity){
    if(buyProductQuantity < this.#buy){
      return 0;
    }
    return buyProductQuantity / this.#buy

  }


}
