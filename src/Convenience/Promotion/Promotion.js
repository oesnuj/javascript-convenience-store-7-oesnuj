import { DateTimes } from '@woowacourse/mission-utils'

export default class Promotion {
  #name;
  #buy;
  #get;
  #start_date;
  #end_date;

  constructor({name, buy, get, start_date, end_date}) {
    this.#name = name;
    this.#buy = Number(buy);
    this.#get = Number(get);
    this.#start_date = new Date(start_date);
    this.#end_date = new Date(end_date);
  }

  getName(){
    return this.#name;
  }


  isActive(){
    const currentDate = DateTimes.now();
    return currentDate >= this.#start_date && currentDate <= this.#end_date;
  }

  // 주어진 수량으로 무료 제공 가능 여부 확인
  calculateFreeItems(quantity) {
    return Math.floor(quantity / (this.#buy + this.#get));
  }

  // 1개 추가 시 무료 혜택을 받을 수 있는지 확인
  canReceiveOneMoreFree(quantity) {
    return quantity % (this.#buy + this.#get) === this.#buy;
  }

}
