#JSML
######JavaScript Markup Langauge
##Description
jsmlParse takes jsml objects or an array of jsml objects to manipulate the DOM.

##jsml Structure
properties of a jsml object. All are optional and where callbacks are allowed count will be passed is as the first argument:

- tag - corresponds to html tag.
- text - text to be appended to the element, can be a function, in which case id is set to the return value and count is passed as the first variable.
- id - element id, can be a function, in which case id is set to the return value and count is passed as the first variable.
- class - element class name, can be a function, in which case id is set to the return value and count is passed as the first variable.
- children - either a single jsml object or an array of jsml objects to be appended to the current DOM element.
- count - number of elements to be created.
- callback - function to call on created DOM element(s). Currently takes three arguments as follows:
```javascript
var callback = function(element, parentNode, index) {
  element //DOM element
  parentNode //parent DOM element
  index //if count is specified in the jsml the index corresponds to the index
        //of the element created so far, otherwise it will be 0
}
```

here is an example of a jsml object:
```javascript
var jsml = {
  "tag": "p",
  "text": "hello, my count is: ",
  "id": "id"
  "class": "red",
  "count": "8",
  "callback": function(element, parentNode, index) {
    //can do anything here, e.g. set events, dynamic ids and classes etc...
  }
};
```
##jsmlParse
jsmlParse takes three arguments as below:
```javascript
var jsml //array of jsml compliant objects
var parentNode //element to attach new DOM tree to
var callback //optional function to apply to all elements created by jsmlParse. Takes same arguments as callback which can be specified for each jsml object (see above)
jsmlParse(jsml, parentNode[, callback]);
```
##Example
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
