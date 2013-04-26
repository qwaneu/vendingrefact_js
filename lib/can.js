
"use strict";
//package it.qwan.vender;

//enum Can { none, cola, fanta, sprite, beer }

function defaultFor(arg, defaultValue) { return typeof arg !== 'undefined' ? arg : defaultValue; }

exports.Can = { none : "none", cola:  "cola", fanta : "fanta", sprite : "sprite", beer : "beer"};
exports.Choice = { cola : "cola", none : "none", fanta : "fanta", sprite : "sprite"};

exports.ContainerManager = function() {
	var cns = new Object();

	function manage_contains(k) {
		return cns[k] != undefined;
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
	}
}

exports.CanContainer = function() {

	var type;
	
	this.getType = function () {
		return type;
	}
	this.setType = function (type) {
		this.type = type;
	}

	var price;

	this.getPrice = function () {
		return price;
	}
	this.setPrice = function (p) {
		this.price = p;
	}
	var amount;
	
	this.getAmount = function () {
		return amount;
	}
	this.setAmount = function (amnt) {
		this.amount = amnt;
	}

}




