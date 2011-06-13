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

(function ($, fluid) {

    fluid.registerNamespace("demo.uiOptions.addedControls");

    // declare the current environment so that the template paths will override the defaults
    fluid.staticEnvironment.uiOptionsDemo = fluid.typeTag("demo.uiOptionsAddControlsDemo");
    
    // Specify the template URLs
    fluid.demands("fluid.uiOptionsTemplateLoader", "demo.uiOptionsAddControlsDemo", {
        options: {
            templates: {
                // provide a custom template that doesn't include the layout controls
                uiOptions: "../templates/AddedControlsUIOptions.html",
                addedControls: "../templates/UIOptionsTemplate-added.html",

                // these three are just overriding the default paths since we're in a different location
                textControls: "../../../../components/uiOptions/html/UIOptionsTemplate-text.html",
                layoutControls: "../../../../components/uiOptions/html/UIOptionsTemplate-layout.html",
                linksControls: "../../../../components/uiOptions/html/UIOptionsTemplate-links.html"
            }
        }
    });
    
    // Supply the table of contents' template URL
    fluid.demands("fluid.tableOfContents", ["fluid.uiEnhancer", "demo.uiOptionsAddControlsDemo"], {
        options: {
            // this is just overriding the default path since we're in a different location
            templateUrl: "../../../../components/tableOfContents/html/TableOfContents.html"
        }
    });     
        
    // add a set of controls
    fluid.demands("fluid.uiOptions", ["fluid.fullNoPreviewUIOptions", "demo.uiOptionsAddControlsDemo"], {
        options: {
            selectors: {
                addedControls: ".flc-uiOptions-added-controls"
            },
            components: {
                addedControls: {
                    type: "demo.uiOptions.addedControls",
                    container: "{uiOptions}.dom.addedControls",
                    createOnEvent: "onUIOptionsTemplateReady",
                    options: {
                        model: "{uiOptions}.model",
                        applier: "{uiOptions}.applier",
                        classnameMap: "{uiEnhancer}.options.classnameMap",
                        playfulness: {
                            min: 0,
                            max: 5
                        }
                    }
                },
                settingsStore: "{uiEnhancer}.settingsStore"
            },
            preInitFunction: "demo.uiOptions.addedControls.preInit"
        }
    });
    
    // tell the UIEnhancer the classnames to add to the new drop-down
    fluid.demands("fluid.uiEnhancer", ["demo.uiOptionsAddControlsDemo"], {
        options: {
            classnameMap: {
                location: ["default", "stairs", "downtown", "up"]
            }
        }
    });

    // declare defaults for new controls
    fluid.demands("fluid.uiOptions.store", ["fluid.uiEnhancer", "demo.uiOptionsAddControlsDemo"], {
        funcName: "fluid.cookieStore",
        options: {
            defaultSiteSettings: {
                // defaults for new controls:
                playfulness: 4,
                location: "default",
                boots: false,
    
                // original defaults, unmodified:
                textFont: "default",          // key from classname map
                theme: "default",             // key from classname map
                textSize: 1,                  // in points
                lineSpacing: 1,               // in ems
                layout: false,                // boolean
                toc: false,                   // boolean
                links: false,                 // boolean
                inputsLarger: false           // boolean
            }
        }
    });

    // declare the defaults for our new controls
    fluid.defaults("demo.uiOptions.addedControls", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],
        strings: {
            location: ["Default", "Under the Stairs", "Downtown", "Up"]
        },
        controlValues: {
            location: ["default", "stairs", "downtown", "up"]
        },
        selectors: {
            playfulness: ".flc-uiOptions-playfulness",
            location: ".flc-uiOptions-location",
            boots: ".flc-uiOptions-boots"
        },
        finalInitFunction: "fluid.uiOptions.controlsFinalInit",
        produceTree: "demo.uiOptions.addedControls.produceTree",
        resources: {
            template: {
                expander: {
                    type: "fluid.deferredInvokeCall",
                    func: "fluid.specBuilder",
                    args: {
                        forceCache: true,
                        fetchClass: "template",
                        url: "%addedControls"
                    }
                }
            }
        }
    });

    demo.uiOptions.addedControls.preInit = function () {
        fluid.uiOptions.preInit();
        fluid.fetchResources.primeCacheFromResources("demo.uiOptions.addedControls");
    };

    demo.uiOptions.addedControls.produceTree = function (that) {
        var tree = {};
        
        for (var item in that.model.selections) {
            if (item === "location") {
                // render drop down list box
                tree[item] = {
                    optionnames: "${labelMap." + item + ".names}",
                    optionlist: "${labelMap." + item + ".values}",
                    selection: "${selections." + item + "}",
                    decorators: {
                        type: "fluid",
                        func: "fluid.uiOptions.selectDecorator",
                        options: {
                            styles: that.options.classnameMap[item]
                        }
                    }
                };
            }
            else if (item === "playfulness") {
                // textfield sliders
                tree[item] = fluid.uiOptions.createSliderNode(that, item);
            }
            else if (item === "boots") {
                // checkbox
                tree[item] = "${selections." + item + "}";
            }
        }
        
        return tree;
    };

    
}) (jQuery, fluid);

