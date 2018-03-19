/* --- dependencies --- */
const Web3 = require('web3');
const BN = require('bignumber.js');
const io = require('socket.io-client');

// api (change if calls become blocked)
const rpc_api_provider = 'https://api.mycryptoapi.com/eth';
// old EtherDelta contract addr and abi
var old_contract = '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819';
const old_contract_abi = [{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"}],"name":"trade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"order","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orderFills","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"cancelOrder","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"depositToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"amountFilled","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeMake_","type":"uint256"}],"name":"changeFeeMake","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeMake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeRebate_","type":"uint256"}],"name":"changeFeeRebate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"},{"name":"sender","type":"address"}],"name":"testTrade","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeAccount_","type":"address"}],"name":"changeFeeAccount","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeRebate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeTake_","type":"uint256"}],"name":"changeFeeTake","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"admin_","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orders","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeTake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"accountLevelsAddr_","type":"address"}],"name":"changeAccountLevelsAddr","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"accountLevelsAddr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"availableVolume","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"admin_","type":"address"},{"name":"feeAccount_","type":"address"},{"name":"accountLevelsAddr_","type":"address"},{"name":"feeMake_","type":"uint256"},{"name":"feeTake_","type":"uint256"},{"name":"feeRebate_","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"}],"name":"Order","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"}],"name":"Cancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"get","type":"address"},{"indexed":false,"name":"give","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Withdraw","type":"event"}];
// utility contract for fetching ED balances created by @lampshade, PR: https://github.com/forkdelta/smart_contract/pull/1
const balance_fetch_contract_addr = '0x2256EF3B2B49cf3c0dd24731BC8FEAA022dB1d0C';
const balance_fetch_contract_abi = [{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"allBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"users","type":"address[]"},{"name":"tokens","type":"address[]"}],"name":"allBalancesForManyAccounts","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"walletBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"tokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchanges","type":"address[]"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"multiDeltaBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"deltaBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"destruct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"users","type":"address[]"}],"name":"whitelistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"users","type":"address[]"}],"name":"blacklistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
// generic abi for fetching symbol from any ERC20 token
const generic_contract_abi = [ { "constant":true, "inputs":[], "name":"symbol", "outputs":[ { "name":"", "type":"string" } ], "payable":false, "type":"function" } ];
// get tokens from frontend config JSON and populate token_addresses with addresses
try {
    var tokens_JSON = JSON.parse(get_JSON('https://raw.githubusercontent.com/forkdelta/forkdelta.github.io/master/config/main.json')).tokens;
} catch (err) {
    alert("Error fetching tokens from https://raw.githubusercontent.com/forkdelta/forkdelta.github.io/master/config/main.json. " +
        "\n Please contact site administrator.");
    console.log(err);
}
// TEMP: Tokens for testing
// var tokens_JSON = JSON.parse('{"tokens": [' +
//     '{"addr": "0x0000000000000000000000000000000000000000", "name": "ETH", "decimals": 18},' +
//     '{"addr": "0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374", "name": "VERI", "decimals": 18},' +
//     '{"addr": "0x014b50466590340d41307cc54dcee990c8d58aa8", "name": "ICOS", "decimals": 6}' +
//     ']}').tokens;

// populate token info arrays from JSON
var token_addresses = [];
var token_names = [];
var token_decimals = [];
tokens_JSON.forEach(function (token) {
    token_addresses.push(token['addr']);
    token_names.push(token['name']);
    token_decimals.push(token['decimals']);
});
var token_addresses_with_balances = [];

//-- init web3 objects for fetching tokens, and balances --
var web3 = new Web3(new Web3.providers.HttpProvider(rpc_api_provider));
// utility balance-fetching smart contract
let balance_fetch_contract = web3.eth.contract(balance_fetch_contract_abi);
var balance_fetch = balance_fetch_contract.at(balance_fetch_contract_addr);
// old EtherDelta smart contract, URL: https://github.com/etherdelta/smart_contract
let ED_contract = web3.eth.contract(old_contract_abi);
var ED = ED_contract.at(old_contract);
// generic contract for fetching any ERC20-compliant contract's symbol (name)
var generic_contract = web3.eth.contract(generic_contract_abi);

//-- init socket.io objects for fetching orders --
// var FD = io("https://api.forkdelta.com/");
// FD.connect();
//
// FD.on('connect', function(data) { console.log('connected to FD api'); });
// FD.on('disconnect', function(data) { console.log('disconnected from FD api'); });

// balances and arrays containing options to be displayed in ms
var balances = {};
var displayed_balances = [];
var displayed_orders = [];
// options selected by user for migration from ED to FD smart contract
var selected_balances = [];
var selected_orders = [];

// frontend variables
var ED_balances = $('#ED-migration-balances');
var ED_orders = $('#ED-migration-orders');

// TEMP: Testing addresses with multiple balances. Interchange with promised_user_addr
// var user_address = '0xa83adca55ce5d0cc43ba16f4247ca65229a1bfb1';
var user_address = '0x5902fcFA445E0E78Ab20C394a561292353610774';

