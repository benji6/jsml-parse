module.exports = {
  appendChild: function (child) {
    return function (parent) {
      return parent.appendChild(child);
    };
  },
  setId: function (el, name) {
    el.id = name;
    return el;
  },
  setClassName: function (el, name) {
    el.className = name;
    return el;
  },
  setAttribute: function (el, attr, value) {
    if (el.attr === undefined) {
      console.log("jsmlParse error: " + el + " does not have attribute " + attr);
      return;
    }
    el.attr = value;
  }
};
