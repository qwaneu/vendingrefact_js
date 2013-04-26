"use strict";


exports.VendingMachine = function() { 
	this.cans = {};
	this.choice = "";
	var amountPaid = 0;
	var that = this;
	
	
	function dispense() {
		return "nothing";
	}

	//public methods on instance. Consumes memory for each object
	this.deliver = dispense;
	
}