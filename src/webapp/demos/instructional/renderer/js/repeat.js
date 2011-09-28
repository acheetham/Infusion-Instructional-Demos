/*
Copyright 2011 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global demo:true, fluid, jQuery*/

// JSLint options 
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true */
/*jslint regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

// Declare the demo namespace
var demo = demo || {};

(function ($) {
    
    // Define a component that will render the repeating elements
    fluid.defaults("demo.repeatRenderer", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],

        // one selector for each element that rendered data from the model
        selectors: {
            row: ".democ-repeating-div",
            content: ".democ-div-content"
        },

        // the 'row' selector is the one that will be repeated by the renderer
        repeatingSelectors: ["row"],

        model: {
            // the data that repeats must be in an array
            repeatingData: [
                {text: "This is the first string"},
                {text: "This is the second string"},
                {text: "This is the third string"},
                {text: "This is the fourth string"}
            ]
        },

        produceTree: "demo.repeatRenderer.produceTree",

        renderOnInit: true
    });

    // Define the function that will be used by the component to
    // produce the renderer component tree
    demo.repeatRenderer.produceTree = function (that) {
        var tree = {
            expander: {
                type: "fluid.renderer.repeat",
                repeatID: "row",
                controlledBy: "repeatingData",
                pathAs: "data",
                tree: {
                    // subtree for a text element
                    content: "${{data}.text}"
                }
            }
        };
        return tree;
    };
    
})(jQuery);
