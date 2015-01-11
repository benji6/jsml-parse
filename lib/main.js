var jsmlWalker = function jsmlWalker(fn) {
  return function recurse(jsml) {
    return function(parentNode) {
      var domEl;
      var fnParentSet = fn(parentNode);
      var run = function(jsml) {
        domEl = fnParentSet(jsml);
        jsml.children && recurse(jsml.children)(domEl);
        if (jsml.count) {
          for (var i = 0; i < jsml.count; i++) {
            domEl = fnParentSet(jsml, i);
            jsml.children && recurse(jsml.children)(domEl);
          }
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

var jsmlWalkerCallback = function(forEachCallback) {
  return function (parentNode) {
    return function (el, count) {
      if (!count) {
        count = 0;
      }
      var domEl = createElement(el.tag);
      forEachCallback && calforEachCallbacklback(domEl, parentNode, count);
      el.callback && el.callback(domEl, parentNode, count);
      el.text && appendChild(createTextNode(el.text))(domEl);
      el.className && setClassName(domEl, el.className);
      appendChild(domEl)(parentNode);
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
