"use strict";
//================================================================================
// Node.js dependencies
//================================================================================
const Web3 = require('web3');
const BN = require('bignumber.js');
const io = require('socket.io-client');

// React
import React from 'react';
import ReactDOM from 'react-dom';

//=============================
// ==================================================
// Config Variables TODO: Update Github-hosted main.json
//================================================================================

// var main_config = JSON.parse(get_JSON('https://raw.githubusercontent.com/forkdelta/forkdelta.github.io/master/config/main.json'));
// var tokens = main_config.tokens;
// const rpc_api_provider = main_config.web_3_rpc_api_provider;
// const old_contract = main_config.from_contract_addr;
// const old_contract_abi = main_config.from_contract_abi;
// const new_contract = main_config.to_contract_addr;
// const new_contract_abi = main_config.to_contract_abi;
// const balance_fetch_contract_addr = main_config.balance_fetch_contract_addr;
// const balance_fetch_contract_abi = main_config.balance_fetch_contract_abi;
// const generic_contract_abi = main_config.generic_contract_abi;

//TEMP============================================================================
const rpc_api_provider = 'https://api.mycryptoapi.com/eth';
// old EtherDelta contract addr and abi
var old_contract = '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819';
const old_contract_abi = [{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"}],"name":"trade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"order","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orderFills","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"cancelOrder","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"depositToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"amountFilled","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeMake_","type":"uint256"}],"name":"changeFeeMake","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeMake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeRebate_","type":"uint256"}],"name":"changeFeeRebate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"},{"name":"sender","type":"address"}],"name":"testTrade","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeAccount_","type":"address"}],"name":"changeFeeAccount","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeRebate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeTake_","type":"uint256"}],"name":"changeFeeTake","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"admin_","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orders","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeTake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"accountLevelsAddr_","type":"address"}],"name":"changeAccountLevelsAddr","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"accountLevelsAddr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"availableVolume","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"admin_","type":"address"},{"name":"feeAccount_","type":"address"},{"name":"accountLevelsAddr_","type":"address"},{"name":"feeMake_","type":"uint256"},{"name":"feeTake_","type":"uint256"},{"name":"feeRebate_","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"}],"name":"Order","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"}],"name":"Cancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"get","type":"address"},{"indexed":false,"name":"give","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Withdraw","type":"event"}];
// utility contract for fetching ED balances created by @lampshade, PR: https://github.com/forkdelta/smart_contract/pull/1
const balance_fetch_contract_addr = '0x2256EF3B2B49cf3c0dd24731BC8FEAA022dB1d0C';
const balance_fetch_contract_abi = [{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"allBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"users","type":"address[]"},{"name":"tokens","type":"address[]"}],"name":"allBalancesForManyAccounts","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"walletBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"tokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchanges","type":"address[]"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"multiDeltaBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"deltaBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"destruct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"users","type":"address[]"}],"name":"whitelistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"users","type":"address[]"}],"name":"blacklistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
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
//TEMP============================================================================

// -- init socket.io object for fetching orders --
var FD = io("http://api.localhost:8080/");
FD.connect();

FD.on('connect', function(data) { console.log('connected to FD api'); });
FD.on('disconnect', function(data) { console.log('disconnected from FD api'); });


import BalancesWindow from './components/windows/BalancesWindow'
import ConfirmationWindow from './components/windows/ConfirmationWindow'
import IntroductionWindow from './components/windows/IntroductionWindow'
import LoadingWindow from './components/windows/LoadingWindow'
import NoAccountWindow from './components/windows/NoAccountWindow'
import NoBalancesWindow from './components/windows/NoBalancesWindow'
import OrdersWindow from './components/windows/OrdersWindow'
import SuccessWindow from './components/windows/SuccessWindow'

