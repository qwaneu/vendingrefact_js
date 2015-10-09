"use strict";

var vending = require("./vendingmachine.js");
var misc = require("./can.js");

describe("Vendingmachine", function () {
  var machine;
  var Can = misc.Can;
  var Choice = misc.Choice;
  var Chipknip = misc.Chipknip;

  beforeEach(function() {
    machine = new vending.VendingMachine();
  });

  it("choiceless_machine_delivers_nothing", function () {
    expect(machine.deliver()).toBeDefined();
    expect(machine.deliver(Choice.cola)).toEqual(Can.none);
    expect(machine.deliver(Choice.fanta)).toEqual(Can.none);
  });

  it("delivers_can_of_choice", function () {
    machine.configure(Choice.cola, Can.cola, 10);
    machine.configure(Choice.fanta, Can.fanta, 10);
    machine.configure(Choice.sprite, Can.sprite, 10);
    machine.deliver(Choice.cola);
    expect(machine.deliver(Choice.cola)).toEqual(Can.cola);
    expect(machine.deliver(Choice.fanta)).toEqual(Can.fanta);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
  });


  it("delivers_nothing_when_making_invalid_choice()", function() {
    machine.configure(Choice.cola, Can.cola, 10);
    machine.configure(Choice.fanta, Can.fanta, 10);
    machine.configure(Choice.sprite, Can.sprite, 10);
    expect(machine.deliver(Choice.beer)).toEqual(Can.none);
  });

  it("delivers_nothing_when_not_paid()", function () {
    machine.configure(Choice.fanta, Can.fanta, 10, 2);
    machine.configure(Choice.sprite, Can.sprite, 10, 1);

    expect(machine.deliver(Choice.fanta)).toEqual(Can.none);
  });

  it("delivers_fanta_when_paid", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.configure(Choice.fanta, Can.fanta, 10, 2);

    machine.set_value(2);
    expect(machine.deliver(Choice.fanta)).toEqual(Can.fanta);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.none);
  });

  it("delivers sprite when paid", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.configure(Choice.fanta, Can.fanta, 10, 2);

    machine.set_value(2);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.none);
  });

  it("adds payments", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.configure(Choice.fanta, Can.fanta, 10, 2);

    machine.set_value(1);
    machine.set_value(1);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.none);
  });

  it("returns change", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.set_value(2);
    expect(machine.get_change()).toEqual(2);
    expect(machine.get_change()).toEqual(0);
  });

  it("stock", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.none);
  });

  it("adds stock", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.none);
  });

  it("checkout_chip_if_chipknip_inserted", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 1);
    var chip = new Chipknip(10);
    machine.insert_chip(chip);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
    expect(chip.getCredits()).toEqual(9);
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
    expect(machine.deliver(Choice.sprite)).toEqual(Can.sprite);
    //we expected next value to be 4, but get 5 instead. getCredits() reflects real value
    expect(chip.credits).toEqual(5);
    expect(chip.getCredits()).toEqual(4);
  });

  it("checkout_chip_empty", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 1);
    var chip = new Chipknip(0);
    machine.insert_chip(chip);
    expect(machine.deliver(Choice.sprite)).toEqual(Can.none);
    expect(chip.credits).toEqual(0);
  });
});
