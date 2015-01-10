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

var compose = function() {
    var fns = arguments;
    return function(x) {
        iterateFrom(0)(fns.length)(function(i) {
            x = fns[i].call(this, x);
        });
        return x;
    };
};

var wrap = function(parent) {
    return function(fn) {
        return fn(parent);
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

var setClassName = function(el, name) {
    el.className = name;
    return el;
};

var infanticide = function(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
};

var setAttribute = function(el, name, val) {
    el.setAttribute(name, val);
    return el;
};

var jsonml = [ {
    el: "p",
    text: "hello, how r you doing?",
    children: [ {
        el: "h6",
        text: "child1",
        className: "testClass"
    }, {
        el: "h6",
        text: "child2"
    } ]
}, {
    el: "h1",
    text: "hefsgfing?"
}, {
    el: "h2",
    text: "hello, how are you doing?"
} ];

var jsmlWalker = function arrayWalker(fn) {
    return function recurse(arr) {
        var i;
        for (i = 0; i < arr.length; i++) {
            fn(arr[i]);
            arr[i].children && recurse(arr[i].children);
        }
    };
};

var jsmlWalkerCallback = function(el) {
    var domEl = createElement(el.el);
    el.text && appendChild(createTextNode(el.text))(domEl);
    el.className && setClassName(domEl, el.className);
    appendChild(domEl)(document.body);
};

jsmlWalker(jsmlWalkerCallback)(jsonml);