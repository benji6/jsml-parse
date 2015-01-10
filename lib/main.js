var jsmlWalker = function arrayWalker(fn) {
  return function recurse(arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
      fn(arr[i]);
      arr[i].children && recurse(arr[i].children);
    }
  };
};


var jsmlWalkerCallback = function (callback){
  return function(el) {
    var domEl = createElement(el.tag);
    callback && callback(domEl);
    console.log(el.callback);

    el.callback && el.callback(el);

    el.text && appendChild(createTextNode(el.text))(domEl);
    el.className && setClassName(domEl, el.className);
    appendChild(domEl)(document.body);
  };
};




var jsmlParser = function(jsml, callback) {
  jsmlWalker(jsmlWalkerCallback(callback))(jsml);
};
