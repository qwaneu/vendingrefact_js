"use strict";

var msc = require("../lib/can");
var ndrscr = require("underscore");
var Can = msc.Can;
var CanContainer = msc.CanContainer;

Object.prototype.get = function(key) {
	return new CanContainer()
}

exports.VendingMachine = function() { 
	var cans = new msc.ContainerManager();
	var payment_method;
	var chipknip;
	var c = -1;
	var that = this;
	
	function _set_value(v) {}
	function insert_chip(chpknp) {}

	function haz(cans, choice) {
		return cans.hasOwnProperty(choice);
	}

	function _deliver() {
		
		res = Can.none;
		//
		// step 1: check if choice exists {
		//
		if (haz(cans, choice)) {
			//
			// step2 : check price
			//
			if (cans[choice].price == 0) {
				res = cans[choice].getType();
				// or price matches
			} else {

				switch (payment_method) {
				case 1: // paying with coins
					if (c != -1 && cans[choice]price <= c) {
						res = cans[choice]getType();
						c -= cans[choice).price;
					}
					break;
				case 2: // paying with chipknip -
					// TODO: if this machine is in belgium this must be an error
					// {
					if (chipknip.HasValue(cans[choice]price)) {
						chipknip.Reduce(cans.get(choice).price);
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
		if (res != Can.none) {
			if (cans.get(choice).getAmount() <= 0) {
				res = Can.none;
			} else {
				cans.get(choice).setAmount(cans.get(choice).getAmount() - 1);
			}
		}

		// if can is set then return {
		// otherwise we need to return the none
		if (res == Can.none) {
			return Can.none;
		}

		return res;
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