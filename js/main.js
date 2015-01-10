var jsonml = [
  {
    "el": "p",
    "text": "hello, how r you doing?",
    "children": [
      {
        "el": "h6",
        "text": "child1"
      },
      {
        "el": "h6",
        "text": "child2"
      }
    ]
  },
  {
    "el": "h1",
    "text": "hefsgfing?"
  },
  {
    "el": "h2",
    "text": "hello, how are you doing?"
  }
];

var arrayWalker = function arrayWalker(fn) {
  return function recurse(arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
      fn(arr[i]);
      arr[i].children && recurse(arr[i].children);
    }
  };
};


var forEachCallback = function forEachCallback(el){
  createAndAppendTextNode(el.text, compose(
    createElement,
    appendChild,
    wrap(document.body)
  )(el.el));
};

arrayWalker(forEachCallback)(jsonml);



//jsonml.forEach(forEachCallback);
