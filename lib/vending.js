"use strict";

var msc = require("../lib/can");
var ndrscr = require("underscore");
var Can = msc.Can;
var CanContainer = msc.CanContainer;

exports.VendingMachine = function() { 
	var cans = {};
	var payment_method;
	var chipknip;
	var c = -1;
	var that = this;
	
	function _set_value(v) {}
	function insert_chip(chpknp) {}


	function _deliver() {
		return Can.none;
	}

	function _get_change() {}

	function _configure(choice, c, n, prc) {
		var can;
		that.price = prc;
		if (ndrscr.contains(cans, choice)) {
			cans.get(choice).setAmount(cans.get(choice).getAmount() + n);
			return;
		}
		can = new CanContainer();
		can.setType(c);
		can.setAmount(n);
		can.setPrice(prc);
		cans[choice] = can;
	}

	//public methods on instance. Consumes memory for each object
	this.set_value = _set_value;
	this.deliver = _deliver;
	this.get_change = _get_change;
	this.configure = _configure;
	
}