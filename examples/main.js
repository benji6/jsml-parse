var jsmlParse = require('../lib/main.js');

var examplesTitle = {
  tag: "h1",
  text: "JSML Examples"
};

var examplesDesc = {
  tag: "p",
  text: "Check out the source, virtually no HTML! Almost everything on this page has been rendered using JSML."
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

var tableTitle = {
  tag: "h1",
  text: "Dynamically Created Table"
};

var tableDesc = {
  tag: "p",
  text: "Render JSON to a table:"
};

var tableData = [];

for (var i = 0; i < 16; i++) {
  tableData.push({
    id: i,
    randomString0: Math.random().toString(36).substring(8),
    randomString1: Math.random().toString(36).substring(7),
    randomString2: Math.random().toString(36).substring(7),
    randomNumber: Math.random().toString(36).substring(7)
  });
}

var tableJsml = {
  tag: "table",
  children: [{
    tag: "thead",
    children: {
      tag: "th",
      count: Object.keys(tableData[0]).length,
      text: (count) => Object.keys(tableData[0])[count]
    }
  },
  {
    tag: "tr",
    count: tableData.length,
    children: (count) => {
      return {
        tag: "td",
        count: 5,
        text: (index) => tableData[count][Object.keys(tableData[count])[index]]
      };
    }
  }]
};

var jsml = [
  examplesTitle,
  examplesDesc,
  sudokuTitle,
  sudokuJsml,
  tableTitle,
  tableDesc,
  tableJsml
];

jsmlParse(jsml, document.body);
