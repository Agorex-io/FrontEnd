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

// Parent React component that controls window state
class MigrationTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Initialize window to -3 (LoadingWindow)
            user_address: '',

            window: -3,

            balances_fetched: false,
            orders_fetched: false,

            balances_options: [], // Addresses of tokens with balances for multi-select
            balances_selected: [], // Addresses of tokens selected by user in multi-select

            tokens_added: [], // Token addresses manually added by users

            orders_options: [],
            orders_selected: []
        };
    };

    /* --- Navigate to next window -- */
    nextWindow(change_from, change_to) {
        // If window change_from is balances or orders, remember state of multiselect
        this.save_ms_state(change_from, change_to);
        this.load_ms_state(change_to);

        // Change to next window
        let current_window = this.state.window;
        if (current_window < 6) {
            current_window += 1;
            this.setState({
                window: current_window
            });
        }
    };

    /* --- Navigate to previous window -- */
    previousWindow(change_from, change_to) {
        // If window change_from is balances or orders, remember state of multiselect
        this.save_ms_state(change_from);
        this.load_ms_state(change_to);

        // Change to previous window
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
    add_token() {
        console.log("Fetching information about user entered-token not supported by FD.");
        // TODO: Fix sloppy practice of using jQuery to access react-rendered element
        // Get token address from element
        let address = $('#new-token-addr-input').val().toString();

        // Check that token isn't already being displayed
        let already_displayed = false;
        let existing_options = this.state.balances_options.concat(this.state.balances_selected);
        existing_options.forEach(function (existing_addr) {
            if (existing_addr === address) {
                alert("Token balance is already listed.");
                already_displayed = true;
            }
        });

        // Add token to selected and tokens_added in state for updating React component
        if (!already_displayed) {
            let new_tokens_added = this.state.tokens_added.concat(address);
            let new_balances_selected = this.state.balances_selected.concat(address);
            this.setState({
                balances_selected: new_balances_selected,
                tokens_added: new_tokens_added
            });
        }
    }

    update_orders() {
        // Check that balances are only fetched once
        if (!this.state.orders_fetched) {
            let temp_addresses = get_orders_options();
            this.setState({
                orders_options: temp_addresses,
                orders_fetched: true
            });
        }
    }

    /* --- Populates balances_options with fetched balances --- */
    update_balances() {
        // Check that balances are only fetched once
        if (!this.state.balances_fetched) {
            let temp_addresses = get_balances_options();
            this.setState({
                balances_options: temp_addresses,
                balances_fetched: true
            });
        }
    }

    /* --- Update or initialize balances multiselect --- */
    update_balances_ms() {
        $('#ED-migration-balances').multiselect({
                search: {
                    left: '<input type="text" name="ED-bal-search" class="form-control" placeholder="Search Ether Balances" />',
                    right: '<input type="text" name="FD-bal-search" class="form-control" placeholder="Search Fork Balances" />'
                },
                fireSearch: function (value) {
                    return value.length > 1;
                }
        });
    }

    /* --- Update or initialize orders multiselect --- */
    update_orders_ms() {
        $('#ED-migration-orders').multiselect({
            search: {
                left: '<input type="text" name="ED-bal-search" class="form-control" placeholder="Search Ether Orders" />',
                right: '<input type="text" name="FD-bal-search" class="form-control" placeholder="Search Fork Orders" />'
            },
            fireSearch: function (value) {
                return value.length > 1;
            }
        });
    }

    /* --- Get the option values in a given multiselect --- */
    get_ms_selected_values(ms_id) {
        let selected = [];
        $(ms_id + ' option').each(function () {
            selected.push($(this).val());
        });
        return selected;
    }

    save_ms_state(change_from) {
        // If window change_from is balances, save state of multiselect
        if (change_from === "balances") {
            let remaining_balances = this.get_ms_selected_values('#ED-migration-balances');
            let selected_balances = this.get_ms_selected_values('#ED-migration-balances_to');
            this.setState({
                balances_options: remaining_balances,
                balances_selected: selected_balances
            })
        }

        // If window change_from is orders, save state of multiselect
        if (change_from === "orders") {
            let remaining_orders = this.get_ms_selected_values('#ED-migration-orders');
            let selected_orders = this.get_ms_selected_values('#ED-migration-orders_to');
            this.setState({
                orders_options: remaining_orders,
                orders_selected: selected_orders
            });
        }
    }

    load_ms_state(change_to) {
        // If window change_from is balances, load state of multiselect
        if (change_to === "balances") {;
            this.update_balances_ms();
        }

        // If window change_from is orders, load state of multiselect
        if (change_to === "orders") {
            this.update_orders_ms();
        }
    }

    get_user_address() {
        let user_address_temp = get_user_address();
        this.setState({
            user_address: user_address_temp
        })
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
                                                 update_balances={() => this.update_balances()}
                                                 update_balances_ms={() => this.update_balances_ms()}/>;
                break;
            case 3:
                current_window = <AddBalanceWindow nextWindow={() => this.nextWindow('', 'orders')}
                                                   previousWindow={() => this.previousWindow('', 'balances')}
                                                   add_token={() => this.add_token()}
                                                   tokens_added={this.state.tokens_added}
                                                   user_address={this.state.user_address}/>;
                break;
            case 4:
                current_window = <OrdersWindow nextWindow={() => this.nextWindow("orders", '')}
                                               previousWindow={() => this.previousWindow("orders", '')}
                                               orders_options={this.state.balances_options}
                                               orders_selected={this.state.orders_selected}
                                               user_address={this.state.user_address}
                                               update_orders={() => this.update_orders()}
                                               update_orders_ms={() => this.update_orders_ms()}/>;
                break;
            case 5:
                current_window = <ConfirmationWindow nextWindow={() => this.nextWindow()}
                                                     previousWindow={() => this.previousWindow('', 'orders')}/>;
                break;
            case 6:
                current_window = <SuccessWindow closeWindow={() => this.closeWindow()}/>;
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

class LoadingWindow extends React.Component {
    render() {
        return (<div className="migration-loader">
            <i className="fa fa-spinner fa-pulse"></i>
        </div>)
    }
}

class NoAccountWindow extends React.Component {
    render() {
        return (
            <div className="modal-content">
                <div className="modal-header text-center">
                    <h2>Migration Tool</h2>
                    <p>From The EtherDelta's Smart Contract to the Improved ForkDelta Smart Contract </p>
                </div>
                <div className="modal-body text-center">
                    <p><strong> Please select an account to use the migration tool. </strong></p>
                    <br />
                    <button className="btn btn-default" onClick={this.props.closeWindow}>Close Tool</button>
                </div>
            </div>
        )
    }
}

class NoBalancesWindow extends React.Component {
    render() {
        return (
            <div className="modal-content">
                <div className="modal-header text-center">
                    <h2>Migration Tool</h2>
                    <p>From The EtherDelta's Smart Contract to the Improved ForkDelta Smart Contract </p>
                </div>
                <div className="modal-body text-center">
                    <p><strong> Your account has no balances on the old EtherDelta Smart Contract!</strong></p>
                    <p> Your selected account has no need of this migration tool. </p>
                    <p> If you'd like to check another account, return to ForkDelta and select a different account in the top-right. </p>
                    <br />
                    <button className="btn btn-default" onClick={this.props.closeWindow}>Return to ForkDelta</button>
                </div>
            </div>
        )
    }
}

class IntroductionWindow extends React.Component {
    constructor(props) {
        super(props);
        this.props.get_user_address();
    }
    render() {
        let user_addr = this.props.user_address;
        return (
            <div className="modal-content">
                <div className="modal-header text-center">
                    <h2>Migration Tool</h2>
                    <p>From The EtherDelta's Smart Contract to the Improved ForkDelta Smart Contract </p>
                </div>
                <div className="modal-body text-center">
                    <p>This tool is currently checking the following account address: {user_addr}</p>
                    <p><strong> * Describe the tool and why the transfer is needed here * </strong></p>
                    <br />
                    <button className="btn btn-default" onClick={this.props.nextWindow}>Proceed</button>
                </div>
            </div>
        )
    }
}

class BalancesWindow extends React.Component {
    constructor(props) {
        super(props);
        this.props.update_balances();
        this.props.update_balances_ms();
    }

    componentDidUpdate() {
        this.props.update_balances_ms();
    }

    render() {
        //Map balances to options
        let balances_options_selects = this.props.balances_options.map((token_addr) => {
            let name = get_token_symbol(token_addr).toString();
            let balance = get_token_balance(token_addr, this.props.user_address).toString();
            return (
                <option key={token_addr} value={token_addr}>{name + ":" + balance}</option>
            )
        });

        // Map selected balances to selected
        let balances_selected_selects = this.props.balances_selected.map((token_addr) => {
            let name = get_token_symbol(token_addr).toString();
            let balance = get_token_balance(token_addr, this.props.user_address).toString();
            return (
                <option key={token_addr} value={token_addr}>{name + ":" + balance}</option>
            )
        });

        return (
            <div className="modal-content">
                <div className="modal-header text-center">
                    <h2>Balances</h2>
                    <p>Currently on the EtherDelta Contract to be Transferred to the ForkDelta Contract </p>
                </div>
                <div className="modal-body text-center">
                    <div className="container migration-container">
                        <div className="row">
                            <div className="col-sm-5">
                                <label htmlFor="ED-migration-balances">Currently on ED Contract</label>
                                <select name="ED-bal-from[]" id="ED-migration-balances" className="form-control migrate-ms"
                                        size="8" multiple="multiple">{balances_options_selects}</select>
                            </div>
                            <div className="col-sm-2 ms-buttons">
                                <button type="button" id="ED-migration-balances_rightAll" className="btn btn-block"><i
                                    className="fa fa-angle-double-right"></i></button>
                                <button type="button" id="ED-migration-balances_rightSelected" className="btn btn-block"><i
                                    className="fa fa-angle-right"></i></button>
                                <button type="button" id="ED-migration-balances_leftSelected" className="btn btn-block"><i
                                    className="fa fa-angle-left"></i></button>
                                <button type="button" id="ED-migration-balances_leftAll" className="btn btn-block"><i
                                    className="fa fa-angle-double-left"></i></button>
                            </div>
                            <div className="col-sm-5">
                                <label htmlFor="ED-migration-balances_to">Pending Transfer To FD Contract</label>
                                <select name="ED-bal-to[]" id="ED-migration-balances_to" className="form-control migrate-ms"
                                        size="8" multiple="multiple">{balances_selected_selects}</select>
                            </div>
                        </div>
                    </div>
                    <br />
                    <button className="btn btn-default" onClick={this.props.previousWindow}>Previous (Introduction)</button>
                    <button className="btn btn-default" onClick={this.props.nextWindow}>Next (Add Token)</button>
                </div>
            </div>
        )
    }
}

class AddBalanceWindow extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.add_token();
    }

    mapAddedTokens() {
        // If no tokens, display "No Tokens Added"
        if (this.props.tokens_added.length < 1) {
            return (<li key={"None"} className="list-group-item">No Tokens Added</li>)
        }

        // Map added tokens to list items
        return this.props.tokens_added.map((token_addr) => {
            // If no added tokens, return list item showing none added
            let name = get_token_symbol(token_addr).toString();
            if (name === "Name Error") {
                name = "EnteredToken"
            }
            let balance = get_token_balance(token_addr, this.props.user_address).toString();
            return (
                <li key={token_addr} className="list-group-item">
                    <input value={token_addr} type="checkbox" defaultChecked/>{name + ":" + balance}
                </li>
            )
        });
    }

    render() {
        let tokens_added_list= this.mapAddedTokens();

        return (
            <div className="modal-content">
                <div className="modal-header text-center">
                    <h2>Missing A Balance?</h2>
                    <p>Add Tokens Not Listed With ForkDelta's Tokens</p>
                </div>
                <div className="modal-body text-center">
                    <form id="token-addr-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="new-token-addr-input">Token Address</label>
                            <input required size="42" pattern="^0x.{40}$" className="form-control"
                                   id="new-token-addr-input"
                                   placeholder="0x0000000000000000000000000000000000000000" />
                        </div>
                        <button type="submit" className="btn btn-default">Add token</button>
                    </form>
                    <h3> Added tokens </h3>
                    <ul className="list-group">
                        {/*TODO: Style tokens list*/}
                        {/*TODO: Loading icon on add new token*/}
                        {tokens_added_list}
                    </ul>
                    <br />
                    <button className="btn btn-default" onClick={this.props.previousWindow}>Previous (Balances)</button>
                    <button className="btn btn-default" onClick={this.props.nextWindow}>Next (Orders)</button>
                </div>
            </div>
        )
    }
}

