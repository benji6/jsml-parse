module.exports = function (text, domEl, count) {
  if (typeof text === 'function') {
    domEl.appendChild(document.createTextNode(text(count)));
    return;
  }
  domEl.appendChild(document.createTextNode(text));
};
