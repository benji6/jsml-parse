var createDomElementFromJsml = require('../lib/createDomElementFromJsml.js');

module.exports = () => {
  describe("createDomElementFromJsml: private module", () => {
    var jsml = null;

    beforeEach(() => {
      jsml = {
        tag: "p",
      };
    });
    it("is a function", () => {
      expect(createDomElementFromJsml).toEqual(jasmine.any(Function));
    });
    it("returns a DOM element when called with a jsml object", () => {
      expect(createDomElementFromJsml(jsml).tagName).toEqual(document.createElement('p').tagName);
    });
  });
};
