/*
Copyright 2009 University of California, Berkeley
Copyright 2010 OCAD University

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
                        classnameMap: "{uiEnhancer}.options.classnameMap"
                    }
                },
                settingsStore: "{uiEnhancer}.settingsStore"
            },
            preInitFunction: "demo.uiOptions.addedControls.preInit"
        }
    });

    // declare defaults for new controls
    fluid.demands("fluid.uiOptions.store", ["fluid.fullNoPreviewUIOptions", "demo.uiOptionsAddControlsDemo"], {});

    demo.uiOptions.addedControls.preInit = function () {
        fluid.uiOptions.preInit();
        fluid.fetchResources.primeCacheFromResources("demo.uiOptions.addedControls");
    };
    fluid.defaults("demo.uiOptions.addedControls", {
        gradeNames: ["fluid.rendererComponent", "autoInit"], 
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
                tree[item] = createSliderNode(that, item);
            }
            else if (item === "boots") {
                // checkbox
                tree[item] = "${selections." + item + "}";
            }
        }
        
        return tree;
    };

    
}) (jQuery, fluid);

