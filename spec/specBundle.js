(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./spec/spec.js":[function(require,module,exports){
var jsmlParse = require('../dist/main.js');

describe("jsmlParse", () => {
  var jsml = null;

  beforeEach(() => {
    jsml = {
      tag: "p",
    };
  });
  it("is a function", () => {
    expect(jsmlParse).toEqual(jasmine.any(Function));
  });
  it("returns a DOM element when called with a jsml object", () => {
    expect(jsmlParse(jsml).tagName).toEqual(document.createElement('p').tagName);
  });
});

},{"../dist/main.js":"/home/b/js/jsml/dist/main.js"}],"/home/b/js/jsml/dist/main.js":[function(require,module,exports){
var maybeAppendChild=function(e){return function(t){return e.appendChild(t)}},appendTextNode=function(e,t,n){return"function"==typeof e?void maybeAppendChild(t)(document.createTextNode(e(n))):void maybeAppendChild(t)(document.createTextNode(e))},jsmlWalker=function(e){return function t(n,r){var a,c=function(n){n.count||(n.count=1);for(var c=0;c<n.count;c++)a=e(n,c,r),r&&maybeAppendChild(r)(a),n.children&&t(n.children)(a)};if(Array.isArray(n.constructor))for(var o=0;o<n.length;o++)c(n[o]);else c(n)}},createDomElementFromJsml=function(e,t,n){t||(t=0);var r=document.createElement(e.tag);for(var a in e)if(e.hasOwnProperty(a))switch(a){case"tag":case"count":case"children":break;case"variable":this[e.variable]=r;break;case"text":appendTextNode(e.text,r,t);break;case"callback":e.callback(r,n,t);break;default:void 0!==r[a]&&(r[a]="function"==typeof e[a]?e[a](t):e[a])}return r};module.exports=jsmlWalker(createDomElementFromJsml);
},{}]},{},["./spec/spec.js"]);
