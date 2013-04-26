"use strict";
var buster = require("buster");
var vending = require("../lib/vending");

buster.spec.expose(); //expose spec functions describe() and it()

describe("Free Vendingmachine", function () {
	var vendingMachine;
	var nothing = new vending.Can("nothing");
	var fanta = new vending.Can("Fanta");
	var cola = new vending.	Can("Coca Cola");
	
	before(function () {
		vendingMachine = new vending.VendingMachine();
		vendingMachine.configure("fanta", "Fanta");
		vendingMachine.configure("cola", "Coca Cola");
	})

	it("dispenses nothing when non-existant choice is chosen", function () {
		vendingMachine.choose("beer");
		var dispensed = vendingMachine.dispense();
		expect(nothing).toEqual(dispensed);
	});

	it("dispenses cola when machine is filled with cola, and cola is chosen", function () {
		vendingMachine.choose("cola");
		var dispensed = vendingMachine.dispense();
		expect(dispensed).toEqual(cola);
	});

	it("dispenses fanta when machine is filled with fanta and cola, and fanta is chosen", function () {
		vendingMachine.choose("fanta");
		var dispensed = vendingMachine.dispense();
		expect(dispensed).toEqual(fanta);
	});

});
