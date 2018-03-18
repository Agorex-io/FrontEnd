/* This module was module number 562 in the old packed code and referenced in the old code by all of the following module names:

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
        case 'CLEAR_MY_TRADES':
            return null;
        case 'UPDATE_MY_TRADES':
            return action.value.sort(function(a, b) {
                return (
                    new Date(b.date) - new Date(a.date) || b.amount - a.amount
                );
            });
        case 'NEW_MY_TRADES':
            var initialState = state || [];
            return action.value.concat(initialState).sort(function(a, b) {
                return (
                    new Date(b.date) - new Date(a.date) || b.amount - a.amount
                );
            });
        default:
            return state;
    }
          };