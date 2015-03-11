var appendChild = require('./appendChild.js');
var createDomElementFromJsml = require('./createDomElementFromJsml.js');

module.exports = function recurse (jsml, parentDomElement) {
  var jsmlCallback = function (jsml) {
    var count = jsml.count || 1;

    while (count--) {
      var domEl = createDomElementFromJsml(jsml, count, parentDomElement);
      if (jsml.children) {
        recurse(jsml.children)(domEl);
      }
      if (parentDomElement) {
        return appendChild(parentDomElement)(domEl);
      }
      return domEl;
    }
  };

  if (Array.isArray(jsml.children)) {
    return jsml.children.forEach(jsmlCallback);
  }
  return jsmlCallback(jsml);
};
