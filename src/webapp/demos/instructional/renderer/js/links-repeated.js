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

    // Define a component that will render the repeating links
    fluid.defaults("demo.linksRenderer", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],

        // one selector for each element that rendered data from the model
        selectors: {
            linkRow: ".democ-link-row",
            link: ".democ-link"
        },

        // the 'linkRow' selector is the one that will be repeated by the renderer
        repeatingSelectors: ["linkRow"],

        model: {
            repeatingData: [
                {
                    href: "http://domain.com/page.html",
                    label: "Link 1 Label"
                },
                {
                    href: "../relative/url.html",
                    label: "Link 2 Label"
                },
                {
                    href: "http://another.domain.com/page.html",
                    label: "Link 3 Label"
                }
            ]
        },

        produceTree: "demo.linksRenderer.produceTree",

        renderOnInit: true
    });

    // Define the function that will be used by the component to
    // produce the renderer component tree
    demo.linksRenderer.produceTree = function (that) {
        return {
            expander: {
                type: "fluid.renderer.repeat",
                repeatID: "linkRow",
                controlledBy: "repeatingData",
                pathAs: "data",
                tree: {
                    // subtree for a link
                    link: {
                        target: "${{data}.href}",
                        linktext: "${{data}.label}"
                    }
                }
            }
        };
    };
    
})(jQuery);
