"use strict";

var msc = require("./can.js");
var Can = msc.Can;
var CanContainer = msc.CanContainer;

module.exports.VendingMachine = function() {
  var cans = new msc.ContainerManager();
  var payment_method;
  var chipknip;
  var c = -1;
  var that = this;

  function _set_value(v) {

    payment_method = 1;
    if (c !== -1) {
      c += v;
    } else {
      c = v;
    }
  }
  function _insert_chip(chpknp) {
    // TODO
    // can't pay with chip in britain

    payment_method = 2;
    chipknip = chpknp;
  }

  function haz(cans, choice) {
    return cans.containsKey(choice);
  }

  function _deliver(choice) {
    var res = Can.none;

    //
    // step 1: check if choice exists {
    //
    if (cans.containsKey(choice)) {
      //
      // step2 : check price
      //
      if (cans.get(choice).price === 0) {
        res = cans.get(choice).getType();
        // or price matches
      } else {

        switch (payment_method) {

        case 1: // paying with coins
          if (c !== -1 && cans.get(choice).price <= c) {
            res = cans.get(choice).getType();
            c -= cans.get(choice).price;
          }
          break;

        case 2: // paying with chipknip -
          // TODO: if this machine is in belgium this must be an error
          // {

          if (chipknip.HasValue(cans.get(choice).price)) {
            var prc = cans.get(choice).getPrice();
            chipknip.Reduce(prc);
            res = cans.get(choice).getType();
          }
          break;

        default:
          // TODO: Is this a valid situation?:
          // larry forgot the } else { clause
          // i added it, but i am acutally not sure as to wether this
          // is a problem
          // unknown payment
          break;
        // i think(i) nobody inserted anything
        }
      }
    } else {
      res = Can.none;
    }

    //
    // step 3: check stock
    //
    if (res !== Can.none) {
      if (cans.get(choice).getAmount() <= 0) {
        res = Can.none;
      } else {
        cans.get(choice).setAmount(cans.get(choice).getAmount() - 1);
      }
    }

    // if can is set then return {
    // otherwise we need to return the none
    if (res === Can.none) {
      return Can.none;
    }

    return res;
  }

  function _get_change() {
    var to_return = 0;
    if (c > 0) {
      to_return = c;
      c = 0;
    }
    return to_return;
  }

  function _configure(choice, c, n, prc) {
    var can;

    if(prc === undefined) {
      that.price = 0;
    } else {
      that.price = prc;
    }
    if (cans.containsKey(choice)) {
      cans.get(choice).setAmount(cans.get(choice).getAmount() + n);
      return;
    }
    can = new CanContainer();
    can.setType(c);
    can.setAmount(n);
    can.setPrice(that.price);
    cans.put(choice, can);
  }

  //public methods on instance. Consumes memory for each object
  this.set_value = _set_value;
  this.insert_chip = _insert_chip;
  this.deliver = _deliver;
  this.get_change = _get_change;
  this.configure = _configure;
};
