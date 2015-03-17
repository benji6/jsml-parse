# JSML
###### JavaScript Markup Langauge
## Description
Renders DOM structures client-side using JSON or objects. Structures are rendered rapidly and JSML notation allows for complicated and large structures to be described concisely.

## Installation
### Either
```javascript
npm install jsml-parse
```
```javascript
var jsmlParse = require('jsml-parse');
```
### Or
Include jsml-parse.js (in root of repo) in a script tag to attach ```jsmlParse``` to the window.

## Examples
**Open index.html or check out http://benji6.github.io/jsml-parse to see some examples!**


### Hello World
```javascript
//JSML object
var helloWorld = {
  tag: "p",
  text: "Hello World!"
};

//Render directly to document.body
jsmlParse(helloWorld, document.body);

//alternatively assign element to variable:
var domEl = jsmlParse(helloWorld);
```
### Sudoku Grid
```javascript
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

var sudokuGrid = jsmlParse(sudokuJsml);

```
### Dynamically Rendered Table
```javascript
var tableData //array of objects

var tableJsml = {
  tag: "table",
  children: [
    {
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
      };
    }
  ]
};
```



## How It Works
### jsmlParse Arguments
```jsmlParse``` either takes a single valid JSML object or an array of valid JSML objects as its first argument and returns a corresponding DOM structure. The second argument is optional and if provided ```jsmlParse``` will append the created DOM structure to it.

```javascript
var jsml //JSML object or array of JSML objects
var parentNode //optional parent node to attach new DOM structure to

//return newly created element
jsmlParse(jsml);

//or attach to parentNode
jsmlParse(jsml, parentNode);
```

### JSML Structure and Properties
The DOM element being created is specified by the ```tag``` property and is the same characters used in HTML or ```document.createElement()```.

JSML properties consist of all valid attributes for the DOM element being created. The values of these properties can either be primitives which are set as the values of those DOM element properties or as functions which are executed with the count variable passed in as the only argument and which set the property with their return value.

### Special JSML Properties
- `"tag"` - corresponds to html tag.
- `"text"` - text to be appended to the element.
- `"children"` - either a single jsml object or an array of jsml objects to be appended to the current DOM element.
- `"count"` - number of elements to be created.
- `"callback"` - function to call on created DOM element(s). Takes three arguments as follows:

```javascript
var callback = function(element, parentNode, index) {
  element //DOM element
  parentNode //parent DOM element
  index //if count is specified in the jsml the index corresponds to the index of the element created so far, otherwise it will be 0
}
```
### Behind The Scenes
```jsmlParse``` has been written largely in an imperative style for speed and compatibility with ECMAScript 3.
