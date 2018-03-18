/* This module was module number 565 in the old packed code and referenced in the old code by all of the following module names:

*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
exports.default = function() {
    var state =
            arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null,
        action = arguments[1];
    switch (action.type) {
        case 'UPDATE_RETURN_TICKER':
            return action.value;
        default:
            return state;
    }
          };