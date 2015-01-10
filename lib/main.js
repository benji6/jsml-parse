var jsmlWalker = function arrayWalker(fn) {
  return function recurse(arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
      fn(arr[i]);
      arr[i].children && recurse(arr[i].children);
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

jsmlParser = function(jsml, parentNode, callback) {
  jsmlWalker(jsmlWalkerCallback(parentNode)(callback))(jsml);
};
