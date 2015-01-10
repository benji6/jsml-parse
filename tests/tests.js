var jsml1 = [
  {
    "tag": "tr"
  },
  {
    "tag": "tr"
  },
  {
    "tag": "tr"
  }
];

var jsml0 = [
  {
  "tag": "h2",
  "text": "Sudoku Solver"
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
  },
  {
    "tag": "table",
    "callback": function(el) {
      jsmlParser(jsml1, el);
    }
  }
];

//add a number property for creating multiple elements and execute each
//callback for each with a a number indicating the iteration count


/*
var jsmlParserCallback = function(el){
console.log(el);
};
*/
jsmlParser(jsml0, document.body/*, jsmlParserCallback*/);
