var appendChild = require('./appendChild.js');

module.exports = function (text, domEl, count) {
  if (typeof text === 'function') {
    appendChild(domEl)(document.createTextNode(text(count)));
    return;
  }
  appendChild(domEl)(document.createTextNode(text));
};
