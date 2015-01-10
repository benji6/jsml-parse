var createElement = function(tag) {
  return document.createElement(tag);
};
var createTextNode = function(txt) {
  return document.createTextNode(txt);
};
var appendChild = function(child) {
  return function(parent) {
    return parent.appendChild(child);
  };
};
var createAndAppendChild = function(tag, parent) {
  return appendChild(createElement(tag))(parent);
};
var createAndAppendTextNode = function(txt, parent) {
  return appendChild(createTextNode(txt))(parent);
};
var setAttribute = function(el, name, val) {
  el.setAttribute(name, val);
  return el;
};
var infanticide = function(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};
