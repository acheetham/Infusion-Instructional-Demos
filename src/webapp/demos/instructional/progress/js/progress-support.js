// Declare dependencies
/*global fluid:true, jQuery*/

// JSLint options
/*jslint white: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */


var support = support || {};

(function ($, fluid) {

    /**
     * Used to simulate an application that would call Progress.    
     * @param {Integer} percent         the starting percentage when first called and then the current percentage when called recursively
     * @param {Integer} steps           the number of recursive steps to use for the simulated progress
     *                                  note: because of some randomness inserted into the simulation 
     *                                  for realism, the number of steps will actually be much less
     * @param {Function} stepFunction   the stepFunction update the progress component
     * @param {Function} finishFunction the finishFunction enables the submit button, hides the progress simulation and update the text                          
     * @param {String} direction        "forward" (default) or "backward"
     */
    var simulateTime = function (percent, steps, stepFunction, finishFunction, direction) {
        
        var invokeAfterDelay = function (fn) {
            var delay = 250;
            setTimeout(fn, delay);
        };
        
        var increment = (steps) ? (100 / steps) : 10;
        
        if (((direction === "backward") && (percent > 0)) || ((direction !== "backward") &&(percent < 100))) {
            // bump up the current percentage
            if (direction === "backward") {
                percent = percent - increment;
            } else {
                percent = percent + increment;
            }
 
            // update the progress component
            stepFunction(percent);

            // after a delay, do it all over again
            invokeAfterDelay(function () {
                simulateTime(percent, steps, stepFunction, finishFunction, direction);
            });
        } else {
            finishFunction();
        }
        
    };
    
    support.timeSimulator = function (startPercent, steps, direction) {
        var that = {
            direction: direction
        };
                
        that.start = function (stepFunction, finishFunction) {
            // simulate time
            simulateTime(startPercent, steps, stepFunction, finishFunction, that.direction);            
        };

        return that;
    };

    support.activateProgressBar = function (progressComponent, timer) {
        timer.start(function (percent) {
            progressComponent.update(percent);
        }, function () {
            progressComponent.hide();
        });
    };
    
})(jQuery, fluid);