// Parent React component that controls window state
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_address: '',

            // Initialize window to -3 (LoadingWindow)
            window: -3,

            balances_fetched: false,

            order_fetched_progress: 0,
            order_fetches_needed: 0,

            balances_options: [],

            orders_buy_options: [],
            orders_sell_options: [],

            estimated_gas: 0
        };

        // Listen for market response and update buy and sells if there is one
        FD.on('market', function(data) {
            console.log('returned market');

            if (data.hasOwnProperty('myOrders')) {
                console.log('has order!' + data.myOrders);
                //add sell orders
                let sells = [];
                if (data.myOrders.hasOwnProperty('sells')) {
                    data.myOrders.sells.forEach(function(val){
                        // TODO: Format sell order before pushing
                        sells.push(val);
                    });
                }

                //add buy orders
                let buys = [];
                if (data.myOrders.hasOwnProperty('buys')) {
                    data.myOrders.buys.forEach(function(val){
                        buys.push(val);
                    });
                }

                let new_sells = this.state.orders_sell_options.concat(sells);
                let new_buys = this.state.orders_sell_options.concat(buys);

                this.setState({
                    orders_sell_options: new_sells,
                    orders_buy_options: new_buys,
                    order_fetched_progress: this.state.order_fetched_progress + 1
                })

            }
        });
    };

    /* --- Navigate to next window -- */
    nextWindow(change_from, change_to) {
        let current_window = this.state.window;
        if (current_window < 5) {
            current_window += 1;
            this.setState({
                window: current_window
            });
        }
    };

    /* --- Navigate to previous window -- */
    previousWindow(change_from, change_to) {
        let current_window = this.state.window;
        if (current_window > 1) {
            current_window -= 1;
            this.setState({
                window: current_window
            });
        }
    };

    /* --- Hides window --- */
    closeWindow() {
        document.getElementById('migrationTool').style.display = 'none';
    }

    /* --- Add user-entered token to selected list --- */
    add_token(event) {
        event.preventDefault();

        // Get token address from DOM to let form submit go through validation rather than using onChange on input form
        let token_address = $('#new-token-addr-input').val();
        console.log("Fetching details for user entered-token: " + token_address);

        // Check that token isn't already being displayed
        let already_displayed = false;
        this.state.balances_options.forEach(function (balance) {
            if (balance.addr === token_address) {
                alert("Token balance is already listed.");
                already_displayed = true;
            }
        });

        // Add token to selected and tokens_added in state for updating React component
        if (!already_displayed) {
            let name = get_token_symbol(token_address);
            if (name === "Name Error") // If unable to fetch name from generic Web3 call, use token address
                name = token_address;
            let balance = get_token_balance(token_address, this.state.user_address);

            let balances_updated = this.state.balances_options.concat(
                {addr: token_address, name: name, balance: balance, is_selected: true}
            );
            this.setState({
                balances_options: balances_updated,
            });
        }
    }

    fetch_populated_orders() {
        // Check that balances are only fetched once
        if (!this.state.orders_fetched) {
            let temp_addresses = get_orders_options();
            this.setState({
                orders_options: temp_addresses,
                orders_fetched: true
            });
        }
    }

    /* --- One time populate of balances_options with fetched balances from out code --- */
    fetch_populated_balances() {
        // Check that balances are only fetched once
        if (!this.state.balances_fetched) {
            let temp_addresses = get_balances_options();
            let order_fetches_needed = temp_addresses.length;
            this.setState({
                balances_options: temp_addresses,
                balances_fetched: true,
                order_fetches_needed: order_fetches_needed
            });

            // Begin fetching orders
            let user_address = this.state.user_address;
            this.state.balances_options.forEach(function(val){
                //send messages to FD socket io to see if there are any orders for every token from this user
                FD.emit('getMarket', {token:val, user: user_address});
            });
        }
    }

    get_user_address() {
        let user_address_temp = get_user_address();
        this.setState({
            user_address: user_address_temp
        })
    }

    // Toggle balance selected
    on_balance_select(index) {
        console.log(index);
        let balances_updated = this.state.balances_options;
        balances_updated[index].is_selected = !balances_updated[index].is_selected;
        this.setState({balances_options: balances_updated});
    }

    estimate_gas() {
        let all_options = this.state.balances_options.concat(this.state.orders_buy_options)
                                                     .concat(this.state.orders_sell_options);
        all_options.forEach(function(option) {
            let new_estimated_gas = this.state.estimated_gas;
            new_estimated_gas += web3.eth.estimateGas({from: web3.eth.accounts[0], to: new_contract, amount: web3.toWei(1, "ether")}
            this.setState({estimated_gas: new_estimated_gas});
        });
    }

    // --- contract migration logic ---
    begin_migration() {
        console.log("Begin migration");
    }

    render() {
        // Determine current window
        let current_window;
        switch (this.state.window) {
            case -3:
                current_window = <LoadingWindow/>;
                break;
            case -2:
                current_window = <NoAccountWindow closeWindow={() => this.closeWindow()}/>;
                break;
            case -1:
                current_window = <NoBalancesWindow closeWindow={() => this.closeWindow()}/>;
                break;
            case 1:
                current_window = <IntroductionWindow nextWindow={() => this.nextWindow('', 'balances')}
                                                     get_user_address={() => this.get_user_address()}
                                                     user_address={this.state.user_address}/>;
                break;
            case 2:
                current_window = <BalancesWindow nextWindow={() => this.nextWindow("balances", '')}
                                                 previousWindow={() => this.previousWindow("balances", '')}
                                                 balances_options={this.state.balances_options}
                                                 balances_selected={this.state.balances_selected}
                                                 user_address={this.state.user_address}
                                                 onBalanceSelect={index => this.on_balance_select(index)}
                                                 handleTokenAdd={(e) => this.add_token(e)}/>;
                break;
            case 3:
                current_window = <OrdersWindow nextWindow={() => this.nextWindow("orders", '')}
                                               previousWindow={() => this.previousWindow("orders", '')}
                                               orders_buy_options={this.state.orders_buy_options}
                                               orders_sell_options={this.state.orders_sell_options}
                                               user_address={this.state.user_address}/>;
                break;
            case 4:
                current_window = <ConfirmationWindow nextWindow={() => this.nextWindow()}
                                                     previousWindow={() => this.previousWindow('', 'orders')}
                                                     estimated_gas={this.state.estimated_gas}/>;
                break;
            case 5:
                current_window = <SuccessWindow closeWindow={() => this.closeWindow()}
                                                begin_migration={() => this.begin_migration()}/>;
                break;
        }

        return (
            // Modal body, with interchangeable nested window
            <div className="migration-overlay" id="migration-modal">
                <div className="modal-dialog" tabIndex="-1">
                    {current_window}
                </div>
            </div>
        )

    };
}


