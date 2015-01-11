var jsmlWalker = function arrayWalker(fn) {
  return function recurse(jsml) {
    if (jsml.constructor === Array) {
      var i;
      for (i = 0; i < jsml.length; i++) {
        fn(jsml[i]);
        jsml[i].children && recurse(jsml[i].children);
      }
    } else {
      fn(jsml);
      jsml.children && recurse(jsml.children);
    }
  };
};

var jsmlWalkerCallback = function(parentNode) {
  return function (forEachCallback) {
    return function recurse(el, recurseCount) {
      if (!recurseCount) {
        recurseCount = 0;
      }
      var domEl = createElement(el.tag);
      forEachCallback && calforEachCallbacklback(domEl, parentNode, recurseCount);
      el.callback && el.callback(domEl, parentNode, recurseCount);
      el.text && appendChild(createTextNode(el.text))(domEl);
      el.className && setClassName(domEl, el.className);
      appendChild(domEl)(parentNode);
      if (el.count) {
        if (++recurseCount < parseInt(el.count)) {
          recurse(el, recurseCount);
        }
      }
    };
  };
};

jsmlParse = function(jsml, parentNode, forEachCallback) {
    jsmlWalker(jsmlWalkerCallback(parentNode)(forEachCallback))(jsml);
};
