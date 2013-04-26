"use strict";

var msc = require("../lib/can");
var Can = msc.Can;

exports.VendingMachine = function() { 
	var cans = {};
	var payment_method;
	var chipknip;
	var c = -1;
	var price;
	
	function _deliver() {
		return Can.none;
	}

	//public methods on instance. Consumes memory for each object
	this.deliver = _deliver;
	
}