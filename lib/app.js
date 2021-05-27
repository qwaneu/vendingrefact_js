'use strict';

var vending = require('./vending');
var util = require('./can');
var Choice = util.Choice;
var Can = util.Can;
var Chipknip = util.Chipknip;
var $ = require("jquery");

$(document).ready(function () {
  var vm = new vending.VendingMachine();
  vm.configure(Choice.cola, Can.cola, 10, 2);
  vm.configure(Choice.fanta, Can.fanta, 2, 1);
  vm.configure(Choice.sprite, Can.beer, 10, 0);
  
  var chip = new Chipknip(10);
  $('#ck').click(function () {
    vm.insert_chip(chip);
  });
});


