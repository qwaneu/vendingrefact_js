/* global describe, it, expect, assert, before */
"use strict";

var buster = require("buster");

var misc = require("../lib/can");

buster.spec.expose(); //expose spec functions describe() and it()

describe("Can", function () {

	it("can be none", function() {
		expect(misc.Can.none).toEqual("none");
	});
});


describe("CanContainer", function () {

	it("has type", function() {
		var container = new misc.CanContainer();
		expect(container.setType("cola"));
		expect(container.getType()).toEqual("cola");
	});


	it("has price", function() {
		var container = new misc.CanContainer();
		expect(container.setPrice(1));
		expect(container.getPrice()).toEqual(1);
	});


	it("has amount", function() {
		var container = new misc.CanContainer();
		expect(container.setAmount(10));
		expect(container.getAmount()).toEqual(10);
	});
});


describe("ContainerManager", function () {

	it("gets what it puts", function() {
		var manager = new misc.ContainerManager();
		manager.put("key", "the value");
		expect("the value").toEqual(manager.get("key"));
	});

	it("has not what it does not put", function() {
		var manager = new misc.ContainerManager();
		assert(!manager.containsKey("notput"));
	});


	it("has what it puts", function() {
		var manager = new misc.ContainerManager();
		manager.put("kie", "putted");
		assert(manager.containsKey("kie"));
	});

});

describe("Chipknip", function () {

	it('has value', function () {
		var ck = new misc.Chipknip(10);
		assert(ck.HasValue(5));
	});

	it("can reduce credits", function() {
		var ck = new misc.Chipknip(10);
		ck.Reduce(1);
		assert(ck.HasValue(9));
		assert(!ck.HasValue(10));
		assert(9, ck.credits);

	});
});