// React component initialization for front-end of migration tool
var react_component = ReactDOM.render(<Application/>, document.getElementById('migrationTool'));


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


// balances and arrays containing options to be displayed in ms
var balances = {};
var balances_options = []; // Non-zero balances to be displayed as options for migration
var orders_options = []; // Orders to be displayed as options for migration
// options selected by user for migration from ED to FD smart contract
var balances_selected = []; // Balances from balances_options selected by user to be migrated
var orders_selected = []; // Orders from orders_options selected by user to be migrated

// frontend variables
var ED_balances = $('#ED-migration-balances');
var ED_orders = $('#ED-migration-orders');

// TEMP: Testing addresses with multiple balances. Interchange with promised_user_addr
// var user_address = "0xa318f2e298a86d07144cc46d00e29b5fe9385df7";
// var user_address = '0xa83adca55ce5d0cc43ba16f4247ca65229a1bfb1';
var user_address = '0x5902fcFA445E0E78Ab20C394a561292353610774';
// var user_address;

// call async function to load user address
// TEMP: Just loading user address
// var user_address_promise = fetch_user_addr();

// once user address loads, check for ED balances and run migration tool if any balances exist for account
// user_address_promise.then(function (promised_user_addr) {

    // TEMP: change promised_user_addr to user_address to get browser user address
    // user_address = promised_user_addr;

    console.log("User address loaded: " + user_address);

    // get balances from migration smart contract utility
    fetch_balances(user_address, token_addresses, old_contract);
    // check for orders only for the tokens that users have balances for
   // TODO: Orders work on node.js locally run file, but return 420 error when fetching from local host
    // get_orders(user_address, balances_options);

    // Render migration tool and get orders if user has balances
    if (balances_options.length >= 1) {
        console.log("User has balances on ED contract, opening migration tool.");

        // Display Migration Tool Component and Change State to introduction
        document.getElementById('migrationTool').style.display = 'block';
        change_window(1);

    } else {
        // Change window to NoBalancesWindow.js
        change_window(-1);
    }
