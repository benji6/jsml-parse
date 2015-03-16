var jsmlParse = require('../lib/main.js');

var examplesTitle = {
  tag: "h1",
  text: "JSML Examples"
};

var examplesDesc = {
  tag: "p",
  text: "Everything on this page has been rendered using JSML!"
};

var sudokuTitle = {
  tag: "h2",
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
          count: "10",
          text: (count) => count ? count : ""
        }
      }
    }
  }
};

var jsml = [
  examplesTitle,
  examplesDesc,
  sudokuTitle,
  sudokuJsml
];

jsmlParse(jsml, document.body);
