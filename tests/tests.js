var jsml = [
{
  "tag": "h2",
  "text": "Sudoku Solver",
  "callback": function(el) {
    console.log(el);
  },
  "children": [
    {
      "tag": "h2",
      "text": "Sudoku Solver",
      "className": "testClass"
    },
    {
      "tag": "h6",
      "text": "child2"
    }
  ]
  },
  {
    "tag": "button",
    "text": "New Puzzle"
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
  }
];


/*
var jsmlParserCallback = function(el){
console.log(el);
};
*/
jsmlParser(jsml/*, jsmlParserCallback*/);
