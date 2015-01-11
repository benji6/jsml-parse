#JSML
######JavaScript Markup Langauge
***Currently in development and not stable!!! This readme is mostly to help me understand what I am doing and what I actually want to do!***
##Description
jsmlParse takes jsml objects or an array of jsml objects to manipulate the DOM.

##jsml Structure
properties of a jsml object (all are optional):

- tag - corresponds to html tag
- text - text to be appended to the element
- class - set the class name here
- children - either a single jsml object or an array of jsml objects to be appended to the current DOM element.
- count - number of elements to be created
- callback - function to call on created DOM element. Currently takes three arguments as follows:
```javascript
var callback = function(element, parentNode, index) {
  element //DOM element
  parentNode //parent DOM element
  index //if count is specified in the jsml the index corresponds to the index of the element created so far, otherwise it will be 0
}
```

here is an example of some jsml:
```javascript
var jsml = [
{
  "tag": "p",
  "text": "hello, my count is: ",
  "class": "red",
  "count": "8",
  "callback": function(element, parentNode, index) {
    element.id = index.toString();
  }
}
];
```
##jsmlParse
jsmlParse takes three arguments as below:
```javascript
var jsml //array of jsml compliant objects
var parentNode //element to attach new DOM tree to
var callback //optional function to apply to all elements created by jsmlParse. Takes same arguments as callback which can be specified for each jsml object (see above)
jsmlParse(jsml, parentNode[, callback]);
```
jsmlParse can be used in a callback, useful for automatically creating large DOM trees...
