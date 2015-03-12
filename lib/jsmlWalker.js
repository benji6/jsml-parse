var appendChild = require('./appendChild.js');
var createDomElementFromJsml = require('./createDomElementFromJsml.js');

module.exports = function recurse (jsml, parentDomElement) {
  var jsmlCallback = function (jsml) {
    var ret;
    var i;
    var count = jsml.count;

    if (!count || count <= 1) {
      ret = createDomElementFromJsml(jsml, count, parentDomElement);

      if (jsml.children) {
        if (Array.isArray(jsml.children)) {
          for (i = 0; i < jsml.children.length; i++) {
            recurse(jsml.children[i], ret);
          }
        } else {
          recurse(jsml.children, ret);
        }
      }

      if (parentDomElement) {
        return appendChild(parentDomElement)(ret);
      }
    } else {
      ret = [];
      for (i = 0; i < count; i++) {
        var domEl = createDomElementFromJsml(jsml, i, parentDomElement);

        if (jsml.children) {
          if (Array.isArray(jsml.children)) {
            for (i = 0; i < jsml.children.length; i++) {
              recurse(jsml.children[i], domEl);
            }
          } else {
            recurse(jsml.children, domEl);
          }
        }

        if (parentDomElement) {
          return appendChild(parentDomElement)(domEl);
        }

        ret.push(domEl);
      }
    }

    return ret;
  };


  return jsmlCallback(jsml);
};
