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

// Initialize the "demo" namespace
var demo = demo || {};

// Define the functions that will be used by the demo
(function ($, fluid) {
    demo.initPageEnhancer = function () {
        fluid.pageEnhancer({
            // Tell UIEnhancer where to find the table of contents' template URL
            tocTemplate: "../../../../components/tableOfContents/html/TableOfContents.html",

            classnameMap: {
                theme: {
                    // the key in this object must match the 'controlValue' added above
                    mist: "fl-theme-mist"
                },
                textFont: {
                    // the key in this object must match the 'controlValue' added above
                    courier: "fl-font-courier"
                }
            }
        });                
    };
    
    demo.initUIOptions = function () {
        fluid.uiOptions.fullNoPreview("#new-dropDowns", {
            // Tell UIOptions where to find all the templates, relative to this file
            prefix: "../../../../components/uiOptions/html/",

            // Specify the new entries in the drop-downs
            textControls: {
                options: {
                    classnameMap: "{uiEnhancer}.options.classnameMap",
                    strings: {
                        // The last entries in these arrays are the new entries.
                        // These strings map to the corresponding arrays in
						// the 'controlValues' below.
                        theme: ["Default", "Black on white", "White on black",
                                "Black on yellow", "Yellow on black", "Blue-ish"],
                        textFont: ["Default", "Times New Roman", "Comic Sans",
                                   "Arial", "Verdana", "Courier New"]
                    },
                    controlValues: {
                        // The last entries in these arrays are the new entries.
                        theme: ["default", "bw", "wb", "by", "yb", "mist"],
                        textFont: ["default", "times", "comic", "arial", "verdana", "courier"]
                    }
                }
            }
        });
    };    
})(jQuery, fluid);
