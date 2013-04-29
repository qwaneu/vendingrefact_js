
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
	
	function _getType() {
		return this.type;
	}
	function _setType(type) {
		this.type = type;
	}

	var price;

	function _getPrice() {
		return this.price;
	}
	function _setPrice(p) {
		this.price = p;
	}
	var amount;
	
	function _getAmount() {
		return amount;
	}
	function _setAmount(amnt) {
		amount = amnt;
	}

	return {
		atype : type,
		aprice : price,
		aamount : amount,
		getType : _getType,
		setType : _setType,
		getPrice : _getPrice,
		setPrice : _setPrice,
		getAmount : _getAmount,
		setAmount : _setAmount,
		join : _getAmount
	}
}

exports.Chipknip = function(initial_value) {
	var _credits = initial_value;

	function _HasValue(p) {
		return _credits >= p;
	}

	function _Reduce(p) {
		debugger;
		_credits = _credits - p;
	}

	function _getCredits() {
		return _credits;
	}

	return {
		HasValue : _HasValue,
		Reduce : _Reduce,
		credits : _credits, // for some reason chipknip.credits does not change value after reduce
		getCredits : _getCredits
	}
}





