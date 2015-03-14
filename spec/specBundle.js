(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./spec/lib/spec.js":[function(require,module,exports){
var jsmlParse = require('../../lib/main.js');
var exampleTags = require('./tags.js');

var expectDomElementsToBeEquivalent = (a, b) => {
  expect(a.tagName).toEqual(b.tagName);
  expect(a.constructor).toBe(b.constructor);
};

var expectTextToBe = (domEl, text) => {
  expect(domEl.childNodes[0].nodeName).toBe("#text");
  expect(domEl.childNodes[0].nodeValue).toBe(text);
};

describe("jsmlParse", () => {
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
  it("text: appends a textNode where text property is specified in jsml object", () => {
    var text = "Hello World!";
    var jsml = {
      tag: "p",
      text
    };
    var domEl = jsmlParse(jsml);

    expectTextToBe(domEl, text);
  });
  it("count: returns an array of DOM elements if count is specified", () => {
    var jsml = {
      count: 8,
      tag: "p"
    };
    var domEls = jsmlParse(jsml);

    domEls.forEach((domEl) => {
      expectDomElementsToBeEquivalent(domEl, document.createElement("p"));
    });
  });
  it("count: passes count into attribute callbacks", () => {
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
  it("children: when children property is a single jsml object a corresponding DOM element is created and appended to the parent DOM element", () => {
    var jsml = {
      tag: "div",
      children: {
        tag: "p"
      }
    };
    var domEl = jsmlParse(jsml);

    expectDomElementsToBeEquivalent(domEl, document.createElement("div"));
    expectDomElementsToBeEquivalent(domEl.children[0], document.createElement("p"));
  });
  it("children: when children property is an array of jsml objects corresponding DOM elements are created and appended to the parent DOM element", () => {
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

  it("children with count: check expected behaviour for children with count property", () => {
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
    console.log(domEl);
    expectDomElementsToBeEquivalent(domEl, document.createElement("div"));
    exampleTags.forEach(function (tag, index) {
      for (var i = 0; i < count; i++) {
        expectDomElementsToBeEquivalent(domEl.children[index * count + i], document.createElement(tag));
      }
    });
  });
  it("callback: executes a callback on the created DOM element taking the following arguments (domElement, parentNode, count)", () => {
    var jsml = {
      tag: "div",
      children: exampleTags.map((tag) => {
        return {
          callback: function (domElement, parentNOde, count) {

          },
          count: 2,
          tag
        };
      }),
    };
  });
});

},{"../../lib/main.js":"/home/b/js/jsml/lib/main.js","./tags.js":"/home/b/js/jsml/spec/lib/tags.js"}],"/home/b/js/jsml/lib/appendChildren.js":[function(require,module,exports){
module.exports = function (parent) {
  return function (children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        parent.appendChild(child);
      }
      return;
    }
    return parent.appendChild(children);
  };
};

},{}],"/home/b/js/jsml/lib/appendTextNode.js":[function(require,module,exports){
var appendChildren = require('./appendChildren.js');

module.exports = function (text, domEl, count) {
  if (typeof text === 'function') {
    appendChildren(domEl)(document.createTextNode(text(count)));
    return;
  }
  appendChildren(domEl)(document.createTextNode(text));
};

},{"./appendChildren.js":"/home/b/js/jsml/lib/appendChildren.js"}],"/home/b/js/jsml/lib/createDomElementFromJsml.js":[function(require,module,exports){
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
var appendChildren = require('./appendChildren.js');
var createDomElementFromJsml = require('./createDomElementFromJsml.js');

module.exports = function recurse (jsml, parentDomElement) {
  var jsmlCallback = function (jsml) {
    var ret;
    var i;
    var count = jsml.count;

    if (!count || count <= 1) {
      ret = createDomElementFromJsml(jsml, count, parentDomElement);

      if (jsml.children) {
        if (Array.isArray(jsml.children)) {
          for (i = 0; i < jsml.children.length; i++) {
            recurse(jsml.children[i], ret);
          }
        } else {
          recurse(jsml.children, ret);
        }
      }

      if (parentDomElement) {
        return appendChildren(parentDomElement)(ret);
      }
    } else {
      ret = [];
      for (i = 0; i < count; i++) {
        var domEl = createDomElementFromJsml(jsml, i, parentDomElement);

        if (jsml.children) {
          if (Array.isArray(jsml.children)) {
            for (i = 0; i < jsml.children.length; i++) {
              recurse(jsml.children[i], domEl);
            }
          } else {
            recurse(jsml.children, domEl);
          }
        }

        if (parentDomElement) {
          return appendChildren(parentDomElement)(domEl);
        }

        ret.push(domEl);
      }
    }

    return ret;
  };


  return jsmlCallback(jsml);
};

},{"./appendChildren.js":"/home/b/js/jsml/lib/appendChildren.js","./createDomElementFromJsml.js":"/home/b/js/jsml/lib/createDomElementFromJsml.js"}],"/home/b/js/jsml/lib/main.js":[function(require,module,exports){
module.exports = require('./jsmlWalker.js');

},{"./jsmlWalker.js":"/home/b/js/jsml/lib/jsmlWalker.js"}],"/home/b/js/jsml/spec/lib/tags.js":[function(require,module,exports){
module.exports = ["p", "div", "table"];

},{}]},{},["./spec/lib/spec.js"]);
