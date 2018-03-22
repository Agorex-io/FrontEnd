import React from 'react';

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

export default BalancesWindow;