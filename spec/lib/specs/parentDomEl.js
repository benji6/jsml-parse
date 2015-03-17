var jsmlParse = require('../../../lib/main.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");

it("appends created DOM structure to the specified DOM element when jsml is a single object", () => {
  var id = Math.random();
  var jsml = {
    tag: "div",
    id,
    children: {
      tag: "span"
    }
  };

  jsmlParse(jsml, document.body);

  expectDomElementsToBeEquivalent(document.getElementById(id), document.createElement("div"));
});

it("appends created DOM structure to the specified DOM element when jsml is an array of jsml objects", () => {
  var id0 = Math.random();
  var id1 = Math.random();

  var jsml = [
    {
      tag: "div",
      id: id0
    },
    {
      tag: "div",
      id: id1
    }
  ];

  jsmlParse(jsml, document.body);

  expectDomElementsToBeEquivalent(document.getElementById(id0), document.createElement("div"));
  expectDomElementsToBeEquivalent(document.getElementById(id1), document.createElement("div"));
});
