module.exports = function (parent) {
  return function (child) {
    return parent.appendChild(child);
  };
};
