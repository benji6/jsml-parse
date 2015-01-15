var createElement = function (tag) {
  return document.createElement(tag);
};

var createTextNode = function (txt) {
  return document.createTextNode(txt);
};

var appendChild = function (child) {
  return function (parent) {
    return parent.appendChild(child);
  };
};

var setId = function (el, name) {
  el.id = name;
  return el;
};

var setClassName = function (el, name) {
  el.className = name;
  return el;
};
