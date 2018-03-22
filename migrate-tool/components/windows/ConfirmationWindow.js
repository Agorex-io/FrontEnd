import React from "react";

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

export default ConfirmationWindow;