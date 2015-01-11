var jsmlWalker = function jsmlWalker(fn) {
  return function recurse(jsml) {
    return function(parentNode) {
      var domEl;
      fnParentSet = fn(parentNode);
      if (jsml.constructor === Array) {
        var i;
        for (i = 0; i < jsml.length; i++) {
          domEl = fnParentSet(jsml[i]);
          jsml[i].children && recurse(jsml[i].children)(domEl);
        }
      } else {
        domEl = fnParentSet(jsml);
        jsml.children && recurse(jsml.children)(domEl);
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
          //jsmlParse(el, parentNode, forEachCallback);
        }
      }
      return domEl;
    };
  };
};

jsmlParse = function(jsml, parentNode, forEachCallback) {
  /*
  //why is the below not working?
  var composed = compose(
    jsmlWalker,
    jsmlWalkerCallback,
    forEachCallback
  );
  composed(jsml)(parentNode);
  */
  jsmlWalker(jsmlWalkerCallback(forEachCallback))(jsml)(parentNode);
};
