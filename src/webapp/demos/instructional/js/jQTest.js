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


/*
General notes:
If there is no CSS relevant to the demo, then the entire CSS section should NOT be displayed 
*/

(function ($, fluid) {

    /*
     *  jQTest
     */
    fluid.defaults("fluid.jQTest", {
        gradeNames: ["fluid.viewComponent", "autoInit"],

        preInitFunction: "fluid.jQTest.preInit",
        finalInitFunction: "fluid.jQTest.finalInit",
        
        selectors: {
            workingRegion: ".flc-jQTest-workingRegion",
            jsRegion: ".flc-jQTest-jsRegion",
            jsSnippet: ".flc-jQTest-jsSnippet",
            htmlRegion: ".flc-jQTest-htmlRegion",
            htmlSnippet: ".flc-jQTest-htmlSnippet",
            cssRegion: ".flc-jQTest-cssRegion",
            cssSnippet: ".flc-jQTest-cssSnippet"
        },

        sourceSelectors: {
            html: ".example-html",
            script: ".script",
            css: "style",

            title: "example-title",
            description: "example-description"
        },
        
        sourceFile: "",
        
        events: {
            onReady: null   // fired in the fetchResources callback
        }
    });
    
    fluid.jQTest.preInit = function (that) {
        // add the "show details" event handler here
        that.showHideDetails = function () {
            
        };
    };

    var makeSnippetInjector = function (that) {
        return function(sourceFile){
            sourceFile = sourceFile.replace(/<\/?!doctype.*>/ig, ""); //Remove doctype
            sourceFile = sourceFile.replace(/<\/?html.*>/ig, ""); //Remove html tag
            sourceFile = sourceFile.replace(/<\/?head.*>/ig, ""); //Remove head tag
            sourceFile = sourceFile.replace(/<\/?meta.*>/ig, ""); //Remove meta tags
            sourceFile = sourceFile.replace(/<script.*>.*<\/script>/ig, ""); // Remove script tags
            sourceFile = sourceFile.replace(/<\/?link.*>/ig, ""); //Remove link tags
            sourceFile = sourceFile.replace(/<title.*>.*<\/title>/ig, ""); // Remove title tags
            sourceFile = sourceFile.replace(/<\/?body.*>/ig, ""); //Remove body tag
            sourceFile = $.trim(sourceFile);
            
            that.locate("workingRegion").empty().html(sourceFile);

            // extract and remove only the script part, inject it into page
            var scriptStart = sourceFile.indexOf("<script");
            var scriptEnd = sourceFile.indexOf("</script>")+9;
            var scriptTag = sourceFile.substring(scriptStart, scriptEnd);
            var scriptString = $.trim($(scriptTag).text());
            that.locate("jsSnippet").html(scriptString);
            sourceFile = sourceFile.replace(scriptTag, "");
            sourceFile = $.trim(sourceFile);

            // extract and remove only the css part, inject it into page
            var cssStart = sourceFile.indexOf("<style");
            var cssEnd = sourceFile.indexOf("</style>")+8;
            var cssTag = sourceFile.substring(cssStart, cssEnd);
            var cssString = $.trim($(cssTag).text());
            that.locate("cssSnippet").html(cssString);
            sourceFile = sourceFile.replace(cssTag, "");
            sourceFile = $.trim(sourceFile);

            // inject the remaining HTML snippet into the page
            that.locate("htmlSnippet").text(sourceFile);
            
            that.events.onReady.fire(that);
        };
    };

    fluid.jQTest.finalInit = function (that) {
        $.get(that.options.sourceFile, makeSnippetInjector(that), "string");
    };

})(jQuery, fluid_1_4);