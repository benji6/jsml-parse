var jsmlWalker = function arrayWalker(fn) {
  return function recurse(arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
      fn(arr[i]);
      arr[i].children && recurse(arr[i].children);
    }
  };
};


var jsmlWalkerCallback = function(parentNode, callback) {
  return function(el) {
    var domEl = createElement(el.tag);
    callback && callback(domEl);
    el.callback && el.callback(domEl);
    el.text && appendChild(createTextNode(el.text))(domEl);
    el.className && setClassName(domEl, el.className);
    appendChild(domEl)(parentNode);
  };
};

module.exports = function(jsml, parentNode, callback) {
  jsmlWalker(jsmlWalkerCallback(parentNode, callback))(jsml);
};
