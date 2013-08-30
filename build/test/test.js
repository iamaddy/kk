define("dist/test/test", [ "../src/ajax/xhr", "../src/dom/dom", "../src/dom/selector", "../src/dom/class", "../src/dom/attr", "../src/dom/css", "../src/dom/doc" ], function(require, exports, module) {
    require("../src/ajax/xhr");
    var dom = require("../src/dom/dom");
    console.log(dom("#xu"));
    console.log(kk);
});