var jsmlParse = require('../../../lib/main.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");
var expectTextToBe = require("../expectTextToBe.js");

describe("count:", () => {
  it("returns an array of DOM elements", () => {
    var jsml = {
      count: 8,
      tag: "p"
    };
    var domEls = jsmlParse(jsml);

    domEls.forEach((domEl) => {
      expectDomElementsToBeEquivalent(domEl, document.createElement("p"));
    });
  });
  it("passes count into attribute callbacks", () => {
    var jsml = {
      count: 8,
      tag: "p",
      text: (count) => count
    };
    var domEls = jsmlParse(jsml);

    domEls.forEach((domEl, index) => {
      expectTextToBe(domEl, String(index));
    });
  });
  it("0 is passed as the count argument if count is not specified", () => {
    var jsml = {
      tag: "p",
      text: (count) => {
        expect(count).toBe(0);
        return count;
      }
    };
    
    var domEl = jsmlParse(jsml);

    expectTextToBe(domEl, String(0));
  });
});
