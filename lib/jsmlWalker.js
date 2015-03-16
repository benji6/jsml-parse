var createDomElementFromJsml = require('./createDomElementFromJsml.js');

module.exports = function recurse (jsml, parentDomElement) {
  var ret;
  var i;
  var j;
  var k;
  var domEl;
  var count;

  if (Object.prototype.toString.call(jsml) === '[object Array]') {
    ret = [];
    for (i = 0; i < jsml.length; i++) {
      count = jsml[i].count;
      if (!count || count <= 1) {
        domEl = createDomElementFromJsml(jsml[i], count, parentDomElement);

        if (jsml[i].children) {
          recurse(jsml[i].children, domEl);
        }

        if (parentDomElement) {
          parentDomElement.appendChild(domEl);
        }

        ret.push(domEl);
      } else {
        for (j = 0; j < count; j++) {
          domEl = createDomElementFromJsml(jsml[i], j, parentDomElement);

          if (jsml[i].children) {
            recurse(jsml[i].children, domEl);
          }

          if (parentDomElement) {
            parentDomElement.appendChild(domEl);
          }

          ret.push(domEl);
        }
      }
    }
  } else {
    count = jsml.count;
    if (!count || count <= 1) {
      ret = domEl = createDomElementFromJsml(jsml, count, parentDomElement);

      if (parentDomElement) {
        parentDomElement.appendChild(ret);
      }

      if (jsml.children) {
        recurse(jsml.children, domEl);
      }
    } else {
      ret = [];
      for (i = 0; i < count; i++) {
        domEl = createDomElementFromJsml(jsml, i, parentDomElement);

        if (parentDomElement) {
          parentDomElement.appendChild(domEl);
        }

        ret.push(domEl);

        if (jsml.children) {
          recurse(jsml.children, domEl);
        }
      }
    }
  }

  return ret;
};
