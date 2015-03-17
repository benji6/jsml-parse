var appendTextNode = require('./appendTextNode.js');

module.exports = function (jsmlElement, count, parentDomElement) {
  if (!count) {
    count = 0;
  }

  var domElement = document.createElement(jsmlElement.tag);

  for (var property in jsmlElement) {
    if (jsmlElement.hasOwnProperty(property)) {
      switch (property) {
        case "tag":
        case "count":
        case "children":
          break;

        case "variable":
          this[jsmlElement.variable] = domElement;
          break;
        case "text":
          appendTextNode(jsmlElement.text, domElement, count);
          break;
        case "callback":
          jsmlElement.callback(domElement, parentDomElement, count);
          break;
        default:
          if (domElement[property] !== undefined) {
            if (typeof jsmlElement[property] === "function") {
              domElement[property] = jsmlElement[property](count);
            } else {
              domElement[property] = jsmlElement[property];
            }
          }
      }
    }
  }

  return domElement;
};
