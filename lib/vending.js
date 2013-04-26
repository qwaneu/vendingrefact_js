"use strict";

var msc = require("../lib/can");
var Can = msc.Can;

exports.VendingMachine = function() { 
	this.cans = {};
	this.choice = "";
	var amountPaid = 0;
	var that = this;
	
	
	function _deliver() {
		return Can.none;
	}

	//public methods on instance. Consumes memory for each object
	this.deliver = _deliver;
	
}