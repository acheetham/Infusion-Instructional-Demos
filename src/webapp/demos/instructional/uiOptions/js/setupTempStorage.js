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

(function (fluid) {
    // To prevent this demo from affecting the functioning of other demos in this set, we don't
    // want the settings stored in a cookie (which is the default). Instead, we configure the
    // UI Enhancer to use the Temporary Settings Store instead
    
    // Define the context for these demos
    fluid.staticEnvironment.demoContext = fluid.typeTag("demo");

    // Tell the UI Enhancer to use the tempStore for its store
    fluid.demands("fluid.uiOptions.store", ["fluid.uiEnhancer", "demo"], {
        funcName: "fluid.tempStore"
    });
})(fluid);
