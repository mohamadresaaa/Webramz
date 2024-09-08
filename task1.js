class Stack {
  constructor() {
    this.items = [];
  }

  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }

  push(element) {
    this.items.push(element);
  }

  peek() {
    if (this.isEmpty()) {
      return "stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printStack() {
    return this.items.join(" ");
  }
    
  size() {
    return this.items.length;
  }

  reverse() {
    this.items = this.items.reverse();
  }
}
