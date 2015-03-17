(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./examples/main.js":[function(require,module,exports){
var jsmlParse = require('../lib/main.js');

var examplesTitle = {
  tag: "h1",
  text: "JSML Examples"
};

var examplesDesc = {
  tag: "p",
  text: "Check out the source, virtually no HTML! Almost everything on this page has been rendered using JSML."
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

var tableTitle = {
  tag: "h1",
  text: "Dynamically Created Table"
};

var tableDesc = {
  tag: "p",
  text: "Render JSON to a table:"
};

var tableData = [];

for (var i = 0; i < 16; i++) {
  tableData.push({
    id: i,
    randomString0: Math.random().toString(36).substring(8),
    randomString1: Math.random().toString(36).substring(7),
    randomString2: Math.random().toString(36).substring(7),
    randomNumber: Math.random().toString(36).substring(7)
  });
}

var tableJsml = {
  tag: "table",
  children: [{
    tag: "thead",
    children: {
      tag: "th",
      count: Object.keys(tableData[0]).length,
      text: (count) => Object.keys(tableData[0])[count]
    }
  },
  {
    tag: "tr",
    count: tableData.length,
    children: (count) => {
      return {
        tag: "td",
        count: 5,
        text: (index) => tableData[count][Object.keys(tableData[count])[index]]
      };
    }
  }]
};

var jsml = [
  examplesTitle,
  examplesDesc,
  sudokuTitle,
  sudokuJsml,
  tableTitle,
  tableDesc,
  tableJsml
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
          if (typeof jsml[i].children === "function") {
            recurse(jsml[i].children(count), domEl);
          } else {
            recurse(jsml[i].children, domEl);
          }
        }

        if (parentDomElement) {
          parentDomElement.appendChild(domEl);
        }

        ret.push(domEl);
      } else {
        for (j = 0; j < count; j++) {
          domEl = createDomElementFromJsml(jsml[i], j, parentDomElement);

          if (jsml[i].children) {
            if (typeof jsml[i].children === "function") {
              recurse(jsml[i].children(j), domEl);
            } else {
              recurse(jsml[i].children, domEl);
            }
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
        if (typeof jsml.children === "function") {
          recurse(jsml.children(count), domEl);
        } else {
          recurse(jsml.children, domEl);
        }
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
          if (typeof jsml.children === "function") {
            recurse(jsml.children(i), domEl);
          } else {
            recurse(jsml.children, domEl);
          }
        }
      }
    }
  }

  return ret;
};

},{"./createDomElementFromJsml.js":"/home/b/js/jsml/lib/createDomElementFromJsml.js"}],"/home/b/js/jsml/lib/main.js":[function(require,module,exports){
module.exports = require('./jsmlWalker.js');

},{"./jsmlWalker.js":"/home/b/js/jsml/lib/jsmlWalker.js"}]},{},["./examples/main.js"]);