class OrdersWindow extends React.Component {
    constructor(props) {
        super(props);
        this.props.update_orders();
        this.props.update_orders_ms();
    }

    componentDidUpdate() {
        this.props.update_orders_ms();
    }

    render() {
        return (
            <div className="modal-content">
                <div className="modal-header text-center">
                    <h2>Orders</h2>
                    <p>Currently on the EtherDelta Contract to be Transferred to the ForkDelta Contract </p>
                </div>
                <div className="modal-body text-center">
                    <div className="container migration-container">
                        <div className="row">
                            <Multiselect />
                        </div>
                    </div>
                    <br />
                    <button className="btn btn-default" onClick={this.props.previousWindow}>Previous (Add Token)</button>
                    <button className="btn btn-default" onClick={this.props.nextWindow}>Next (Confirmation)</button>
                </div>
            </div>
        )
    }
}

class ConfirmationWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    mapAllSelected() {
        // If no tokens, display "No Tokens Added"
        if (this.props.tokens_added.length < 1) {
            return (<li key={"None"} className="list-group-item">Nothing Selected for Migration...</li>)
        }

        // Map added tokens to list items
        return this.props.tokens_added.map((token_addr) => {
            // If no added tokens, return list item showing none added
            let name = get_token_symbol(token_addr).toString();
            if (name === "Name Error") {
                name = "EnteredToken"
            }
            let balance = get_token_balance(token_addr, this.props.user_address).toString();
            return (
                <li key={token_addr} className="list-group-item">
                    <input value={token_addr} type="checkbox" defaultChecked/>{name + ":" + balance}
                </li>
            )
        });
    }

    render() {
        let all_selected = this.all_selected
        return (
            <div className="modal-content">
                <div className="modal-header text-center">
                    <h2>Confirmation</h2>
                </div>
                <div className="modal-body text-center">
                    <p>If all the information is correct, begin </p>
                    <h3> Estimated Gas Cost </h3>
                    <h3> Added tokens </h3>
                    <ul className="list-group">
                        {/*TODO: Style list*/}
                        {all_selected}
                    </ul>
                    <br />
                    <button className="btn btn-default" onClick={this.props.previousWindow}>Previous (Orders)</button>
                    <button className="btn btn-default" onClick={this.props.nextWindow}>Begin Migration</button>
                </div>
            </div>
        )
    }
}

