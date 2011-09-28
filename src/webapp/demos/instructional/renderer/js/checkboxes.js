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
    
    // Define a component that will render the checkboxes
    fluid.defaults("demo.checkboxRenderer", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],

        // one selector for each element that rendered data from the model
        selectors: {
            checkboxRow: ".democ-checkboxes-checkbox",
            box: ".democ-checkboxes-box",
            checkboxLabel: ".democ-checkboxes-label"
        },

        // the 'checkboxRow' selector is the one that will be repeated by the renderer
        repeatingSelectors: ["checkboxRow"],

        model: {
            checkboxes: {
                selection: ["opt2", "opt3"],
                choices: ["opt1", "opt2", "opt3", "opt4"],
                names: ["Option 1", "Option 2", "Option 3", "Option 4"]
            }
        },

        produceTree: "demo.checkboxRenderer.produceTree",

        renderOnInit: true
    });

    // Define the function that will be used by the component to
    // produce the renderer component tree
    demo.checkboxRenderer.produceTree = function (that) {
        var tree = {
            expander: {
                type: "fluid.renderer.selection.inputs",
                rowID: "checkboxRow",
                labelID: "checkboxLabel",
                inputID: "box",
                selectID: "checkboxes",
                tree: {
                    selection: "${checkboxes.selection}",
                    optionlist: "${checkboxes.choices}",
                    optionnames: "${checkboxes.names}"
                }
            }
        };
        return tree;
    };
    
})(jQuery);
