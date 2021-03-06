(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./spec/lib/spec.js":[function(require,module,exports){
var jsmlParse = require('../../lib/main.js');
var exampleTags = require('./exampleTags.js');
var expectDomElementsToBeEquivalent = require("./expectDomElementsToBeEquivalent");

var expectTextToBe = (domEl, text) => {
  expect(domEl.childNodes[0].nodeName).toBe("#text");
  expect(domEl.childNodes[0].nodeValue).toBe(text);
};

describe("jsmlParse called on JSML object with properties as follows:", () => {
  require("./specs/tag.js");
  require("./specs/text.js");
  require("./specs/count.js");
  require("./specs/children.js");
  require("./specs/callback.js");
  require("./specs/validAttributes.js");
});
describe("jsmlParse called with parent DOM Element as second argument", () => {
  require("./specs/parentDomEl.js");
});

},{"../../lib/main.js":"/home/b/js/jsml/lib/main.js","./exampleTags.js":"/home/b/js/jsml/spec/lib/exampleTags.js","./expectDomElementsToBeEquivalent":"/home/b/js/jsml/spec/lib/expectDomElementsToBeEquivalent.js","./specs/callback.js":"/home/b/js/jsml/spec/lib/specs/callback.js","./specs/children.js":"/home/b/js/jsml/spec/lib/specs/children.js","./specs/count.js":"/home/b/js/jsml/spec/lib/specs/count.js","./specs/parentDomEl.js":"/home/b/js/jsml/spec/lib/specs/parentDomEl.js","./specs/tag.js":"/home/b/js/jsml/spec/lib/specs/tag.js","./specs/text.js":"/home/b/js/jsml/spec/lib/specs/text.js","./specs/validAttributes.js":"/home/b/js/jsml/spec/lib/specs/validAttributes.js"}],"/home/b/js/jsml/lib/appendTextNode.js":[function(require,module,exports){
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

},{"./jsmlWalker.js":"/home/b/js/jsml/lib/jsmlWalker.js"}],"/home/b/js/jsml/spec/lib/exampleTags.js":[function(require,module,exports){
module.exports = [
  "div",
  "span",
  "table",
  "tr",
  "td",
  "p"
];

},{}],"/home/b/js/jsml/spec/lib/expectDomElementsToBeEquivalent.js":[function(require,module,exports){
module.exports = function (a, b) {
  expect(a.tagName).toEqual(b.tagName);
  expect(a.constructor).toBe(b.constructor);
};

},{}],"/home/b/js/jsml/spec/lib/expectTextToBe.js":[function(require,module,exports){
module.exports = (domEl, text) => {
  expect(domEl.childNodes[0].nodeName).toBe("#text");
  expect(domEl.childNodes[0].nodeValue).toBe(text);
};

},{}],"/home/b/js/jsml/spec/lib/specs/callback.js":[function(require,module,exports){
var jsmlParse = require('../../../lib/main.js');
var exampleTags = require('../exampleTags.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");

describe("callback:", () => {
  it("callback: executes a callback on the created DOM element taking the following arguments (domElement, parentNode, count)", () => {
    var counter = 0;
    var jsml = {
      tag: "div",
      children: exampleTags.map((tag) => {
        return {
          tag,
          count: 4,
          callback: function (domElement, parentNode, count) {
            expectDomElementsToBeEquivalent(domElement, document.createElement(exampleTags[Math.floor(counter / 4)]));
            expectDomElementsToBeEquivalent(parentNode, document.createElement("div"));
            expect(count).toBe(counter % 4);
            counter++;
          }
        };
      }),
    };
    jsmlParse(jsml);
  });
});

},{"../../../lib/main.js":"/home/b/js/jsml/lib/main.js","../exampleTags.js":"/home/b/js/jsml/spec/lib/exampleTags.js","../expectDomElementsToBeEquivalent":"/home/b/js/jsml/spec/lib/expectDomElementsToBeEquivalent.js"}],"/home/b/js/jsml/spec/lib/specs/children.js":[function(require,module,exports){
var jsmlParse = require('../../../lib/main.js');
var exampleTags = require('../exampleTags.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");

describe("children:", () => {
  it("when children property is a single JSML object a corresponding DOM element is created and appended to the parent DOM element", () => {
    var jsml = {
      tag: "div",
      children: {
        tag: "span"
      }
    };
    var domEl = jsmlParse(jsml);

    expectDomElementsToBeEquivalent(domEl, document.createElement("div"));
    expectDomElementsToBeEquivalent(domEl.children[0], document.createElement("span"));
  });
  it("large hierarchical structures can be created by creating single JSML objects with single JSML children which in turn have single children and so on...", () => {
    var recursivelySetChildren = function recurse (jsml, tag) {
      if (!jsml.children) {
        jsml.children = {
          tag
        };
        return;
      }
      recurse(jsml.children, tag);
    };

    var jsml = exampleTags.reduce(function (acc, tag) {
      if (typeof acc === "string") {
        return {
          tag: acc,
          children: {
            tag: tag
          }
        };
      }
      recursivelySetChildren(acc, tag);
      return acc;
    });

    var domStructure = jsmlParse(jsml);

    recursivelyGetChild = function recurse (domEl, index) {
      if (!index) {
        return domEl;
      }
      return recurse(domEl.children[0], --index);
    };
    exampleTags.forEach(function (tag, index, arr) {
      expectDomElementsToBeEquivalent(recursivelyGetChild(domStructure, index), document.createElement(tag));
    });
  });
  it("when children property is an array of jsml objects corresponding DOM elements are created and appended to the parent DOM element", () => {
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

  it("when children have count property the correct number of children are appended", () => {
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
    expectDomElementsToBeEquivalent(domEl, document.createElement("div"));
    exampleTags.forEach(function (tag, index) {
      for (var i = 0; i < count; i++) {
        expectDomElementsToBeEquivalent(domEl.children[index * count + i], document.createElement(tag));
      }
    });
  });
  it("expected behaviour when parent and children have count property", () => {
    var count = 5;

    var jsml = {
      tag: "div",
      count,
      children: exampleTags.map((tag) => {
        return {
          count,
          tag
        };
      }),
    };
    var domEl = jsmlParse(jsml);
    exampleTags.forEach(function (tag, index) {
      for (var j = 0; j < count; j++) {
        for (var i = 0; i < count; i++) {
          expectDomElementsToBeEquivalent(domEl[j].children[index * count + i], document.createElement(tag));
        }
      }
    });
  });
  it("when children is a function it is called with current count", () => {
    var jsml = {
      tag: "div",
      count: 64,
      children: (count) => {
        return {
          tag: "p",
          id: count
        };
      }
    };
    var domEls = jsmlParse(jsml);
    domEls.forEach((domEl, index) => {
      expect(Number(domEl.children[0].id)).toBe(index);
    });
  });
});

},{"../../../lib/main.js":"/home/b/js/jsml/lib/main.js","../exampleTags.js":"/home/b/js/jsml/spec/lib/exampleTags.js","../expectDomElementsToBeEquivalent":"/home/b/js/jsml/spec/lib/expectDomElementsToBeEquivalent.js"}],"/home/b/js/jsml/spec/lib/specs/count.js":[function(require,module,exports){
var jsmlParse = require('../../../lib/main.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");
var expectTextToBe = require("../expectTextToBe.js");

describe("count:", () => {
  it("returns an array of DOM elements", () => {
    var jsml = {
      count: 8,
      tag: "p"
    };
    var domEls = jsmlParse(jsml);

    domEls.forEach((domEl) => {
      expectDomElementsToBeEquivalent(domEl, document.createElement("p"));
    });
  });
  it("passes count into attribute callbacks", () => {
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
  it("0 is passed as the count argument if count is not specified", () => {
    var jsml = {
      tag: "p",
      text: (count) => {
        expect(count).toBe(0);
        return count;
      }
    };
    
    var domEl = jsmlParse(jsml);

    expectTextToBe(domEl, String(0));
  });
});

},{"../../../lib/main.js":"/home/b/js/jsml/lib/main.js","../expectDomElementsToBeEquivalent":"/home/b/js/jsml/spec/lib/expectDomElementsToBeEquivalent.js","../expectTextToBe.js":"/home/b/js/jsml/spec/lib/expectTextToBe.js"}],"/home/b/js/jsml/spec/lib/specs/parentDomEl.js":[function(require,module,exports){
var jsmlParse = require('../../../lib/main.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");

it("appends created DOM structure to the specified DOM element when jsml is a single object", () => {
  var id = Math.random();
  var jsml = {
    tag: "div",
    id,
    children: {
      tag: "span"
    }
  };

  jsmlParse(jsml, document.body);

  expectDomElementsToBeEquivalent(document.getElementById(id), document.createElement("div"));
});

it("appends created DOM structure to the specified DOM element when jsml is an array of jsml objects", () => {
  var id0 = Math.random();
  var id1 = Math.random();

  var jsml = [
    {
      tag: "div",
      id: id0
    },
    {
      tag: "div",
      id: id1
    }
  ];

  jsmlParse(jsml, document.body);

  expectDomElementsToBeEquivalent(document.getElementById(id0), document.createElement("div"));
  expectDomElementsToBeEquivalent(document.getElementById(id1), document.createElement("div"));
});

},{"../../../lib/main.js":"/home/b/js/jsml/lib/main.js","../expectDomElementsToBeEquivalent":"/home/b/js/jsml/spec/lib/expectDomElementsToBeEquivalent.js"}],"/home/b/js/jsml/spec/lib/specs/tag.js":[function(require,module,exports){
var jsmlParse = require('../../../lib/main.js');
var exampleTags = require('../exampleTags.js');
var expectDomElementsToBeEquivalent = require("../expectDomElementsToBeEquivalent");

describe("tag:", () => {
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
  it("returns an array of DOM elements with the specified tag names when called with an array of jsml objects", () => {
    var jsmlObjects = exampleTags.map((tag) => {
      return {
        tag
      };
    });

    var domEls = jsmlParse(jsmlObjects);

    exampleTags.forEach((tag, index) => {
      expectDomElementsToBeEquivalent(domEls[index], document.createElement(tag));
    });
  });
});

},{"../../../lib/main.js":"/home/b/js/jsml/lib/main.js","../exampleTags.js":"/home/b/js/jsml/spec/lib/exampleTags.js","../expectDomElementsToBeEquivalent":"/home/b/js/jsml/spec/lib/expectDomElementsToBeEquivalent.js"}],"/home/b/js/jsml/spec/lib/specs/text.js":[function(require,module,exports){
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

},{"../../../lib/main.js":"/home/b/js/jsml/lib/main.js","../expectTextToBe.js":"/home/b/js/jsml/spec/lib/expectTextToBe.js"}],"/home/b/js/jsml/spec/lib/specs/validAttributes.js":[function(require,module,exports){
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

},{"../../../lib/main.js":"/home/b/js/jsml/lib/main.js"}]},{},["./spec/lib/spec.js"]);
