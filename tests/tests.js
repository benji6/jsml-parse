var jsmlTr = [
  {
    "tag": "tr",
    "count": "1024",
    "callback": function(el, parentNode, count) {
      el.id = count.toString();
      jsmlParse(jsmlTd, el);
    }
  }
];
var jsmlTd = [
  {
    "tag": "td",
    "count": "16",
    "text": "hello",
    "callback": function(el, parentNode, count) {
      this.text = (parseInt(parentNode.id) * this.count + count).toString();
    }
  }
];

var jsmlMain = [
  {
  "tag": "h2",
  "text": "Test"
  },
  {
    "tag": "button",
    "text": "Does Nothing!"
  },
  {
    "tag": "button",
    "text": "Solve"
  },
  {
    "tag": "div",
  },
  {
    "tag": "div",
  },
  {
    "tag": "table",
    "callback": function(el) {
      jsmlParse(jsmlTr, el);
    }
  }
];

var jsmlSingle = {
  "tag": "div",
  "text": "this jsml object is not in an array. It also has children",
  "children": [
    {
      "tag": "p",
      "text": "child 1"
    },
    {
      "tag": "p",
      "text": "child 2"
    }
  ]
};
var jsmlSingle2 = {
  "tag": "p",
  "id": "testId",
  "text": "this jsml object is not in an array. It also has one child which is not an array",
  "children": {
      "tag": "p",
      "text": "I'm a child not in an array"
    }
};

jsmlParse({
  "tag": "div",
  "text": "children and count Parents",
  "count": 3,
  "children": [
    {
      "tag": "div",
      "text": "child",
      "count": 3
    }
  ]
}, document.body);

var getId = (function() {
  var id = 0;
  return function() {
    return id++;
  };
}());

jsmlParse({
  tag: "table",
  children: {
    tag: "tr",
    count: "3",
    children: {
      tag: "td",
      count: "3",
      children: {
        tag: "table",
        children: {
          tag: "tr",
          count: "3",
          children: {
            tag: "td",
            count: "3",
            children: {
              tag: "select",
              callback: function(el, parentNode, count) {
                el.id = getId();
              },
              children: {
                tag: "option",
                count: "10",
                callback: function(el, parentNode, count) {
                  if (!count) {
                    this.text = '';
                    return;
                  }
                  this.text = count;
                }
              }
            }
          }
        }
      }
    }
  }
}, document.body);

jsmlParse(jsmlSingle, document.body/*, jsmlParserCallback*/);
jsmlParse(jsmlSingle2, document.body/*, jsmlParserCallback*/);

jsmlParse(jsmlMain, document.body/*, jsmlParserCallback*/);
