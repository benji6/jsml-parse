var jsmlParse = require('../../lib/main.js');
var exampleTags = require('./tags.js');

describe("jsmlParse", () => {
  var jsmlObjects = null;

  beforeEach(() => {
    jsmlObjects = exampleTags.map((tag) => {
      return {
        tag
      };
    });
  });
  it("is a function (sanity check)", () => {
    expect(jsmlParse).toEqual(jasmine.any(Function));
  });
  it("returns a DOM element with the specified tag name when called with a single jsml object", () => {
    jsmlObjects.forEach((jsmlObject, index) => {
      expect(jsmlParse(jsmlObject).tagName).toEqual(document.createElement(exampleTags[index]).tagName);
    });
  });
  it("appends a textNode where text property is specified in jsml object", () => {
    var text = "Hello World!";
    var jsml = {
      tag: "p",
      text
    };

    var domEl = jsmlParse(jsml);

    expect(domEl.childNodes[0].nodeName).toBe("#text");
    expect(domEl.childNodes[0].nodeValue).toBe(text);
  });
  console.log(jsmlParse({
    tag: "p"
  }));
  require('./createDomElementFromJsmlSpec.js')();
});
