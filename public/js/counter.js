const Counter = class Counter {
  constructor(max, value) {
    this.max = max;
    this.value = 0;
  }
  up() {
    this.value + 1 !== this.max ? this.value += 1 : this.value = 0;
    return this;
  }
  down() {
    this.value - 1 >= 0 ? this.value -= 1 : this.value;
    return this;
  }
};
