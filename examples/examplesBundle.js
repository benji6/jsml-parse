(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./examples/main.js":[function(require,module,exports){
var jsmlParse = require('../lib/main.js');

var examplesTitle = {
  tag: "h1",
  text: "JSML Examples"
};

var examplesDesc = {
  tag: "p",
  text: "Everything on this page has been rendered using JSML!"
};

var sudokuTitle = {
  tag: "h2",
  text: "Sudoku Grid"
};

var sudokuJsml = {
  tag: "table",
  children: {
    tag: "tr",
    count: "9",
    children: {
      tag: "td",
      count: "9",
      children: {
        tag: "select",
        children: {
          tag: "option",
          count: "10",
          text: (count) => count ? count : ""
        }
      }
    }
  }
};

var jsml = [
  examplesTitle,
  examplesDesc,
  sudokuTitle,
  sudokuJsml
];

jsmlParse(jsml, document.body);

},{"../lib/main.js":"/home/b/js/jsml/lib/main.js"}],"/home/b/js/jsml/lib/appendTextNode.js":[function(require,module,exports){
module.exports = function (text, domEl, count) {
  if (typeof text === 'function') {
    domEl.appendChild(document.createTextNode(text(count)));
    return;
  }
  domEl.appendChild(document.createTextNode(text));
};

},{}],"/home/b/js/jsml/lib/createDomElementFromJsml.js":[function(require,module,exports){
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
var createDomElementFromJsml = require('./createDomElementFromJsml.js');

module.exports = function recurse (jsml, parentDomElement) {
  var ret;
  var i;
  var j;
  var k;
  var domEl;
  var count;

  if (Object.prototype.toString.call(jsml) === '[object Array]') {
    ret = [];
    for (i = 0; i < jsml.length; i++) {
      count = jsml[i].count;
      if (!count || count <= 1) {
        domEl = createDomElementFromJsml(jsml[i], count, parentDomElement);

        if (jsml[i].children) {
          recurse(jsml[i].children, domEl);
        }

        if (parentDomElement) {
          parentDomElement.appendChild(domEl);
        }

        ret.push(domEl);
      } else {
        for (j = 0; j < count; j++) {
          domEl = createDomElementFromJsml(jsml[i], j, parentDomElement);

          if (jsml[i].children) {
            recurse(jsml[i].children, domEl);
          }

          if (parentDomElement) {
            parentDomElement.appendChild(domEl);
          }

          ret.push(domEl);
        }
      }
    }
  } else {
    count = jsml.count;
    if (!count || count <= 1) {
      ret = domEl = createDomElementFromJsml(jsml, count, parentDomElement);

      if (parentDomElement) {
        parentDomElement.appendChild(ret);
      }

      if (jsml.children) {
        recurse(jsml.children, domEl);
      }
    } else {
      ret = [];
      for (i = 0; i < count; i++) {
        domEl = createDomElementFromJsml(jsml, i, parentDomElement);

        if (parentDomElement) {
          parentDomElement.appendChild(domEl);
        }

        ret.push(domEl);

        if (jsml.children) {
          recurse(jsml.children, domEl);
        }
      }
    }
  }

  return ret;
};

},{"./createDomElementFromJsml.js":"/home/b/js/jsml/lib/createDomElementFromJsml.js"}],"/home/b/js/jsml/lib/main.js":[function(require,module,exports){
module.exports = require('./jsmlWalker.js');

},{"./jsmlWalker.js":"/home/b/js/jsml/lib/jsmlWalker.js"}]},{},["./examples/main.js"]);
