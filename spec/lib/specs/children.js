var jsmlParse = require('../../../lib/main.js');
var exampleTags = require('../exampleTags.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");

describe("children:", () => {
  it("when children property is a single JSML object a corresponding DOM element is created and appended to the parent DOM element", () => {
    var jsml = {
      tag: "div",
      children: {
        tag: "span"
      }
    };
    var domEl = jsmlParse(jsml);

    expectDomElementsToBeEquivalent(domEl, document.createElement("div"));
    expectDomElementsToBeEquivalent(domEl.children[0], document.createElement("span"));
  });
  it("large hierarchical structures can be created by creating single JSML objects with single JSML children which in turn have single children and so on...", () => {
    var recursivelySetChildren = function recurse (jsml, tag) {
      if (!jsml.children) {
        jsml.children = {
          tag
        };
        return;
      }
      recurse(jsml.children, tag);
    };

    var jsml = exampleTags.reduce(function (acc, tag) {
      if (typeof acc === "string") {
        return {
          tag: acc,
          children: {
            tag: tag
          }
        };
      }
      recursivelySetChildren(acc, tag);
      return acc;
    });

    var domStructure = jsmlParse(jsml);

    recursivelyGetChild = function recurse (domEl, index) {
      if (!index) {
        return domEl;
      }
      return recurse(domEl.children[0], --index);
    };
    exampleTags.forEach(function (tag, index, arr) {
      expectDomElementsToBeEquivalent(recursivelyGetChild(domStructure, index), document.createElement(tag));
    });
  });
  it("when children property is an array of jsml objects corresponding DOM elements are created and appended to the parent DOM element", () => {
    var jsml = {
      tag: "div",
      children: exampleTags.map((tag) => {
        return {
          tag
        };
      }),
    };
    var domEl = jsmlParse(jsml);

    expectDomElementsToBeEquivalent(domEl, document.createElement("div"));
    exampleTags.forEach(function (tag, index) {
      expectDomElementsToBeEquivalent(domEl.children[index], document.createElement(tag));
    });
  });

  it("when children have count property the correct number of children are appended", () => {
    var count = 5;

    var jsml = {
      tag: "div",
      children: exampleTags.map((tag) => {
        return {
          count,
          tag
        };
      }),
    };
    var domEl = jsmlParse(jsml);
    expectDomElementsToBeEquivalent(domEl, document.createElement("div"));
    exampleTags.forEach(function (tag, index) {
      for (var i = 0; i < count; i++) {
        expectDomElementsToBeEquivalent(domEl.children[index * count + i], document.createElement(tag));
      }
    });
  });
  it("expected behaviour when parent and children have count property", () => {
    var count = 5;

    var jsml = {
      tag: "div",
      count,
      children: exampleTags.map((tag) => {
        return {
          count,
          tag
        };
      }),
    };
    var domEl = jsmlParse(jsml);
    exampleTags.forEach(function (tag, index) {
      for (var j = 0; j < count; j++) {
        for (var i = 0; i < count; i++) {
          expectDomElementsToBeEquivalent(domEl[j].children[index * count + i], document.createElement(tag));
        }
      }
    });
  });
});
