var jsmlWalker = function jsmlWalker(fn) {
  return function recurse(jsml) {
    return function(parentNode) {
      fnParentSet = fn(parentNode);
      if (jsml.constructor === Array) {
        var i;
        for (i = 0; i < jsml.length; i++) {
          fnParentSet(jsml[i]);
          jsml[i].children && recurse(jsml[i].children)(document.body);
        }
      } else {
        fnParentSet(jsml);
        jsml.children && recurse(jsml.children)(document.body);
      }
    };
  };
};

var jsmlWalkerCallback = function(forEachCallback) {
  return function (parentNode) {
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
  var composed = compose(
    jsmlWalker,
    jsmlWalkerCallback,
    forEachCallback
  );
  //doesn't work:
  //composed(jsml)(parentNode);
  jsmlWalker(jsmlWalkerCallback(forEachCallback))(jsml)(parentNode);
};
