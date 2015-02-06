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

var attrSetter = function(el, prop, domEl, fn, count) {
  if(el[prop]) {
    if (typeof el[prop] === 'function') {
      fn(domEl, el[prop](count));
      return;
    }
    fn(domEl, el[prop]);
  }
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
            case "text":
              textSetter(jsmlElement.text, domElement, count);
              break;
          }
        }
      }
      attrSetter(jsmlElement, 'id', domElement, dom.setId);
      attrSetter(jsmlElement, 'class', domElement, dom.setClassName);


      jsmlElement.callback && jsmlElement.callback(domElement, parentDomElement, count);
      dom.appendChild(domElement)(parentDomElement);
      return domElement;
  };
};

jsmlParse = function(jsml, parentNode) {
  jsmlWalker(jsmlWalkerCallback)(jsml)(parentNode);
};
