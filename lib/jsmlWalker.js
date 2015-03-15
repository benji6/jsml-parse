var createDomElementFromJsml = require('./createDomElementFromJsml.js');

module.exports = function recurse (jsml, parentDomElement) {
  var ret;
  var i;
  var j;
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
      return parentDomElement.appendChild(ret);
    }
  } else {
    ret = [];
    for (i = 0; i < count; i++) {
      var domEl = createDomElementFromJsml(jsml, i, parentDomElement);

      if (jsml.children) {
        if (Array.isArray(jsml.children)) {
          for (j = 0; j < jsml.children.length; j++) {
            recurse(jsml.children[j], domEl);
          }
        } else {
          recurse(jsml.children, domEl);
        }
      }

      if (parentDomElement) {
        parentDomElement.appendChild(domEl);
      }

      ret.push(domEl);
    }
  }

  return ret;
};
