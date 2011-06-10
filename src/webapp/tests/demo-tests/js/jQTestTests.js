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
    var jQTestTests = new jqUnit.TestCase("jQTest Tests");
    
    fluid.tests.testjQTest = function (that) {
//        var source = $("<div />").append(that.snippetRenderer.options.resources.sourceFile.resourceText);
        jqUnit.assertTrue("Source file loaded", true);
        start();
    };



    jQTestTests.test("basic", function () {
        expect(1);
        var testjQTest = fluid.jQTest("#destRegion", {
            sourceFile: "../../../demos/instructional/html/inlineEdit-default.html",
            listeners: {
                onReady: "fluid.tests.testjQTest"
            }
        });
        stop();
    });

})(jQuery); 