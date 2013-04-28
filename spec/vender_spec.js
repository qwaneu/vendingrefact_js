"use strict";

var buster = require("buster");
var vending = require("../lib/vending");
var misc = require("../lib/can");

buster.spec.expose(); //expose spec functions describe() and it()

/*
var VendingMachine = function() { 
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
*/
describe("Vendingmachine", function () {
	var machine;
	var Can = misc.Can;
	var Choice = misc.Choice;


	before(function() {
		machine = new vending.VendingMachine();
	});


	it("choiceless_machine_delivers_nothing", function () {
		assert(machine.deliver());
		expect(Can.none).toEqual(machine.deliver(Choice.cola));
		expect(Can.none).toEqual(machine.deliver(Choice.fanta));
	});

/*	it("delivers_can_of_choice", function () {
		machine.configure(Choice.cola, Can.cola, 10);
		machine.configure(Choice.fanta, Can.fanta, 10);
		machine.configure(Choice.sprite, Can.sprite, 10);
		machine.deliver(Choice.cola);
		buster.assert(true);
	//	buster.assert.equals(Can.cola, machine.deliver(Choice.cola));
	//	expect(Can.fanta).toEqual(machine.deliver(Choice.fanta));
	//	expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
	});
*/
});
/*

	it("delivers_nothing_when_making_invalid_choice()", function() {
		machine.configure(Choice.cola, Can.cola, 10);
		machine.configure(Choice.fanta, Can.fanta, 10);
		machine.configure(Choice.sprite, Can.sprite, 10);
		assertEquals(Can.none, machine.deliver(Choice.beer));
	});

	it("delivers_nothing_when_not_paid()", function () {
		machine.configure(Choice.fanta, Can.fanta, 10, 2);
		machine.configure(Choice.sprite, Can.sprite, 10, 1);

		assertEquals(Can.none, machine.deliver(Choice.fanta));
	});

/*
	public void Testdelivers_fanta_when_paid() {
		machine.configure(Choice.sprite, Can.sprite, 10, 1);
		machine.configure(Choice.fanta, Can.fanta, 10, 2);

		machine.set_value(2);
		assertEquals(Can.fanta, machine.deliver(Choice.fanta));
		assertEquals(Can.none, machine.deliver(Choice.sprite));
	}

	public void Testdelivers_sprite_when_paid() {
		machine.configure(Choice.sprite, Can.sprite, 10, 1);
		machine.configure(Choice.fanta, Can.fanta, 10, 2);

		machine.set_value(2);
		assertEquals(Can.sprite, machine.deliver(Choice.sprite));
		assertEquals(Can.sprite, machine.deliver(Choice.sprite));
		assertEquals(Can.none, machine.deliver(Choice.sprite));
	}

	public void Testadd_payments() {
		machine.configure(Choice.sprite, Can.sprite, 10, 1);
		machine.configure(Choice.fanta, Can.fanta, 10, 2);

		machine.set_value(1);
		machine.set_value(1);
		assertEquals(Can.sprite, machine.deliver(Choice.sprite));
		assertEquals(Can.sprite, machine.deliver(Choice.sprite));
		assertEquals(Can.none, machine.deliver(Choice.sprite));
	}

	public void Testreturns_change() {
		machine.configure(Choice.sprite, Can.sprite, 10, 1);
		machine.set_value(2);
		assertEquals(2, machine.get_change());
		assertEquals(0, machine.get_change());
	}

	public void Teststock() {
		machine.configure(Choice.sprite, Can.sprite, 1, 0);
		assertEquals(Can.sprite, machine.deliver(Choice.sprite));
		assertEquals(Can.none, machine.deliver(Choice.sprite));
	}

	public void Testadd_stock() {
		machine.configure(Choice.sprite, Can.sprite, 1, 0);
		machine.configure(Choice.sprite, Can.sprite, 1, 0);
		assertEquals(Can.sprite, machine.deliver(Choice.sprite));
		assertEquals(Can.sprite, machine.deliver(Choice.sprite));
		assertEquals(Can.none, machine.deliver(Choice.sprite));
	}

	public void Testcheckout_chip_if_chipknip_inserted() {
		machine.configure(Choice.sprite, Can.sprite, 1, 1);
		Chipknip chip = new Chipknip(10);
		machine.insert_chip(chip);
		assertEquals(Can.sprite, machine.deliver(Choice.sprite));
		assertEquals(9, chip.credits);
	}

	public void Testcheckout_chip_empty() {
		machine.configure(Choice.sprite, Can.sprite, 1, 1);
		Chipknip chip = new Chipknip(0);
		machine.insert_chip(chip);
		assertEquals(Can.none, machine.deliver(Choice.sprite));
		assertEquals(0, chip.credits);
	}
	*/
