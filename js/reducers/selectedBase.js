/* This module was module number 566 in the old packed code and referenced in the old code by all of the following module names:

*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
exports.default = function() {
    var state =
            arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : { addr: void 0, name: void 0, decimals: void 0 },
        action = arguments[1];
    switch (action.type) {
        case 'UPDATE_SELECTED_BASE':
            return action.value;
        default:
            return state;
    }
          };