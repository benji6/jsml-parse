var jsmlParse = require('../../../lib/main.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");

it("appends created DOM structure to the specified DOM element", () => {
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
