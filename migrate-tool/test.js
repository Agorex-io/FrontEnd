const io = require('socket.io-client');
const js = require('../config/main.json');

var user_address = '0xa83adca55ce5d0cc43ba16f4247ca65229a1bfb1';
// var user_address = '0x5902fcFA445E0E78Ab20C394a561292353610774';
var tokens_JSON = js.tokens;

// populate token info arrays from JSON
var token_addresses = [];
var token_names = [];
var token_decimals = [];
tokens_JSON.forEach(function (token) {
    token_addresses.push(token['addr']);
    token_names.push(token['name']);
    token_decimals.push(token['decimals']);
});

// -- init socket.io object for fetching orders --
var FD = io("https://api.forkdelta.com/");
FD.connect();

FD.on('connect', function(data) { console.log('connected to FD api'); });
FD.on('disconnect', function(data) { console.log('disconnected from FD api'); });

var orders = {
    sells:[],
    buys:[]
};

//handle market responses from FD socket io
FD.on('market', function(data) {
    console.log('returned market');

    if (data.hasOwnProperty('myOrders')) {

        //add sell orders
        if (data.myOrders.hasOwnProperty('sells')) {
            data.myOrders.sells.forEach(function(val){
                orders.sells.push(val);
            });
        }

        //add buy orders
        if (data.myOrders.hasOwnProperty('buys')) {
            data.myOrders.buys.forEach(function(val){
                orders.buys.push(val);
            });
        }

    }
});

//send messages to FD socket io to see if there are any orders for every token from this user
function get_orders(user, tokens) {
    tokens.forEach(function(val){
        FD.emit('getMarket', {token:val, user:user});
    });
}

get_orders(user_address, token_addresses);
console.log(orders);
