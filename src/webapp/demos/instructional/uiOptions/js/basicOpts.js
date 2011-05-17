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


    demo.setup = function () {
        fluid.uiEnhancer();

        /*=============================
         * Bare minimum, out of the box, no customizations other than those necessary
         */
        fluid.uiOptions("#bareMinimum", {
            resources: {
                template: {
                    url: "../../../../components/uiOptions/html/UIOptions.html"
                }
            },
            components: {
                preview: {
                    options: {
                        templateUrl: "../../../../standalone-demos/uiOptions/html/UIOptionsPreview.html"
                    }
                }
            }
        });

        /*=============================
         * Out of the box, PLUS: minimum and maximum text size
         */
        fluid.uiOptions("#textSize", {
            // these first two options are required for any case
            resources: {
                template: {
                    url: "../../../../components/uiOptions/html/UIOptions.html"
                }
            },
            components: {
                preview: {
                    options: {
                        templateUrl: "../../../../standalone-demos/uiOptions/html/UIOptionsPreview.html"
                    }
                }
            },

            // this is the actual demo option
            textSize: {
                min: 24,
                max: 26
            }
        });

        /*=============================
         * Out of the box, PLUS: line spacing
         */
        fluid.uiOptions("#lineSpacing", {
            // these first two options are required for any case
            resources: {
                template: {
                    url: "../../../../components/uiOptions/html/UIOptions.html"
                }
            },
            components: {
                preview: {
                    options: {
                        templateUrl: "../../../../standalone-demos/uiOptions/html/UIOptionsPreview.html"
                    }
                }
            },

            // this is the actual demo option
            lineSpacing: {
            min: 2,
            max: 4
        }
        });

        /*=============================
         * Out of the box, PLUS: strings
         */
        fluid.uiOptions("#strings", {
            resources: {
                template: {
                    url: "../../../../components/uiOptions/html/UIOptions.html"
                }
            },
            components: {
                preview: {
                    options: {
                        templateUrl: "../../../../standalone-demos/uiOptions/html/UIOptionsPreview.html"
                    }
                },
                controls: {
                    options: {
                        strings: {
                            textFont: ["Serif", "Sans-Serif", "Arial", "Verdana", "Courier", "Times"],
                            textSpacing: ["Eh", "E-h", "E--h", "E---h"],
                            theme: ["Grey, grey", "Average", "Average, but grey", "Whoa!", "Aohw!"],
                            backgroundImages: ["Woohoo!", "Uh, I don't think so"],
                            layout: ["Si", "Nono"],
                            toc: ["Oui", "Non"]
                        }
                    }
                }
            }
        });

        /*=============================
         * Out of the box, PLUS: no preview
         */
        fluid.uiOptions("#noPreview", {
            resources: {
                template: {
                    url: "../../../../components/uiOptions/html/UIOptions.html"
                }
            },
            components: {
                // NOTE that this alone will not affect the template
                // you'll still have the rectangle, it will just be empty
                // a proper demo will need a different template
                preview: {
                    type: "fluid.emptySubcomponent"
                }
            }
        });

        /*=============================
         * Required for all demos:
         * Supply the table of contents' template URL that is relative to the caller html
         */
        fluid.demands("fluid.tableOfContents", ["fluid.uiOptions", "fluid.uiEnhancer"], {
            options: {
                templateUrl: "../../../../components/tableOfContents/html/TableOfContents.html"
            }
        });
    };




})(jQuery, fluid);
