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
    
    // Define a component that will render the checkboxes
    fluid.defaults("demo.linksRenderer", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],

        selectors: {
            link1: ".democ-link-1",
            link2: ".democ-link-2"
        },

        model: {
            link1: {
                href: "http://domain.com/page.html",
                label: "A link"
            },
            link2: {
                href: "../relative/url.html",
                label: "Another link"
            }
        },

        produceTree: "demo.linksRenderer.produceTree",

        renderOnInit: true
    });

    // Define the function that will be used by the component to define the renderer component tree
    demo.linksRenderer.produceTree = function (that) {
        var tree = {
            link1: {
                target: "${link1.href}",
                linktext: "${link1.label}"
            },
            link2: {
                target: "${link2.href}",
                linktext: "${link2.label}"
            }
        };
        return tree;
    };
    
})(jQuery);
