module.exports = function (a, b) {
  expect(a.tagName).toEqual(b.tagName);
  expect(a.constructor).toBe(b.constructor);
};
