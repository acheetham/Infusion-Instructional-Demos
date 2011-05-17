/*
Copyright 2011 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global fluid, jqUnit, jQuery*/

// JSLint options 
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

(function ($) {

    fluid.setLogging(true);
    fluid.registerNamespace("fluid.tests");    
    var instructionalDemoTests = new jqUnit.TestCase("Instructional Demo Tests");

    fluid.tests.testModel = function (that) {
        expect(3);
        // TODO: not the best way to encode expected results
        var expectedJsString = "jQuery(document).ready(function () {\n                var myInlineEdit = fluid.inlineEdit(\"#test\");\n            });"
        var expectedCssString = ".example-html {color: purple;}";
        var expectedHtmlString = "<div class=\"example-html\">\n            <div id=\"test\">\n                <div class=\"flc-inlineEdit-text\">\n                    <div class=\"flc-inlineEditable\">This is the editable text.</div>\n                </div>\n            </div>\n        </div>";
        jqUnit.assertEquals("JS string extracted correctly", expectedJsString, that.demo.model.jsString);
        jqUnit.assertEquals("CSS string extracted correctly", expectedCssString, that.demo.model.cssString);
        jqUnit.assertEquals("HTML string extracted correctly", expectedHtmlString, that.demo.model.htmlString);
        start();
    };

    instructionalDemoTests.test("Model construction", function () {
        var testInstructionalDemo = fluid.instructionalDemo("#destRegion", {
            resources: {
                sourceFile: {
                    href: "../../../demos/instructional/html/inlineEdit-default.html"
                },
                template: {
                    href: "../../../demos/instructional/html/InstructionalDemoTemplate.html"
                }
            },
            listeners: {
                onReady: "fluid.tests.testModel",
                priority: "last"
            }
        });
        stop();
    });

})(jQuery); 