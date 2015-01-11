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
  "tag": "p",
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

jsmlParse(jsmlSingle, document.body/*, jsmlParserCallback*/);
jsmlParse(jsmlSingle2, document.body/*, jsmlParserCallback*/);

jsmlParse(jsmlMain, document.body/*, jsmlParserCallback*/);
