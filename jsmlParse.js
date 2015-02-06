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

var chain = function chain(fns) {
    return function(x, i) {
        i = i || 0;
        var fn;
        var binaryReturnFn = function(y) {
            return chain(fns)(fn(x, y), ++i);
        };
        while (i < fns.length) {
            fn = fns[i];
            if (fn.length === 2) {
                return binaryReturnFn;
            }
            x = fn(x);
            i++;
        }
        return x;
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

var jsmlWalkerCallback = function(parentNode) {
    return function(el, count) {
        if (!count) {
            count = 0;
        }
        var domEl = createElement(el.tag);
        el.callback && el.callback(domEl, parentNode, count);
        textSetter(el.text, domEl, count);
        attrSetter(el, "id", domEl, setId);
        attrSetter(el, "class", domEl, setClassName);
        appendChild(domEl)(parentNode);
        return domEl;
    };
};

jsmlParse = function(jsml, parentNode) {
    jsmlWalker(jsmlWalkerCallback)(jsml)(parentNode);
};