"use strict";

var buster = require("buster");

var misc = require("../lib/can");

buster.spec.expose(); //expose spec functions describe() and it()

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