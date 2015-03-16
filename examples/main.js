var jsmlParse = require('../lib/main.js');

var sudokuTitle = {
  tag: "h1",
  text: "Sudoku Grid"
};

var sudokuJsml = {
  tag: "table",
  children: {
    tag: "tr",
    count: "9",
    children: {
      tag: "td",
      count: "9",
      children: {
        tag: "select",
        children: {
          tag: "option",
          count: "9",
          text: (count) => count
        }
      }
    }
  }
};

var jsml = [
  sudokuTitle,
  sudokuJsml
];

jsmlParse([sudokuTitle], document.body);
