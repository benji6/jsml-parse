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
  if (text) {
    if (typeof text === 'function') {
      appendChild(createTextNode(text(count)))(domEl);
      return;
    }
    appendChild(createTextNode(text))(domEl);
  }
};

var jsmlWalkerCallback = function (parentDomElement) {
    return function (jsmlElement, count) {
      if (!count) {
        count = 0;
      }
      var domElement = createElement(jsmlElement.tag);
      jsmlElement.callback && jsmlElement.callback(domElement, parentDomElement, count);
      textSetter(jsmlElement.text, domElement, count);
      attrSetter(jsmlElement, 'id', domElement, setId);
      attrSetter(jsmlElement, 'class', domElement, setClassName);
      appendChild(domElement)(parentDomElement);
      return domElement;
  };
};

jsmlParse = function(jsml, parentNode) {
  jsmlWalker(jsmlWalkerCallback)(jsml)(parentNode);
};
