/*
Copyright 2011 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global fluid_1_4:true, jQuery*/

// JSLint options 
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

var fluid_1_4 = fluid_1_4 || {};

(function ($, fluid) {

    var buildModel = function (sourceFile) {
        var model = {};

        // strip off unwanted markup
        sourceFile = sourceFile.replace(/<\/?!doctype.*>/ig, ""); //Remove doctype
        sourceFile = sourceFile.replace(/<\/?html.*>/ig, ""); //Remove html tag
        sourceFile = sourceFile.replace(/<\/?head.*>/ig, ""); //Remove head tag
        sourceFile = sourceFile.replace(/<\/?meta.*>/ig, ""); //Remove meta tags
        sourceFile = sourceFile.replace(/<script.*>.*<\/script>/ig, ""); // Remove script tags
        sourceFile = sourceFile.replace(/<\/?link.*>/ig, ""); //Remove link tags
        sourceFile = sourceFile.replace(/<title.*>.*<\/title>/ig, ""); // Remove title tags
        sourceFile = sourceFile.replace(/<\/?body.*>/ig, ""); //Remove body tag
        model.fullWorkingCode = $.trim(sourceFile);
        
        // extract the script tag
        var scriptStart = sourceFile.indexOf("<script");
        if (scriptStart >= 0) {
            var scriptEnd = sourceFile.indexOf("</script>")+9;
            var scriptTag = sourceFile.substring(scriptStart, scriptEnd);
            model.jsString = $.trim($(scriptTag).text());
            sourceFile = sourceFile.replace(scriptTag, "");
            sourceFile = $.trim(sourceFile);
        }

        // extract the css
        var cssStart = sourceFile.indexOf("<style");
        if (cssStart >= 0) {
            var cssEnd = sourceFile.indexOf("</style>")+8;
            var cssTag = sourceFile.substring(cssStart, cssEnd);
            model.cssString = $.trim($(cssTag).text());
            sourceFile = sourceFile.replace(cssTag, "");
            sourceFile = $.trim(sourceFile);
        }
        
        // the HTMl is the only thing left
        model.htmlString = $.trim(sourceFile);
        
        return model;
    };

    /* ==========================
     * Demo Builder subcomponent
     */
    fluid.registerNamespace("fluid.demoBuilder");

    // TODO: don't need this? use a prototree
    fluid.demoBuilder.produceTree = function (that) {
        var tree = {
            workingRegion: "${fullWorkingCode}",
            jsSnippet: "${jsString}",
            htmlSnippet: "${htmlString}",
            cssSnippet: "${cssString}"
        };
        return tree;
    };

    fluid.defaults("fluid.demoBuilder", {
        gradeNames: ["fluid.IoCRendererComponent", "autoInit"],

        preInitFunction: "fluid.demoBuilder.preInit",
        finalInitFunction: "fluid.demoBuilder.finalInit",
        
        produceTree: fluid.demoBuilder.produceTree,

        selectors: {
            workingRegion: ".flc-exampler-workingRegion",
            jsRegion: ".flc-exampler-jsRegion",
            jsSnippet: ".flc-exampler-jsSnippet",
            htmlRegion: ".flc-exampler-htmlRegion",
            htmlSnippet: ".flc-exampler-htmlSnippet",
            cssRegion: ".flc-exampler-cssRegion",
            cssSnippet: ".flc-exampler-cssSnippet"
        },
        
        selectorsToIgnore: ["jsRegion", "htmlRegion", "cssRegion"],
        
        model: {
            fullWorkingCode: "",
            jsString: "",
            cssString: "",
            htmlString: ""
        },
        
        template: "",
        sourceText: "",
        
        events: {
            onReady: null
        }
    });

    fluid.demoBuilder.preInit = function (that) {
        that.model = buildModel(that.options.sourceText);
    };

    fluid.demoBuilder.finalInit = function (that) {
        that.render(that.produceTree());
    };

    /* =================================
     * Main Instructional Demo component
     */
    fluid.defaults("fluid.instructionalDemo", {
        gradeNames: ["fluid.viewComponent", "autoInit"],

        finalInitFunction: "fluid.instructionalDemo.finalInit",

        components: {
            demo: {
                type: "fluid.demoBuilder",
                createOnEvent: "onReady",
                priority: "first",
                container: "{instructionalDemo}.container",
                options: {
                    resources: "{instructionalDemo}.options.resources",
                    template: "{instructionalDemo}.options.resources.template.resourceText",
                    sourceText: "{instructionalDemo}.options.resources.sourceFile.resourceText"
                }
            }
        },

        resources: {
            template: {
                href: "../html/InstructionalDemoTemplate.html"
            },
            sourceFile: {
                href: ""
            }
        },
        
        events: {
            onReady: null
        }
    });

    fluid.instructionalDemo.finalInit = function (that) {
        fluid.fetchResources(that.options.resources, function () {
            that.events.onReady.fire(that);
        });
    };


})(jQuery, fluid_1_4);
