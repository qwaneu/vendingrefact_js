"use strict";

var msc = require("../lib/can");
var ndrscr = require("lodash");
var $ = require("jquery");
var Can = msc.Can;
var CanContainer = msc.CanContainer;


exports.VendingMachine = class VendingMachine {

  set_value(v) {

    this.payment_method = 1;
    if (this.c !== -1) {
      this.c += v;
    } else {
      this.c = v;
    }
    $('#displayline').text('val: ' + this.c);
  }
  insert_chip(chpknp) {
    // TODO
    // can't pay with chip in britain

    this.payment_method = 2;
    this.chipknip = chpknp;
    $('#displayline').text('chip: ' + this.chipknip.getCredits());
  }

  haz(cans, choice) {
    return cans.containsKey(choice);
  }

  deliver(choice) {
    var res = Can.none;

    var cans = this.cans;
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

        switch (this.payment_method) {

        case 1: // paying with coins
          if (this.c !== -1 && cans.get(choice).price <= this.c) {
            res = cans.get(choice).getType();
            this.c -= cans.get(choice).price;
            $('#displayline').text('val: ' + this.c);
          }
          break;

        case 2: // paying with chipknip -
          // TODO: if this machine is in belgium this must be an error
          // {
          
          if (this.chipknip.HasValue(cans.get(choice).price)) {
            var prc = cans.get(choice).getPrice();
            this.chipknip.Reduce(prc);
            $('#displayline').text('chip: ' + this.chipknip.getCredits());
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

  get_change() {
    var to_return = 0;
    if (this.c > 0) {
      to_return = this.c;
      this.c = 0;
      $('#displayline').text('val: ' + this.c);
    }
    return to_return;
  }

  configure(choice, c, n, prc) {
    var can;
    var that = this;

    if(prc === undefined) {
      this.price = 0;
    } else {
      this.price = prc;
    }
    if (this.cans.containsKey(choice)) {
      this.cans.get(choice).setAmount(this.cans.get(choice).getAmount() + n);
      return;
    }
    can = new CanContainer();
    can.setType(c);
    can.setAmount(n);
    can.setPrice(this.price);
    this.cans.put(choice, can);
    
    $('#'+choice).click(function () {
      $('#bin').text(that.deliver(choice));
    });
  }

  constructor() {
    this.cans = new msc.ContainerManager();
    this.c = -1;
  
    [0.5, 1, 2].forEach(function (c) {
      var button = $('<button>');
      $('#coinslot').prepend('<br>').prepend(button);
      button.text(c+'€').click(function () { _set_value(c); });
    });

    $('#change').click(function () {
      $('#bin').text('change: ' + _get_change());
    });
  }
};
