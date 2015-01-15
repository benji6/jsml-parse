var iterateFrom = function (fr) {
  return function(count) {
    return function(fn) {
      var from = fr;
      var to = count + fr;
      while (from < to) {
        fn(from++);
      }
    };
  };
};

var compose = function () {
  var fns = arguments;
  return function (x) {
    iterateFrom(0)(fns.length)(function(i) {
      if (fns[i]) {
        x = fns[i].call(this, x);
      }
    });
    return x;
  };
};
