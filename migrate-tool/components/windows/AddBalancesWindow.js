import React from "react";

class AddBalancesWindow extends React.Component {
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

export default AddBalancesWindow;