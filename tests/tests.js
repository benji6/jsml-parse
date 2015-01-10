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

jsmlParse(jsmlMain, document.body/*, jsmlParserCallback*/);
