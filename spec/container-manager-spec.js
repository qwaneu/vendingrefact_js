"use strict";

var misc = require("./can.js");

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
    expect(manager.containsKey("notput")).toBe(false);
  });


  it("has what it puts", function() {
    var manager = new misc.ContainerManager();
    manager.put("kie", "putted");
    expect(manager.containsKey("kie")).toBe(true);
  });

});

describe("Chipknip", function () {

  it('has value', function () {
    var ck = new misc.Chipknip(10);
    expect(ck.HasValue(5)).toBe(true);
  });

  it("can reduce credits", function() {
    var ck = new misc.Chipknip(10);
    ck.Reduce(1);
    expect(ck.HasValue(9)).toBe(true);
    expect(ck.HasValue(10)).toBe(false);
    //expect(ck.credits).toEqual(9);
  });
});

