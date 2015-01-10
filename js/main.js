var jsmlWalker = function arrayWalker(fn) {
  return function recurse(arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
      fn(arr[i]);
      arr[i].children && recurse(arr[i].children);
    }
  };
};


var jsmlWalkerCallback = function (el){
  var domEl = createElement(el.el);
  el.text && appendChild(createTextNode(el.text))(domEl);
  el.className && setClassName(domEl, el.className);
  appendChild(domEl)(document.body);
};

jsmlWalker(jsmlWalkerCallback)(jsonml);
