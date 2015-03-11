(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./spec/spec.js":[function(require,module,exports){
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

},{"../lib/main.js":"/home/b/js/jsml/lib/main.js"}],"/home/b/js/jsml/lib/appendChild.js":[function(require,module,exports){
module.exports = function (parent) {
  return function (child) {
    return parent.appendChild(child);
  };
};

},{}],"/home/b/js/jsml/lib/appendTextNode.js":[function(require,module,exports){
module.exports = function (text, domEl, count) {
  if (typeof text === 'function') {
    appendChild(domEl)(document.createTextNode(text(count)));
    return;
  }
  appendChild(domEl)(document.createTextNode(text));
};

},{}],"/home/b/js/jsml/lib/main.js":[function(require,module,exports){
var appendChild = require('./appendChild.js');
var appendTextNode = require('./appendTextNode.js');

var jsmlWalker = function jsmlWalker (fn) {
  return function recurse (jsml, parentDomElement) {
    var domEl;

    var run = function (jsml) {
      if (!jsml.count) {
        jsml.count = 1;
      }
      for (var i = 0; i < jsml.count; i++) {
        domEl = fn(jsml, i, parentDomElement);
        if (parentDomElement) {
          appendChild(parentDomElement)(domEl);
        }
        if (jsml.children) {
          recurse(jsml.children)(domEl);
        }
      }
    };

    if (Array.isArray(jsml.constructor)) {
      for (var i = 0; i < jsml.length; i++) {
        run(jsml[i]);
      }
      return;
    }
    run(jsml);
  };
};

var createDomElementFromJsml = function (jsmlElement, count, parentDomElement) {
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

module.exports = jsmlWalker(createDomElementFromJsml);

},{"./appendChild.js":"/home/b/js/jsml/lib/appendChild.js","./appendTextNode.js":"/home/b/js/jsml/lib/appendTextNode.js"}]},{},["./spec/spec.js"]);
