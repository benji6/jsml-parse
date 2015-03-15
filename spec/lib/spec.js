var jsmlParse = require('../../lib/main.js');
var exampleTags = require('./exampleTags.js');
var expectDomElementsToBeEquivalent = require("./expectDomElementsToBeEquivalent");

var expectTextToBe = (domEl, text) => {
  expect(domEl.childNodes[0].nodeName).toBe("#text");
  expect(domEl.childNodes[0].nodeValue).toBe(text);
};

describe("jsmlParse called on JSML object with properties as follows:", () => {
  require("./specs/tag.js");
  require("./specs/text.js");
  require("./specs/count.js");
  require("./specs/children.js");
  require("./specs/callback.js");

  describe("other valid element attributes", () => {
    it("works", () => {

    });
  });
  describe("called with parent DOM Element", () => {
    it("appends", () => {

    });
  });
});
