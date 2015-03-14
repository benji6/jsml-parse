var appendChildren = require('./appendChildren.js');

module.exports = function (text, domEl, count) {
  if (typeof text === 'function') {
    appendChildren(domEl)(document.createTextNode(text(count)));
    return;
  }
  appendChildren(domEl)(document.createTextNode(text));
};
