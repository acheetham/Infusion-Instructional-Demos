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

var demo = demo || {};

(function ($) {
    
    fluid.defaults("demo.radioRenderer", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],

        rendererOptions: {
            debugMode: true
        },

        finalInitFunction: "demo.radioRenderer.finalInit",
        selectors: {
            imageItem: ".democ-imageRadios-item",
            imageLink: ".democ-imageRadios-image"
        },
        repeatingSelectors: ["imageItem"],
        model: {
            images: [
                {src: "../images/checkbox-checked.png"},
                {src: "../images/checkbox-unchecked.png"}
            ]
        },
        produceTree: "demo.radioRenderer.produceTree"
    });

    demo.radioRenderer.finalInit = function (that) {
        that.refreshView();
    };
    
    demo.radioRenderer.produceTree = function (that) {
        var tree = {
            expander: {
                type: "fluid.renderer.repeat",
                repeatID: "imageItem",
                controlledBy: "images",
                pathAs: "images",
                tree: {
                    imageLink: {
                        target: "${{images}.src}",
                        decorators:{
                            type: "jQuery",
                            func: "click",
                            args: function() {
                                console.log("image has been clicked");
                            }
                        }
                    }
                }
            }
        };
        return tree;
    };
    
})(jQuery);