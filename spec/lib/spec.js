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
    it("if JSML property is a valid attribute name that attribute is assigned to the created DOM element", () => {
      var p;

      var attributes = {
        id: "id",
        className: "testClass"
      };

      var jsml = {
        tag: "div",
      };

      for (p in attributes) {
        jsml[p] = attributes[p];
      }

      var domEl = jsmlParse(jsml);

      for (p in attributes) {
        expect(domEl[p]).toBe(attributes[p]);
      }
    });
  });
  describe("called with parent DOM Element", () => {
    it("appends", () => {

    });
  });
});