// call async function to load user address
var user_address_promise = get_user_addr();

// once user address loads, check for ED balances and run migration tool if any balances exist for account
user_address_promise.then(function (promised_user_addr) { // TEMP: change promised_user_addr to user_address to get browser user address
    console.log("User address loaded: " + user_address);
    // user_address = promised_user_addr;
    // display user address in header of migration-tool
    document.getElementById("migration-current-user").innerHTML = "Current user: " + user_address;
    // get balances from migration smart contract utility
    fetch_balances(user_address, token_addresses, old_contract);

    // populate balance multiselect with user balances
    token_addresses_with_balances.forEach(function (token_addr) {
        let big_number_balance = balances[token_addr];
        // Convert balance to user-readable decimal notation by looking up the token's decimal
        let name = token_names[token_addresses.indexOf(token_addr)];
        let decimals = parseInt(token_decimals[token_addresses.indexOf(token_addr)]);
        let balance = big_number_to_decimal(big_number_balance, decimals);
        displayed_balances.push({"addr": token_addr, "name": name, "balance": balance});
    });

    // Render migration tool and get orders if user has balances
    if (displayed_balances.length >= 1) {
        console.log("User has balances on ED contract, opening migration tool.");
        document.getElementById('migration-modal').style.display = 'block';
        populate_ms_balances(ED_balances, displayed_balances);
        // TODO: Render HTML with React

        // get orders from redux store
        let orders_promise = fetch_orders();

        orders_promise.then(function (orders) {
            // If there are orders, populate ms
            if (orders != null && orders.length >= 1) {
                // populate order multiselect with user orders
                orders.forEach(function (order) {
                    // Display all buys first
                    order.buys.forEach(function (buy) {
                        // TODO: properly format a buy order for display
                        displayed_orders.push(buy);
                    });
                    // Display sells after buys
                    order.sells.forEach(function (sell) {
                        // TODO: properly format a sell order for display
                        displayed_orders.push(sell);
                    });
                });
                populate_ms_orders(ED_orders, displayed_orders);
            } else {
                ED_orders.append("<option value=\"None\"> No Orders </option>");
                refresh_order_ms(ED_orders);
            }
        });
    }
});

// Front-end event listeners

// nav-bar link to open migration tool
$('#migrateTool').click(function(event) {
    document.getElementById('migration-modal').style.display ='block';
});

// if user enters a new token addr, add token to ms if it isn't already being displayed
$("#token-addr-form").on("submit", function (event) {
    event.preventDefault();
    let token_address = document.getElementById('new-token-addr-input').value;
    let token_symbol = get_token_symbol(token_address);
    let token_balance = get_token_balance(token_address, user_address);
    // Check that token isn't already being displayed
    let already_displayed = false;
    displayed_balances.forEach(function (balance) {
        if (balance['addr'] === token_address) {
            alert("Token balance is already listed.");
            already_displayed = true;
        }
    });
    // Add token to displayed array and update the ms with the token's balance
    if (!already_displayed) {
        displayed_balances.push({"addr": token_address, "name": token_symbol, "balance": token_balance});
        populate_ms_balances(ED_balances, [displayed_balances[displayed_balances.length - 1]]);
        console.log([displayed_balances[displayed_balances.length - 1]]);
    }
});

// Begin migration logic if button is clicked and order and/or balances are selected
$("#begin-migration").click(function (event) {
    // Get selected orders and balances from multiselects
    get_selected();

    // If user has selected any balances or orders, migrate them to new contract
    if (selected_orders.length >= 1 || selected_balances.length >= 1) {
        begin_migration();
    } else {
        alert("No balances or orders selected.")
    }

    // Close migration tool modal
    document.getElementById('migration-modal').style.display = 'none';
});

// --- fetch balance and orders ---
function fetch_balances(user, token_addresses, contract_addr) {
    let addr_index = 0;
    // use utility smart contract to fetch multiple ED balances with single call
    let contract_fetch = balance_fetch.multiDeltaBalances([contract_addr], user, token_addresses);
    contract_fetch.forEach(function (balance) {
        // get big number from balance string returned from contract call
        let big_number_str = balance['c'];
        // if balances are a split integer, join it into single value
        let big_number = new BN(big_number_str.join(''));
        // Only tokens with non-zero balances are added to balances
        if (big_number.toString() !== "0") {
            // add balance to balances in big-number form (where decimal is = 0)
            balances[token_addresses[addr_index]] = big_number;
            token_addresses_with_balances.push(token_addresses[addr_index]);
        }
        addr_index++;
    });
}

async function fetch_orders() {
    if (typeof(window.main.EtherDelta.store.getState().myOrders) !== "undefined") {
        return window.main.EtherDelta.store.getState().myOrders;
    } else {
        console.log("Waiting on store for orders...");
        await sleep(5000);
        return fetch_orders();
    }
}