class SuccessWindow extends React.Component {
    render() {
        return (

            <div className="modal-content">
                <div className="modal-header text-center">
                    <h2>Progress</h2>
                    <p>You Can Close This Window and Check Your Progress At Any Time</p>
                </div>
                <div className="modal-body text-center">
                    <p> Progress </p>
                    <br />
                    <button className="btn btn-default" onClick={this.props.closeWindow}>Close Migration Tool</button>
                </div>
            </div>
        )
    }
}

// React component initialization for front-end of migration tool
var react_component = ReactDOM.render(<MigrationTool/>, document.getElementById('migrationTool'));


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

// -- init socket.io object for fetching orders --
// var FD = io("https://api.forkdelta.com/");
// FD.connect();
//
// FD.on('connect', function(data) { console.log('connected to FD api'); });
// FD.on('disconnect', function(data) { console.log('disconnected from FD api'); });
//
// var orders = {
//     	sells:[],
//     	buys:[]
// };

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
var user_address = '0xa83adca55ce5d0cc43ba16f4247ca65229a1bfb1';
// var user_address = '0x5902fcFA445E0E78Ab20C394a561292353610774';
// var user_address;

// call async function to load user address
var user_address_promise = fetch_user_addr();

// once user address loads, check for ED balances and run migration tool if any balances exist for account
user_address_promise.then(function (promised_user_addr) {

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
        // Change window to NoBalancesWindow
        change_window(-1);
    }
});

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
        balances_options.push(token_addr);
    });
}

