(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/b/js/jsml/js/domManipulation.js":[function(require,module,exports){
module.exports = {
  appendChild: function (child) {
    return function (parent) {
      return parent.appendChild(child);
    };
  },
  setId: function (el, name) {
    el.id = name;
    return el;
  },
  setClassName: function (el, name) {
    el.className = name;
    return el;
  },
  setAttribute: function (el, attr, value) {
    if (el.attr === undefined) {
      console.log("jsmlParse error: " + el + " does not have attribute " + attr);
      return;
    }
    el.attr = value;
  }
};

},{}],"/home/b/js/jsml/js/main.js":[function(require,module,exports){
var iterateFrom = require('./spiceRack.js');
var dom = require('./domManipulation.js');

var jsmlWalker = function jsmlWalker (fn) {
  return function recurse (jsml) {
    return function (parentNode) {
      var domEl;
      var fnParentSet = fn(parentNode);
      var run = function (jsml) {
        if (!jsml.count) {
          jsml.count = 1;
        }
        for (var i = 0; i < jsml.count; i++) {
          domEl = fnParentSet(jsml, i);
          jsml.children && recurse(jsml.children)(domEl);
        }
      };
      if (jsml.constructor === Array) {
        var i;
        for (i = 0; i < jsml.length; i++) {
          run(jsml[i]);
        }
      } else {
        run(jsml);
      }
    };
  };
};

var textSetter = function (text, domEl, count) {
    if (typeof text === 'function') {
      dom.appendChild(document.createTextNode(text(count)))(domEl);
      return;
    }
    dom.appendChild(document.createTextNode(text))(domEl);
};

var jsmlWalkerCallback = function (parentDomElement) {
    return function (jsmlElement, count) {
      if (!count) {
        count = 0;
      }
      var domElement = document.createElement(jsmlElement.tag);
      for (var property in jsmlElement) {
        if (jsmlElement.hasOwnProperty(property)) {
          switch (property) {
            case "tag":
              break;
            case "count":
              break;
            case "children":
              break;

            case "text":
              textSetter(jsmlElement.text, domElement, count);
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

      dom.appendChild(domElement)(parentDomElement);
      return domElement;
  };
};

jsmlParse = function(jsml, parentNode) {
  if (!parentNode) {
    return function (parentNode) {
      jsmlWalker(jsmlWalkerCallback)(jsml)(parentNode);
    };
  }
  jsmlWalker(jsmlWalkerCallback)(jsml)(parentNode);
};

},{"./domManipulation.js":"/home/b/js/jsml/js/domManipulation.js","./spiceRack.js":"/home/b/js/jsml/js/spiceRack.js"}],"/home/b/js/jsml/js/spiceRack.js":[function(require,module,exports){
module.exports = function (fr) {
  return function (count) {
    return function (fn) {
      var from = fr;
      var to = count + fr;
      while (from < to) {
        fn(from++);
      }
    };
  };
};

},{}]},{},["/home/b/js/jsml/js/main.js"]);
