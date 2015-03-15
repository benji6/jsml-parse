var jsmlParse = require('../../../lib/main.js');

describe("valid element attributes:", () => {
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
