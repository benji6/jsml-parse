(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./spec/lib/spec.js":[function(require,module,exports){
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

},{"../../lib/main.js":"/home/b/js/jsml/lib/main.js","./createDomElementFromJsmlSpec.js":"/home/b/js/jsml/spec/lib/createDomElementFromJsmlSpec.js","./tags.js":"/home/b/js/jsml/spec/lib/tags.js"}],"/home/b/js/jsml/lib/appendChild.js":[function(require,module,exports){
module.exports = function (parent) {
  return function (child) {
    return parent.appendChild(child);
  };
};

},{}],"/home/b/js/jsml/lib/appendTextNode.js":[function(require,module,exports){
var appendChild = require('./appendChild.js');

module.exports = function (text, domEl, count) {
  if (typeof text === 'function') {
    appendChild(domEl)(document.createTextNode(text(count)));
    return;
  }
  appendChild(domEl)(document.createTextNode(text));
};

},{"./appendChild.js":"/home/b/js/jsml/lib/appendChild.js"}],"/home/b/js/jsml/lib/createDomElementFromJsml.js":[function(require,module,exports){
var appendTextNode = require('./appendTextNode.js');

module.exports = function (jsmlElement, count, parentDomElement) {
  if (!count) {
    count = 0;
  }

  var domElement = document.createElement(jsmlElement.tag);

  for (var property in jsmlElement) {
    if (jsmlElement.hasOwnProperty(property)) {
      switch (property) {
        case "tag":
        case "count":
        case "children":
          break;

        case "variable":
          this[jsmlElement.variable] = domElement;
          break;
        case "text":
          appendTextNode(jsmlElement.text, domElement, count);
          break;
        case "callback":
          jsmlElement.callback(domElement, parentDomElement, count);
          break;
        default:
          if (domElement[property] !== undefined) {
            if (typeof jsmlElement[property] === "function") {
              domElement[property] = jsmlElement[property](count);
            } else {
              domElement[property] = jsmlElement[property];
            }
          }
      }
    }
  }

  return domElement;
};

},{"./appendTextNode.js":"/home/b/js/jsml/lib/appendTextNode.js"}],"/home/b/js/jsml/lib/jsmlWalker.js":[function(require,module,exports){
var appendChild = require('./appendChild.js');
var createDomElementFromJsml = require('./createDomElementFromJsml.js');

module.exports = function recurse (jsml, parentDomElement) {
  var jsmlCallback = function (jsml) {
    var count = jsml.count || 1;

    while (count--) {
      var domEl = createDomElementFromJsml(jsml, count, parentDomElement);
      if (jsml.children) {
        recurse(jsml.children)(domEl);
      }
      if (parentDomElement) {
        return appendChild(parentDomElement)(domEl);
      }
      return domEl;
    }
  };

  if (Array.isArray(jsml.children)) {
    return jsml.children.forEach(jsmlCallback);
  }
  return jsmlCallback(jsml);
};

},{"./appendChild.js":"/home/b/js/jsml/lib/appendChild.js","./createDomElementFromJsml.js":"/home/b/js/jsml/lib/createDomElementFromJsml.js"}],"/home/b/js/jsml/lib/main.js":[function(require,module,exports){
module.exports = require('./jsmlWalker.js');

},{"./jsmlWalker.js":"/home/b/js/jsml/lib/jsmlWalker.js"}],"/home/b/js/jsml/spec/lib/createDomElementFromJsmlSpec.js":[function(require,module,exports){
var createDomElementFromJsml = require('../../lib/createDomElementFromJsml.js');

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

},{"../../lib/createDomElementFromJsml.js":"/home/b/js/jsml/lib/createDomElementFromJsml.js"}],"/home/b/js/jsml/spec/lib/tags.js":[function(require,module,exports){
module.exports = ["p", "div", "table"];

},{}]},{},["./spec/lib/spec.js"]);
