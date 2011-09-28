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
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

// Declare the demo namespace
var demo = demo || {};

(function ($) {
    
    fluid.setLogging(true);

    // Define a component that will render the checkboxes
    fluid.defaults("demo.linksRenderer", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],

        selectors: {
            linkRow: ".democ-link-row",
            link: ".democ-link"
        },
        repeatingSelectors: ["linkRow"],

        model: {
            rawData: [
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

        debugMode: true,

        renderOnInit: true
    });

    // Define the function that will be used by the component to define the renderer component tree
    demo.linksRenderer.produceTree = function (that) {
        return {
            expander: {
                type: "fluid.renderer.repeat",
                repeatID: "linkRow",
                controlledBy: "rawData",
                pathAs: "data",
                tree: {
                    link: {
                        target: "${{data}.href}",
                        linktext: "${{data}.label}"
                    }
                }
            }
        };
    };
    
})(jQuery);
