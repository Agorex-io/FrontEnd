/* This module was module number 564 in the old packed code and referenced in the old code by all of the following module names:

*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
exports.default = function() {
    var state =
            arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {
                      tokenGuide: void 0,
                      tokenTitle: void 0,
                      screencast: void 0,
                  },
        action = arguments[1];
    switch (action.type) {
        case 'UPDATE_PAGE':
            return Object.assign(state, action.value);
        default:
            return state;
    }
          };