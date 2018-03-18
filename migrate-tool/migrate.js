/* --- DEPENDENCIES --- */
const Web3 = require('web3');
const BN = require('bignumber.js');
// const io = require('socket.io-client');

// settings variables
var rpc_api_provider = 'https://api.mycryptoapi.com/eth';
// old EtherDelta contract
var old_contract = '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819';
var old_contract_abi = [{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"}],"name":"trade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"order","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orderFills","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"cancelOrder","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"depositToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"amountFilled","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeMake_","type":"uint256"}],"name":"changeFeeMake","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeMake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeRebate_","type":"uint256"}],"name":"changeFeeRebate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"},{"name":"sender","type":"address"}],"name":"testTrade","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeAccount_","type":"address"}],"name":"changeFeeAccount","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeRebate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeTake_","type":"uint256"}],"name":"changeFeeTake","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"admin_","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orders","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeTake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"accountLevelsAddr_","type":"address"}],"name":"changeAccountLevelsAddr","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"accountLevelsAddr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"availableVolume","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"admin_","type":"address"},{"name":"feeAccount_","type":"address"},{"name":"accountLevelsAddr_","type":"address"},{"name":"feeMake_","type":"uint256"},{"name":"feeTake_","type":"uint256"},{"name":"feeRebate_","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"}],"name":"Order","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"}],"name":"Cancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"get","type":"address"},{"indexed":false,"name":"give","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Withdraw","type":"event"}];
// contract for fetching all ED balances
var balance_fetch_contract_addr = '0x2256EF3B2B49cf3c0dd24731BC8FEAA022dB1d0C';
var balance_fetch_contract_abi = [{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"allBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"users","type":"address[]"},{"name":"tokens","type":"address[]"}],"name":"allBalancesForManyAccounts","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"walletBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"tokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchanges","type":"address[]"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"multiDeltaBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"deltaBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"destruct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"users","type":"address[]"}],"name":"whitelistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"users","type":"address[]"}],"name":"blacklistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
// generic abi for fetching symbol from any ERC20 token
var generic_contract_abi = [ { "constant":true, "inputs":[], "name":"symbol", "outputs":[ { "name":"", "type":"string" } ], "payable":false, "type":"function" } ];
// get tokens from frontend config JSON and populate token_addresses with addresses
var tokens_JSON = JSON.parse(get_JSON('https://raw.githubusercontent.com/forkdelta/forkdelta.github.io/master/config/main.json')).tokens;
var token_addresses = [];
tokens_JSON.forEach(function(token) {
    token_addresses.push(token['addr']);
});
// var tokens = JSON.parse('{"tokens": [' +
//     '{"addr": "0x0000000000000000000000000000000000000000", "name": "ETH", "decimals": 18},' +
//     '{"addr": "0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374", "name": "VERI", "decimals": 18},' +
//     '{"addr": "0x014b50466590340d41307cc54dcee990c8d58aa8", "name": "ICOS", "decimals": 6}' +
//     ']}').tokens;

//-- init fetching tokens, orders, and balances --
var web3 = new Web3(new Web3.providers.HttpProvider(rpc_api_provider));

var balance_fetch_contract = web3.eth.contract(balance_fetch_contract_abi);
var balance_fetch = balance_fetch_contract.at(balance_fetch_contract_addr);

var ED_contract = web3.eth.contract(old_contract_abi);
var ED = ED_contract.at(old_contract);

var generic_contract = web3.eth.contract(generic_contract_abi);

//
// // var FD = io("https://api.forkdelta.com/");
// // FD.connect();
// //
// // FD.on('connect', function(data) { console.log('connected'); });
// // FD.on('disconnect', function(data) { console.log('disconnected'); });
//

var balances = {};
var displayed_balances = [];
var orders = {
    sells:[],
    buys:[]
};

// frontend variables
var ED_balances = $('#ED-migration-balances');

// TEMP: Testing addresses with balances
// var user_address = '0xa83adca55ce5d0cc43ba16f4247ca65229a1bfb1';
var user_address = '0x5902fcFA445E0E78Ab20C394a561292353610774';

