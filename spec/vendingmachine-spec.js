"use strict";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body><div id="test"></div></body></html>');

global.window = dom.window;
global.document = dom.window.document;

var vending = require("../lib/vending");
var misc = require("../lib/can");
var $ = require("jquery");

describe("Vendingmachine", function () {
  var machine;
  var Can = misc.Can;
  var Choice = misc.Choice;
  var Chipknip = misc.Chipknip;

  beforeEach(function() {
    machine = new vending.VendingMachine();
    $('#test').empty().append('<div id="displayline"></div>');
  });

  it("updates display", function () {
    machine.set_value(2);
    expect($('#displayline').text()).toContain('2');
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
    expect(Can.cola).toEqual(machine.deliver(Choice.cola));
    expect(Can.fanta).toEqual(machine.deliver(Choice.fanta));
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
  });


  it("delivers_nothing_when_making_invalid_choice()", function() {
    machine.configure(Choice.cola, Can.cola, 10);
    machine.configure(Choice.fanta, Can.fanta, 10);
    machine.configure(Choice.sprite, Can.sprite, 10);
    expect(Can.none).toEqual(machine.deliver(Choice.beer));
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
    expect($('#displayline').text()).toContain('2');
    expect(machine.deliver(Choice.fanta)).toEqual(Can.fanta);
    expect($('#displayline').text()).toContain('0');
    expect(machine.deliver(Choice.sprite)).toEqual(Can.none);
  });

  it("delivers sprite when paid", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.configure(Choice.fanta, Can.fanta, 10, 2);

    machine.set_value(2);
    expect($('#displayline').text()).toContain('2');
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect($('#displayline').text()).toContain('1');
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
  });

  it("adds payments", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.configure(Choice.fanta, Can.fanta, 10, 2);

    machine.set_value(1);
    expect($('#displayline').text()).toContain('1');
    machine.set_value(1);
    expect($('#displayline').text()).toContain('2');
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
  });

  it("returns change", function () {
    machine.configure(Choice.sprite, Can.sprite, 10, 1);
    machine.set_value(2);
    expect(2).toEqual(machine.get_change());
    expect($('#displayline').text()).toEqual('val: 0');
    expect(0).toEqual(machine.get_change());
  });

  it("stock", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
  });

  it("adds stock", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
  });

  it("checkout_chip_if_chipknip_inserted", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 1);
    var chip = new Chipknip(10);
    machine.insert_chip(chip);
    expect($('#displayline').text()).toContain('chip: 10');
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(9).toEqual(chip.getCredits());
  });
  
  it("chipknip reduce value", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 1);
    var chip = new Chipknip(5);
    machine.insert_chip(chip);
    expect(Can.sprite).toEqual(machine.deliver(Choice.sprite));
    expect(4).toEqual(chip.credits);
  });

  it("checkout_chip_empty", function () {
    machine.configure(Choice.sprite, Can.sprite, 1, 1);
    var chip = new Chipknip(0);
    machine.insert_chip(chip);
    expect(Can.none).toEqual(machine.deliver(Choice.sprite));
    expect(0).toEqual(chip.credits);
  });
  
  it("really delivers choice", function () {
    $('#test').append('<div id="sprite"></div><div id="bin"></div>');
    machine.configure(Choice.sprite, Can.sprite, 1, 0);
    $('#sprite').click();
    expect($('#bin').text()).toContain('sprite');
  });
});
