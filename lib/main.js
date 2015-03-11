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
