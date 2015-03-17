var jsmlParse = require('../../../lib/main.js');
var expectTextToBe = require("../expectTextToBe.js");

describe("text:", () => {
  it("appends a textNode where text property is specified in jsml object", () => {
    var text = "Hello World!";
    var jsml = {
      tag: "p",
      text
    };
    var domEl = jsmlParse(jsml);

    expectTextToBe(domEl, text);
  });
});
