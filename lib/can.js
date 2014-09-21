
"use strict";
//package it.qwan.vender;

//enum Can { none, cola, fanta, sprite, beer }

function defaultFor(arg, defaultValue) { return typeof arg !== 'undefined' ? arg : defaultValue; }

exports.Can = { none : "none", cola:  "cola", fanta : "fanta", sprite : "sprite", beer : "beer"};
exports.Choice = { cola : "cola", none : "none", fanta : "fanta", sprite : "sprite"};

exports.ContainerManager = function() {
  var cns = {};

  function manage_contains(k) {
    return cns[k] !== undefined;
  }

  function manage_get(k) {
    return cns[k];
  }

  function manage_put(k, v) {
    cns[k] = v;
  }

  return {
    containsKey : manage_contains,
    get : manage_get,
    put : manage_put
  };
};

exports.CanContainer = function() {
  var that = this;

  this.getType = function () {
    return that.type;
  };
  this.setType = function (tp) {
    that.type = tp;
  };

  this.getPrice = function () {
    return that.price;
  };
  this.setPrice = function (p) {
    that.price = p;
  };

  this.getAmount = function() {
    return that.amount;
  };
  this.setAmount = function (amnt) {
    that.amount = amnt;
  };

};

exports.Chipknip = function(initial_value) {
  var _credits = initial_value;

  function _HasValue(p) {
    return _credits >= p;
  }

  function _Reduce(p) {
    _credits = _credits - p;
  }

  function _getCredits() {
    return _credits;
  }

  return {
    HasValue : _HasValue,
    Reduce : _Reduce,
    credits : _credits, // oa value is copied while we want a reference.
    getCredits : _getCredits
  };
};





