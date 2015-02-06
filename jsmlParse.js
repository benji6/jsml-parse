var iterateFrom = function(fr) {
    return function(count) {
        return function(fn) {
            var from = fr;
            var to = count + fr;
            while (from < to) {
                fn(from++);
            }
        };
    };
};

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

var setId = function(el, name) {
    el.id = name;
    return el;
};

var setClassName = function(el, name) {
    el.className = name;
    return el;
};

var setAttribute = function(el, attr, value) {
    if (el.attr === undefined) {
        console.log("jsmlParse error: " + el + " does not have attribute " + attr);
        return;
    }
    el.attr = value;
};

var jsmlWalker = function jsmlWalker(fn) {
    return function recurse(jsml) {
        return function(parentNode) {
            var domEl;
            var fnParentSet = fn(parentNode);
            var run = function(jsml) {
                if (!jsml.count) {
                    jsml.count = 1;
                }
                for (var i = 0; i < jsml.count; i++) {
                    domEl = fnParentSet(jsml, i);
                    jsml.children && recurse(jsml.children)(domEl);
                }
            };
            if (jsml.constructor === Array) {
                var i;
                for (i = 0; i < jsml.length; i++) {
                    run(jsml[i]);
                }
            } else {
                run(jsml);
            }
        };
    };
};

var attrSetter = function(el, prop, domEl, fn, count) {
    if (el[prop]) {
        if (typeof el[prop] === "function") {
            fn(domEl, el[prop](count));
            return;
        }
        fn(domEl, el[prop]);
    }
};

var textSetter = function(text, domEl, count) {
    if (text) {
        if (typeof text === "function") {
            appendChild(createTextNode(text(count)))(domEl);
            return;
        }
        appendChild(createTextNode(text))(domEl);
    }
};

var jsmlWalkerCallback = function(parentDomElement) {
    return function(jsmlElement, count) {
        if (!count) {
            count = 0;
        }
        var domElement = createElement(jsmlElement.tag);
        jsmlElement.callback && jsmlElement.callback(domElement, parentDomElement, count);
        textSetter(jsmlElement.text, domElement, count);
        attrSetter(jsmlElement, "id", domElement, setId);
        attrSetter(jsmlElement, "class", domElement, setClassName);
        appendChild(domElement)(parentDomElement);
        return domElement;
    };
};

jsmlParse = function(jsml, parentNode) {
    jsmlWalker(jsmlWalkerCallback)(jsml)(parentNode);
};