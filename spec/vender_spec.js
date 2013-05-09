/* global describe, it, expect, assert, before */
"use strict";

var buster = require("buster");
var vending = require("../lib/vending");
var misc = require("../lib/can");

buster.spec.expose();

describe("Vendingmachine", function () {
	var machine;
	var Can = misc.Can;
	var Choice = misc.Choice;
	var Chipknip = misc.Chipknip;

	before(function() {
		machine = new vending.VendingMachine();
	});

	it("choiceless_machine_delivers_nothing", function () {
		assert(machine.deliver());
		expect(Can.none).toEqual(machine.deliver(Choice.cola));
		expect(Can.none).toEqual(machine.deliver(Choice.fanta));
	});

	it("delivers_can_of_choice", function () {
		machine.configure(Choice.cola, Can.cola, 10);
		machine.configure(Choice.fanta, Can.fanta, 10);
		machine.configure(Choice.sprite, Can.sprite, 10);
		machine.deliver(Choice.cola);
		buster.assert.equals(Can.cola, machine.deliver(Choice.cola));
		expect(Can.fanta).toEqual(machine.deliver(Choice.fanta));
		expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
	});


	it("delivers_nothing_when_making_invalid_choice()", function() {
		machine.configure(Choice.cola, Can.cola, 10);
		machine.configure(Choice.fanta, Can.fanta, 10);
		machine.configure(Choice.sprite, Can.sprite, 10);
		buster.assert.equals(Can.none, machine.deliver(Choice.beer));
	});

	it("delivers_nothing_when_not_paid()", function () {
		machine.configure(Choice.fanta, Can.fanta, 10, 2);
		machine.configure(Choice.sprite, Can.sprite, 10, 1);

		buster.assert.equals(Can.none, machine.deliver(Choice.fanta));
	});

  it("delivers_fanta_when_paid", function () {
		machine.configure(Choice.sprite, Can.sprite, 10, 1);
		machine.configure(Choice.fanta, Can.fanta, 10, 2);

		machine.set_value(2);
		buster.assert.equals(Can.fanta, machine.deliver(Choice.fanta));
		buster.assert.equals(Can.none, machine.deliver(Choice.sprite));
	});

	it("delivers sprite when paid", function () {
		machine.configure(Choice.sprite, Can.sprite, 10, 1);
		machine.configure(Choice.fanta, Can.fanta, 10, 2);

		machine.set_value(2);
		buster.assert.equals(Can.sprite, machine.deliver(Choice.sprite));
		buster.assert.equals(Can.sprite, machine.deliver(Choice.sprite));
		buster.assert.equals(Can.none, machine.deliver(Choice.sprite));
	});

	it("adds payments", function () {
		machine.configure(Choice.sprite, Can.sprite, 10, 1);
		machine.configure(Choice.fanta, Can.fanta, 10, 2);

		machine.set_value(1);
		machine.set_value(1);
		buster.assert.equals(Can.sprite, machine.deliver(Choice.sprite));
		buster.assert.equals(Can.sprite, machine.deliver(Choice.sprite));
		buster.assert.equals(Can.none, machine.deliver(Choice.sprite));
	});

	it("returns change", function () {
		machine.configure(Choice.sprite, Can.sprite, 10, 1);
		machine.set_value(2);
		buster.assert.equals(2, machine.get_change());
		buster.assert.equals(0, machine.get_change());
	});

	it("stock", function () {
		machine.configure(Choice.sprite, Can.sprite, 1, 0);
		buster.assert.equals(Can.sprite, machine.deliver(Choice.sprite));
		buster.assert.equals(Can.none, machine.deliver(Choice.sprite));
	});

	it("adds stock", function () {
		machine.configure(Choice.sprite, Can.sprite, 1, 0);
		machine.configure(Choice.sprite, Can.sprite, 1, 0);
		buster.assert.equals(Can.sprite, machine.deliver(Choice.sprite));
		buster.assert.equals(Can.sprite, machine.deliver(Choice.sprite));
		buster.assert.equals(Can.none, machine.deliver(Choice.sprite));
	});

	it("checkout_chip_if_chipknip_inserted", function () {
		machine.configure(Choice.sprite, Can.sprite, 1, 1);
		var chip = new Chipknip(10);
		machine.insert_chip(chip);
		buster.assert.equals(Can.sprite, machine.deliver(Choice.sprite));
		buster.assert.equals(9, chip.getCredits());
	});
	/*
		when debugging, chipknip._credits changes during the call of chipknip.Reduce(),
		and the credits property changes in a unit test directly on chipknip,
		but on the outside in the machine, .credits doesn't change, while .getCredits()
		does reflect the change.
	*/
	it("defect on chipknip credits property. Does not reduce value", function () {
		machine.configure(Choice.sprite, Can.sprite, 1, 1);
		var chip = new Chipknip(5);
		machine.insert_chip(chip);
		buster.assert.equals(Can.sprite, machine.deliver(Choice.sprite));
		//we expected next value to be 4, but get 5 instead. getCredits() reflects real value
		buster.assert.equals(5, chip.credits);
		buster.assert.equals(4, chip.getCredits());
	});

  it("checkout_chip_empty", function () {
		machine.configure(Choice.sprite, Can.sprite, 1, 1);
		var chip = new Chipknip(0);
		machine.insert_chip(chip);
		buster.assert.equals(Can.none, machine.deliver(Choice.sprite));
		buster.assert.equals(0, chip.credits);
	});
});
