var jsmlWalker = function jsmlWalker(fn) {
  return function recurse(jsml) {
    return function(parentNode) {
      var domEl;
      var fnParentSet = fn(parentNode);
      var run = function(jsml) {
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
var textSetter = function(text, domEl, count) {
  if (text) {
    if (typeof text === 'function') {
      appendChild(createTextNode(text(count)))(domEl);
      return;
    }
    appendChild(createTextNode(text))(domEl);
  }
};

var jsmlWalkerCallback = function(forEachCallback) {
  return function (parentNode) {
    return function (el, count) {
      if (!count) {
        count = 0;
      }
      var domEl = createElement(el.tag);
      forEachCallback && forEachCallback(domEl, parentNode, count);
      el.callback && el.callback(domEl, parentNode, count);
      textSetter(el.text, domEl, count);
      attrSetter(el, 'id', domEl, setId);
      attrSetter(el, 'class', domEl, setClassName);
      appendChild(domEl)(parentNode);
      return domEl;
    };
  };
};

jsmlParse = function(jsml, parentNode, forEachCallback) {
  //why is the below not working?
  // var composed = compose(
  //   jsmlWalker,
  //   jsmlWalkerCallback,
  //   forEachCallback
  // );
  // composed(jsml)(parentNode);
  jsmlWalker(jsmlWalkerCallback(forEachCallback))(jsml)(parentNode);
};
