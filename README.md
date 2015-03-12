# JSML
###### JavaScript Markup Langauge
## Description
Create DOM structures quickly & consisely using objects or JSON.

## JSML Structure
### Example
```javascript
var jsml = {
  "tag": "p",
  "text": (count) => "hello, my count is: " + count,
  "id": "id",
  "className": "red",
  "count": "8",
  "callback": function(domElement, parentNode, index) {
    //can do anything here...
  }
};
```
### Overview
Jsml properties consist of all valid attributes for the DOM element being created. The values of these properties can either be primitives which are set as the values of those DOM element properties or as functions which are executed with the count variable passed in as the only argument and which set the property with their return value.

### Special JSML Properties
- `"tag"` - corresponds to html tag.
- `"text"` - text to be appended to the element, can be a function, in which case id is set to the return value and count is passed as the first variable.
- `"children"` - either a single jsml object or an array of jsml objects to be appended to the current DOM element.
- `"variable"` - (IN DEVELOPMENT DO NOT USE) variable name to be used within the jsml object so other elements of the jsml object can refer to it.
- `"count"` - number of elements to be created.
- `"callback"` - function to call on created DOM element(s). Takes three arguments as follows:

### Callback Property
```javascript
var callback = function(element, parentNode, index) {
  element //DOM element
  parentNode //parent DOM element
  index //if count is specified in the jsml the index corresponds to the index
        //of the element created so far, otherwise it will be 0
}
```


## jsmlParse
jsmlParse takes two arguments as below:
```javascript
var jsml //array of jsml compliant objects
var parentNode //element to attach new DOM tree to
jsmlParse(jsml, parentNode);
```
Alternatively you can partially apply jsmlParse as below:

**(NB This is likely to change so that the first highest level DOM element created is returned)**
```javascript
var appendDomStructureTo = jsmlParse(jsml);
//do some stuff
appendDomStructureTo(parentNode);
```
## Example
###Rendering a sudoku grid using DOM elements
```javascript
//define function to be used in callback for setting id tags
var getId = (function() {
  var id = 0;
  return function() {
    return id++;
  };
}());

//jsml object
var jsmlSudokuView = {
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
              id: getId,
              children: {
                tag: "option",
                count: "10",
                text: function(count) {
                  if (!count) {
                    return '';
                  }
                  return count;
                }
              }
            }
          }
        }
      }
    }
  }
}

```
