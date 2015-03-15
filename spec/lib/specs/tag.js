var jsmlParse = require('../../../lib/main.js');
var exampleTags = require('../exampleTags.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");

describe("tag:", () => {
  it("returns a DOM element with the specified tag name when called with a single jsml object", () => {
    var jsmlObjects = exampleTags.map((tag) => {
      return {
        tag
      };
    });

    jsmlObjects.forEach((jsmlObject, index) => {
      expectDomElementsToBeEquivalent(jsmlParse(jsmlObject), document.createElement(exampleTags[index]));
    });
  });
});
