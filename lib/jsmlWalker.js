var appendChild = require('./appendChild.js');
var createDomElementFromJsml = require('./createDomElementFromJsml.js');

module.exports = function recurse (jsml, parentDomElement) {
  var jsmlCallback = function (jsml) {
    var ret;
    var count = jsml.count || 1;

    if (!count || count <= 1) {
      ret = createDomElementFromJsml(jsml, count, parentDomElement);

      if (jsml.children) {
        recurse(jsml.children)(ret);
      }

      if (parentDomElement) {
        return appendChild(parentDomElement)(ret);
      }
    } else {
      ret = [];
      for (var i = 0; i < count; i++) {
        var domEl = createDomElementFromJsml(jsml, i, parentDomElement);

        if (jsml.children) {
          recurse(jsml.children)(domEl);
        }

        if (parentDomElement) {
          return appendChild(parentDomElement)(domEl);
        }

        ret.push(domEl);
      }
    }

    return ret;
  };

  if (Array.isArray(jsml.children)) {
    return jsml.children.forEach(jsmlCallback);
  }
  return jsmlCallback(jsml);
};