// });

// Front-end event listeners
// nav-bar link to open migration tool
$('#migrateTool').click(function(event) {
    document.getElementById('migrationTool').style.display ='block';
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

    // Populate non-zero options for front-end user to select
    token_addresses_with_balances.forEach(function (token_addr) {
        let name = get_token_symbol(token_addr);
        let balance = get_token_balance(token_addr, user);
        balances_options.push({"addr": token_addr, "name": name, "balance": balance, "is_selected": true});
    });
}

//--- utils ---
// get user's current account from redux store after the store loads
async function fetch_user_addr() {
    if (typeof(window.main.EtherDelta.store.getState().user.accounts[window.main.EtherDelta.store.getState().user.selectedAccount]) !== "undefined") {
        let user_from_store = window.main.EtherDelta.store.getState().user;
        return user_from_store.accounts[user_from_store.selectedAccount].addr;
    } else {
        console.log("Waiting on store to populate user address, or for user to select an account...");
        await sleep(5000);
        if (typeof(window.main.EtherDelta.store.getState().user.accounts[window.main.EtherDelta.store.getState().user.selectedAccount]) === "undefined") {
            // Change window to NoAccountWindow
            change_window(-2);
        }
        return fetch_user_addr();
    }
}

// converts the big number stored in eth contracts to its user-friendly decimal equivalent
function big_number_to_decimal(big_number, token_decimals) {
    return big_number.dividedBy(Math.pow(10, token_decimals)).toString();
}

// gets a token's symbol using a generic contract ABI
function get_token_symbol(token_address) {
    // If Ether, return ETH address
    if (token_address === '0x0000000000000000000000000000000000000000') {
        return "ETH";
    }

    // Search tokens for addr to see if token address is already supported in FD config
    try {
    let addr_index = token_addresses.indexOf(token_address);
    if (addr_index !== -1) {
        return token_names[addr_index];
    }

    // If not supported, lookup symbol with web3 call

        let token_contract = generic_contract.at(token_address);
        return token_contract.symbol().toString();
    } catch (err) {
        console.log("Error in migrate.js with function get_token_symbol");
        alert("Error fetching token name. Is the token ERC20 compliant?");
        console.log(err);
        return "Name Error";
    }

}

// gets a token's decimals from Etherium call
function get_token_decimals(token_address) {
    // If Ether, return ETH decimals
    if (token_address === '0x0000000000000000000000000000000000000000') {
        return 18;
    }

    // Search tokens for addr to see if token address is already supported in FD config
    try {
    let addr_index = token_addresses.indexOf(token_address);
    if (addr_index !== -1) {
        return token_decimals[addr_index];
    }

    // If not supported, lookup decimals with web3 call

        let decimalsCall = {
            to: token_address,
            data: web3.sha3('decimals()').substring(0, 10)
        };
        // Parse returned hex into integer
        return parseInt(web3.eth.call(decimalsCall));
    } catch (err) {
        console.log("Error in migrate.js with function get_token_decimals");
        alert("Error fetching token decimals. Is the token ERC20 compliant?");
        return "0";
    }


}

// gets an individual token's balance with a web3 call
function get_token_balance(token_address, user) {
    // Check to see if balance is already retrieved through smart contract call
    try {
    if (balances[token_address] > 0) {
        return big_number_to_decimal(balances[token_address], get_token_decimals(token_address));
    }
        // grab balance from ED contract
        let big_number_str = ED.balanceOf(token_address, user)['c'];
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

// Change window state from outside of component (useful for when no user account or balances are present)
function change_window(state) {
    if (state == 1) {
        react_component.fetch_populated_balances();
    }
    react_component.setState({window: state});
}

function get_user_address() {
    return user_address;
}

function get_balances_options() {
    return balances_options;
}

function get_orders_options() {
    // TODO: Populate orders_options
    return orders_options;
}