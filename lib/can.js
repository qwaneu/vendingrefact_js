"use strict";

function defaultFor(arg, defaultValue) { return typeof arg !== 'undefined' ? arg : defaultValue; }

exports.Can = { none : "none", cola:  "cola", fanta : "fanta", sprite : "sprite", beer : "beer"};
exports.Choice = { cola : "cola", none : "none", fanta : "fanta", sprite : "sprite"};

exports.ContainerManager = class ContainerManager {
  constructor() {
    this.cns = {};
  }

  containsKey(k) {
    return this.cns[k] !== undefined;
  }

  get(k) {
    return this.cns[k];
  }

  put(k, v) {
    this.cns[k] = v;
  }
};

exports.CanContainer = class CanContainer {
  getType() {
    return this.type;
  };
  setType(tp) {
    this.type = tp;
  };

  getPrice() {
    return this.price;
  };
  setPrice(p) {
    this.price = p;
  };

  getAmount() {
    return this.amount;
  };
  setAmount(amnt) {
    this.amount = amnt;
  };

};

exports.Chipknip = class Chipknip {
  constructor(initial_value) {
    this.credits = initial_value;
  }

  HasValue(p) {
    return this.credits >= p;
  }

  Reduce(p) {
    this.credits = this.credits - p;
  }

  getCredits() {
    return this.credits;
  }
};