// call async function to load user address
var user_address_promise = get_user_addr();

// once user address loads, check for ED balances and run migration tool if any exist
user_address_promise.then(function(user_address_t) { // TEMP: change user_address_t to user_address to get browser user address
    console.log("User address loaded: " + user_address);

    // get balances
    fetch_balances(user_address, token_addresses);

    console.log(balances);

    // populate multiselect with user balances
    token_addresses.forEach(function(token_addr) {
        // Only tokens with non-zero balances are added to balances
        if (typeof(balances[token_addr]) != "undefined") {
            var big_number_balance = balances[token_addr];
            console.log(big_number_balance);
            // Convert balance to user-readable decimal notation by looking up the token's decimal
            var name = get_token_symbol(token_addr);
            var balance = big_number_to_decimal(big_number_balance, get_token_decimals(token_addr));
            displayed_balances.push({"addr": token_addr, "name": name, "balance": balance});
        }
    });

    console.log(displayed_balances);

    // Render migration tool if user has balances
    if (displayed_balances.length >= 1) {
        document.getElementById('migration-modal').style.display ='block';
        populate_ms_balances(ED_balances, displayed_balances);
        // TODO: Render HTML with React
    }
});

// if user entered token, add it to multiselect menu
$("#token-addr-form").on( "submit", function( event ) {
    event.preventDefault();
    var token_address = document.getElementById('new-token-addr-input').value;
    var token_symbol = get_token_symbol(token_address);
    var balance = get_token_balance(token_address, user_address);
    displayed_balances.push({"addr" : token_address, "name" : token_symbol, "balance": balance});
    populate_ms_balances(ED_balances, displayed_balances);
});

// old get user balances for tokens from api calls
// function fetch_balances(user, tokens) {
//     var tokens_fetched = 0;
//     tokens.forEach(function(token){
//         tokens_fetched++;
//         balances[token['addr']] = get_token_balance(token['addr'], user);
//         console.log(tokens_fetched + " / " + tokens.length + " tokens fetched");
//     });
// }

function fetch_balances(user, token_addresses) {
    var addr_index = 0;
    var contract_fetch = balance_fetch.multiDeltaBalances([old_contract], user_address, token_addresses);
    contract_fetch.forEach(function(balance) {
        // get big number from balance string returned from contract call
        var big_number_str = balance['c'];
        // if balances are a split integer, join it into single value
        var big_number = new BN(big_number_str.join(''));
        // only add balance if non-zero
        if (big_number != "0")
            // add balance to balances in big-number form (where decimal is = 0)
            balances[token_addresses[addr_index]] = big_number;

        addr_index++;
    });
}

//--- utils ---
// get user's current account from redux store after the store loads
async function get_user_addr() {
    if (typeof(window.main.EtherDelta.store.getState().user.accounts[window.main.EtherDelta.store.getState().user.selectedAccount]) != "undefined") {
        user_from_store = window.main.EtherDelta.store.getState().user;
        return user_from_store.accounts[user_from_store.selectedAccount].addr;
    } else {
        console.log("Waiting on store to populate user address...");
        await sleep(5000);
        return get_user_addr();
    }
}

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
    if (token_address == '0x0000000000000000000000000000000000000000') { return 18; }

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

// sleeps for passed milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// init or refresh multiselect
function refresh_ms(ms) {
    ms.multiselect({
        search: {
            left: '<input type="text" name="ED-bal-search" class="form-control" placeholder="Search Ether Balances" />',
            right: '<input type="text" name="FD-bal-search" class="form-control" placeholder="Search Fork balances" />'
        },
        fireSearch: function (value) {
            return value.length > 1;
        }
    });
}

// populate balances of multiselect
function populate_ms_balances(ms, values) {
    values.forEach(function(value) {
        ms.append("<option value=\"" + value['addr'] + "\">" + value['name'] + ": " + value['balance'] + "</option>");
    });
    refresh_ms(ms);
}