//handle market responses from FD socket io
// FD.on('market', function(data) {
//     console.log('returned market');
//
//     if (data.hasOwnProperty('myOrders')) {
//
//         //add sell orders
//         if (data.myOrders.hasOwnProperty('sells')) {
//             data.myOrders.sells.forEach(function(val){
//                 orders.sells.push(val);
//             });
//         }
//
//         //add buy orders
//         if (data.myOrders.hasOwnProperty('buys')) {
//             data.myOrders.buys.forEach(function(val){
//                 orders.buys.push(val);
//             });
//         }
//
//     }
// });
//
// //send messages to FD socket io to see if there are any orders for every token from this user
// function get_orders(user, tokens) {
//     tokens.forEach(function(val){
//         FD.emit('getMarket', {token:val, user:user});
//     });
// }

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

// --- contract migration logic ---
function begin_migration() {
    console.log("Begin migration");
    console.log("Selected Balances:");
    console.log(balances_selected);
    console.log("Selected Orders:");
    console.log(orders_selected);
    if (balances_selected.length >= 1) {
        // TODO: logic to transfer balances from ED smart contract to FD contract
    }

    if (orders_selected.length >= 1) {
        // TODO: logic to transfer orders from ED smart contract to FD contract
    }
}

// Change window state from outside of component (useful for when no user account or balances are present)
function change_window(state) {
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