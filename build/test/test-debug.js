define("dist/test/test-debug", [ "../src/ajax/xhr-debug", "../src/dom/dom-debug", "../src/dom/selector-debug", "../src/dom/class-debug", "../src/dom/attr-debug", "../src/dom/css-debug", "../src/dom/doc-debug" ], function(require, exports, module) {
    require("../src/ajax/xhr-debug");
    var dom = require("../src/dom/dom-debug");
    console.log(dom("#xu"));
    console.log(kk);
});