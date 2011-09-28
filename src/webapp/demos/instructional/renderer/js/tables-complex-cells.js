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
            cell2link: ".democ-link",
            cell3box: ".democ-box",
            cell3label: ".democ-label"
        },

        // the 'tableRow' selector is the one that will be repeated by the renderer
        repeatingSelectors: ["tableRow"],

        model: {
            // the data that repeats must be in an array
            repeatingData: [
                {
                    cell1: "Row 1 string",
                    cell2: {
                        href: "http://domain1.com/page1.html",
                        label: "Link 1 Label"
                    },
                    cell3: {
                        checked: false,
                        label: "Check A"
                    }
                },
                {
                    cell1: "Row 2 string",
                    cell2: {
                        href: "http://domain2.com/page2.html",
                        label: "Link 2 Label"
                    },
                    cell3: {
                        checked: true,
                        label: "Check B"
                    }
                }
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
                    // subtree for the simple text
                    cell1: "${{data}.cell1}",

                    // subtree for the link
                    cell2link: {
                        target: "${{data}.cell2.href}",
                        linktext: "${{data}.cell2.label}"
                    },

                    // subtree for the checkbox and its label
                    cell3label: "${{data}.cell3.label}",
                    cell3box: "${{data}.cell3.checked}"
                }
            }
        };
        return tree;
    };
    
})(jQuery);
