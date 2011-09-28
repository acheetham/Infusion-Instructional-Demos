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
    
    // Define a component that will render the table
    fluid.defaults("demo.tableRenderer", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],

        // one selector for each element that rendered data from the model
        selectors: {
            tableRow: ".democ-table-row",
            cell1: ".democ-table-cell-1",
            cell2: ".democ-table-cell-2",
            cell3: ".democ-table-cell-3"
        },

        // the 'tableRow' selector is the one that will be repeated by the renderer
        repeatingSelectors: ["tableRow"],

        model: {
            // the data that repeats must be in an array
            repeatingData: [
                {cell1: "Row 1 Cell 1 data", cell2: "Row 1 Cell 2 data", cell3: "Row 1 Cell 3 data"},
                {cell1: "Row 2 Cell 1 data", cell2: "Row 2 Cell 2 data", cell3: "Row 2 Cell 3 data"},
                {cell1: "Row 3 Cell 1 data", cell2: "Row 3 Cell 2 data", cell3: "Row 3 Cell 3 data"},
                {cell1: "Row 4 Cell 1 data", cell2: "Row 4 Cell 2 data", cell3: "Row 4 Cell 3 data"},
                {cell1: "Row 5 Cell 1 data", cell2: "Row 5 Cell 2 data", cell3: "Row 5 Cell 3 data"}
            ]
        },

        produceTree: "demo.tableRenderer.produceTree",

        renderOnInit: true
    });

    // Define the function that will be used by the component to
    // produce the renderer component tree
    demo.tableRenderer.produceTree = function (that) {
        var tree = {
            expander: {
                type: "fluid.renderer.repeat",
                repeatID: "tableRow",
                controlledBy: "repeatingData",
                pathAs: "data",
                tree: {
                    cell1: "${{data}.cell1}",
                    cell2: "${{data}.cell2}",
                    cell3: "${{data}.cell3}"
                }
            }
        };
        return tree;
    };
    
})(jQuery);
