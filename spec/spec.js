var jsmlParse = require('../lib/main.js');

describe("jsmlParse", () => {
  var jsml = null;

  beforeEach(() => {
    jsml = {
      tag: "p",
    };
  });
  it("is a function", () => {
    expect(jsmlParse).toEqual(jasmine.any(Function));
  });
  it("returns a DOM element when called with a jsml object", () => {
    expect(jsmlParse(jsml).tagName).toEqual(document.createElement('p').tagName);
  });
});
