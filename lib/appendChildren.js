module.exports = function (parent) {
  return function (children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        parent.appendChild(child);
      }
      return;
    }
    return parent.appendChild(children);
  };
};
