var jsmlParse = (function () {
  var iterateFrom = function (fr) {
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

  var appendChild = function (child) {
    return function (parent) {
      return parent.appendChild(child);
    };
  };

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
      appendChild(document.createTextNode(text(count)))(domEl);
      return;
    }
    appendChild(document.createTextNode(text))(domEl);
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

              case "colspan" :
                domElement.setAttribute("colspan", jsmlElement.colspan);
                break;
              case "variable" :
                this[jsmlElement.variable] = domElement;
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

        appendChild(domElement)(parentDomElement);
        return domElement;
    };
  };

  return function(jsml, parentNode) {
    if (!parentNode) {
      return function (parentNode) {
        jsmlWalker(jsmlWalkerCallback)(jsml)(parentNode);
      };
    }
    jsmlWalker(jsmlWalkerCallback)(jsml)(parentNode);
  };
}());

if (typeof module === 'object') {
  module.exports = jsmlParse;
}
