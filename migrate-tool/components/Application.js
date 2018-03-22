import React from 'react';
import Balance from './Balance'
import BalancesWindow from './windows/BalancesWindow'
import ConfirmationWindow from './windows/ConfirmationWindow'
import IntroductionWindow from './windows/IntroductionWindow'
import LoadingWindow from './windows/LoadingWindow'
import NoAccountWindow from './windows/NoAccountWindow'
import NoBalancesWindow from './windows/NoBalancesWindow'
import OrdersWindow from './windows/OrdersWindow'
import SuccessWindow from './windows/SuccessWindow'
import AddBalancesWindow from './windows/AddBalancesWindow'

// Parent React component that controls window state
class Application extends React.Component {
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
                current_window = <AddBalancesWindow nextWindow={() => this.nextWindow('', 'orders')}
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

export default Application;