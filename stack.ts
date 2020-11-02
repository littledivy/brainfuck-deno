export class Stack {
    constructor() {
      this.arr = [];
    }
  
    get size() {
      return this.arr.length;
    }
  
    get top() {
      return this.arr[this.arr.length - 1];
    }
  
    push(el) {
      this.arr.push(el);
    }
  
    pop() {
      return this.arr.pop();
    }
  }