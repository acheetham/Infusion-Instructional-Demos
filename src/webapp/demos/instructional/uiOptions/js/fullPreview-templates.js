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

// Initialize the "demo" namespace
var demo = demo || {};

// Define the functions that will be used by the demo
(function ($, fluid) {
    demo.initPageEnhancer = function () {
        fluid.pageEnhancer({
            // Tell UIEnhancer where to find the table of contents' template URL
            tocTemplate: "../../../../components/tableOfContents/html/TableOfContents.html"
        });                
    };
    
    demo.initUIOptions = function () {
        fluid.uiOptions.fullPreview("#out-of-the-box", {
            // Tell UIOptions where to find all the templates, relative to this file
            prefix: "../../../../components/uiOptions/html/",

            // Tell the Preview's UIEnhancer where to find the table of contents' template URL
            previewEnhancer: {
                options: {
                    tocTemplate: "../../../../components/tableOfContents/html/TableOfContents.html"
                }
            },
            
            templateLoader: {
                options: {
                    templates: {
                        uiOptions: "../templates/UIOptionsCustomTemplate.html",
                        layoutControls: "../templates/UIOptionsTemplate-layout-custom.html"
                    }
                }
            }
        });
    };    
})(jQuery, fluid);