//--- utils ---
// get user's current account from redux store after the store loads
async function get_user_addr() {
    if (typeof(window.main.EtherDelta.store.getState().user.accounts[window.main.EtherDelta.store.getState().user.selectedAccount]) !== "undefined") {
        let user_from_store = window.main.EtherDelta.store.getState().user;
        return user_from_store.accounts[user_from_store.selectedAccount].addr;
    } else {
        console.log("Waiting on store to populate user address...");
        await sleep(5000);
        return get_user_addr();
    }
}

// converts the big number stored in eth contracts to its user-friendly decimal equivalent
function big_number_to_decimal(big_number, token_decimals) {
    return big_number.dividedBy(Math.pow(10, token_decimals)).toString();
}

// gets a token's symbol using a generic contract ABI
function get_token_symbol(token_address) {
    if (token_address === '0x0000000000000000000000000000000000000000') {
        return "ETH";
    }
    try {
        let token_contract = generic_contract.at(token_address);
        return token_contract.symbol();
    } catch (err) {
        console.log("Error in migrate.js with function get_token_symbol");
        alert("Error fetching token name. Is the token ERC20 compliant?");
        console.log(err);
        return "Name Error";
    }

}

// gets a token's decimals from Etherium call
function get_token_decimals(token_address) {
    if (token_address === '0x0000000000000000000000000000000000000000') {
        return 18;
    }
    try {
        let decimalsCall = {
            to: token_address,
            data: web3.sha3('decimals()').substring(0, 10)
        };
        // Parse returned hex into integer
        return parseInt(web3.eth.call(decimalsCall));
    } catch (err) {
        console.log("Error in migrate.js with function get_token_decimals");
        alert("Error fetching token decimals. Is the token ERC20 compliant?");
        console.log(err);
        return "18";
    }


}

// gets a token's balance from an Etherium call
function get_token_balance(token_address, user) {
    try {
        // grab balance from ED contract
        let big_number_str = ED.balanceOf(token_address, user)['c'];
        console.log("Balance of user entered " + token_address + " is " + big_number_str);
        // if balances return a split integer, join it into single value
        let big_number = new BN(big_number_str.join(''));
        // return balance in user-readable decimal notation
        return big_number_to_decimal(big_number, get_token_decimals(token_address));
    } catch (err) {
        console.log("Error in migrate.js with function get_token_balance");
        alert("Error fetching user's token balance");
        console.log(err);
        return "Error";
    }
}

// fetches JSON from url
function get_JSON(url) {
    try {
        return $.ajax({
            url: url,
            async: false
        }).responseText;
    } catch (err) {
        console.log("Unable to fetch JSON");
        alert("Error fetching JSON, please contact site administrator");
    }
}

// sleeps for passed milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Multiselect (ms) functions ---
// init or refresh balances multiselect
function refresh_balances_ms(ms) {
    ms.multiselect({
        search: {
            left: '<input type="text" name="ED-bal-search" class="form-control" placeholder="Search Ether Balances" />',
            right: '<input type="text" name="FD-bal-search" class="form-control" placeholder="Search Fork Balances" />'
        },
        fireSearch: function (value) {
            return value.length > 1;
        }
    });
}

// populate balances of multiselect
function populate_ms_balances(ms, values) {
    // Populate ms with options
    values.forEach(function (value) {
        ms.append("<option value=\"" + value['addr'] + "\">" + value['name'] + ": " + value['balance'] + "</option>");
    });
    refresh_balances_ms(ms); // Refresh display
}

// init or refresh orders multiselect
function refresh_order_ms(ms) {
    ms.multiselect({
        search: {
            left: '<input type="text" name="ED-bal-search" class="form-control" placeholder="Search Ether Orders" />',
            right: '<input type="text" name="FD-bal-search" class="form-control" placeholder="Search Fork Orders" />'
        },
        fireSearch: function (value) {
            return value.length > 1;
        }
    });
}

// populate orders of multiselect
function populate_ms_orders(ms, values) {
    values.forEach(function (value) {
        // TODO: format orders
        ms.append("<option value=\"" + value + "\">" + order + "</option>");
    });
    refresh_order_ms(ms);
}

// get user-selected option values from multiselect
function get_ms_selected_values(ms_id) {
    let selected = [];
    $(ms_id + ' option').each(function () {
        selected.push($(this).val());
    });
    return selected;
}

// gets selected orders and balances
function get_selected() {
    selected_balances = get_ms_selected_values('#ED-migration-balances_to');
    selected_orders = get_ms_selected_values('#ED-migration-orders_to');
}

// --- contract migration logic ---
function begin_migration() {
    console.log("Begin migration");
    console.log("Selected Balances:");
    console.log(selected_balances);
    console.log("Selected Orders:");
    console.log(selected_orders);
    if (selected_balances.length >= 1) {
        // TODO: logic to transfer balances from ED smart contract to FD contract
    }

    if (selected_orders.length >= 1) {
        // TODO: logic to transfer orders from ED smart contract to FD contract
    }
}