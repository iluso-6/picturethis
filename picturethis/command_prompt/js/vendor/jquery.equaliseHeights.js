/* globals jQuery */
(function ($) {
    'use strict';

    $.fn.equaliseHeights = function (options) {
        var self = this,
            settings = $.extend({
                // defaults
                useMinHeight: false, // will equalise heights to the shortest element if set to true 
                delay: 200, // debounce delay
                runEqualise: function () {
                    // function that decides whether to run the equalise script or reset the height
                    // can therefore be run at specified breakpoints
                    return true;
                }
            }, options);

        // https://davidwalsh.name/javascript-debounce-function
        // Returns a function, that, as long as it continues to be invoked, will not be triggered.
        // The function will be called after it stops being called for N milliseconds.
        // If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
        function debounce(func, wait, immediate) {
            var timeout;
            return function () {
                var args = arguments,
                    callNow = immediate && !timeout,
                    later = function () {
                        timeout = null;
                        if (!immediate) {
                            func.apply(window, args);
                        }
                    };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    func.apply(window, args);
                }
            };
        }

        // reset the heights of elements
        function resetHeights() {
            self.outerHeight('auto');
        }

        // the height equalising function 
        function equaliseHeights() {
            var heightToSet = 0;

            // reset heights so we can get natural value
            resetHeights();

            self.each(function (ignore, value) {
                var item = $(value);

                if (settings.useMinHeight) {
                    // if shorter than current then update
                    if (heightToSet === 0 || item.outerHeight(true) <= heightToSet) {
                        heightToSet = item.outerHeight();
                    }
                } else {
                    // if taller than current then update 
                    if (item.outerHeight(true) >= heightToSet) {
                        heightToSet = item.outerHeight();
                    }
                }
            });

            // apply height to each element
            self.outerHeight(heightToSet);
        }

        function run() {
            // if any elements exists
            if (self.length) {
                // should the heights be equalised or reset
                if (settings.runEqualise()) {
                    equaliseHeights();
                } else {
                    resetHeights();
                }
            }
        }

        // run equalise script
        run();

        // rerun the equalise on resize of window
        // debounced for efficiency
        $(window).resize(debounce(run, settings.delay, false));
        
        // Chainable
        return self;
    };
}(jQuery));
