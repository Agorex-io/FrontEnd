/* --- DEPENDENCIES --- */
const Web3 = require('web3');
const BN = require('bignumber.js');
// const io = require('socket.io-client');

// settings
var rpc_api_provider = 'https://api.mycryptoapi.com/eth';
var old_contract = '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819';
var old_contract_abi = [{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"}],"name":"trade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"order","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orderFills","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"cancelOrder","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"depositToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"amountFilled","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeMake_","type":"uint256"}],"name":"changeFeeMake","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeMake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeRebate_","type":"uint256"}],"name":"changeFeeRebate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"},{"name":"sender","type":"address"}],"name":"testTrade","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeAccount_","type":"address"}],"name":"changeFeeAccount","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeRebate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeTake_","type":"uint256"}],"name":"changeFeeTake","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"admin_","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orders","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeTake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"accountLevelsAddr_","type":"address"}],"name":"changeAccountLevelsAddr","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"accountLevelsAddr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"availableVolume","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"admin_","type":"address"},{"name":"feeAccount_","type":"address"},{"name":"accountLevelsAddr_","type":"address"},{"name":"feeMake_","type":"uint256"},{"name":"feeTake_","type":"uint256"},{"name":"feeRebate_","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"}],"name":"Order","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"}],"name":"Cancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"get","type":"address"},{"indexed":false,"name":"give","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Withdraw","type":"event"}];
// generic abi for fetching symbol from any ERC20 token
var generic_contract_abi = [ { "constant":true, "inputs":[], "name":"symbol", "outputs":[ { "name":"", "type":"string" } ], "payable":false, "type":"function" } ];
// TEMP: Test user_addr from J.
// var user_address = '0xa83adca55ce5d0cc43ba16f4247ca65229a1bfb1';
// TODO: Get user_address ?from metamask?
var user_address = '0x5902fcFA445E0E78Ab20C394a561292353610774';

// get tokens from frontend config JSON
// var tokens = JSON.parse(get_JSON('https://raw.githubusercontent.com/forkdelta/forkdelta.github.io/master/config/main.json')).tokens;
var tokens = JSON.parse('{"tokens": [' +
    '{"addr": "0x0000000000000000000000000000000000000000", "name": "ETH", "decimals": 18},' +
    '{"addr": "0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374", "name": "VERI", "decimals": 18},' +
    '{"addr": "0x014b50466590340d41307cc54dcee990c8d58aa8", "name": "ICOS", "decimals": 6}' +
    ']}').tokens;

//-- init fetching orders and balances --
var web3 = new Web3(new Web3.providers.HttpProvider(rpc_api_provider));

var generic_contract = web3.eth.contract(generic_contract_abi);
var ED_contract = web3.eth.contract(old_contract_abi);
var ED = ED_contract.at(old_contract);
//
// // var FD = io("https://api.forkdelta.com/");
// // FD.connect();
// //
// // FD.on('connect', function(data) { console.log('connected'); });
// // FD.on('disconnect', function(data) { console.log('disconnected'); });
//

var balances = {};
var orders = {
    sells:[],
    buys:[]
};

//get user balances for tokens
function fetch_balances(user, tokens) {
    tokens.forEach(function(token){
        balances[token['addr']] = get_token_balance(token['addr'], user);
    });
}

/* -- Frontend JS -- */
var ED_balances = $('#ED-migration-balances');

// get balances
fetch_balances(user_address, tokens);

// populate multiselect with user balances
var balances_added = 0;
tokens.forEach(function(token) {
    var balance = balances[token['addr']];
    if (balance != 0) // Only display tokens with balances
        ED_balances.append("<option value=\"" + token['addr'] + "\">" + token['name'] + ": " + balance + "</option>");


    // Populate multiselect display after list has been populated
    balances_added++;
    if(balances_added === tokens.length) {
        ED_balances.multiselect({
            search: {
                left: '<input type="text" name="ED-bal-search" class="form-control" placeholder="Search Ether Balances" />',
                right: '<input type="text" name="FD-bal-search" class="form-control" placeholder="Search Fork balances" />'
            },
            fireSearch: function(value) {
                return value.length > 1;
            }
        });
    }
});

// if user entered token, add it to multiselect menu
var tokens_added = [];
$("#token-addr-form").on( "submit", function( event ) {
    event.preventDefault();
    var token_address = document.getElementById('new-token-addr-input').value;
    console.log(token_address);
    var token_symbol = get_token_symbol(token_address);
    var balance = get_token_balance(token_address, user_address);
    ED_balances.append("<option value=\"" + token_address + "\">" + token_symbol + ": " + balance + "</option>");
});


//--- utils ---
// converts the big number stored in eth contracts to its user-friendly decimal equivalent
function big_number_to_decimal(big_number, token_decimals) {
    return big_number.dividedBy(Math.pow(10, token_decimals));
}

// gets a token's symbol using a generic contract ABI
function get_token_symbol(token_address) {
    if (token_address == '0x0000000000000000000000000000000000000000') { return "ETH"; }
    var token_contract = generic_contract.at(token_address);
    return token_contract.symbol();
}

// gets a token's decimals from Etherium call
function get_token_decimals(token_address) {
    if (token_address == '0x0000000000000000000000000000000000000000') return 18;

    var decimalsCall = {
        to: token_address,
        data: web3.sha3('decimals()').substring(0,10)
    };

    // Parse returned hex into integer
    return parseInt(web3.eth.call(decimalsCall));
}

// gets a token's balance from an Etherium call
function get_token_balance(token_address, user) {
    // grab balance from ED contract
    var big_number_str = ED.balanceOf(token_address, user)['c'];
    // if balances return a split integer, join it into single value
    var big_number = new BN(big_number_str.join(''));
    // return balance in user-readable decimal notation
    return big_number_to_decimal(big_number, get_token_decimals(token_address));
}

// fetches JSON from url
function get_JSON(url){
    var value= $.ajax({
        url: url,
        async: false
    }).responseText;
    return value;
}