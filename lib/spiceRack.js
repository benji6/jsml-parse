var iterateFrom = function (fr) {
  return function (count) {
    return function (fn) {
      var from = fr;
      var to = count + fr;
      while (from < to) {
        fn(from++);
      }
    };
  };
};
