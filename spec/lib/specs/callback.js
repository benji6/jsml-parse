var jsmlParse = require('../../../lib/main.js');
var exampleTags = require('../exampleTags.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");

describe("callback:", () => {
  it("callback: executes a callback on the created DOM element taking the following arguments (domElement, parentNode, count)", () => {
    var counter = 0;
    var jsml = {
      tag: "div",
      children: exampleTags.map((tag) => {
        return {
          tag,
          count: 4,
          callback: function (domElement, parentNode, count) {
            expectDomElementsToBeEquivalent(domElement, document.createElement(exampleTags[Math.floor(counter / 4)]));
            expectDomElementsToBeEquivalent(parentNode, document.createElement("div"));
            expect(count).toBe(counter % 4);
            counter++;
          }
        };
      }),
    };
    jsmlParse(jsml);
  });
});
