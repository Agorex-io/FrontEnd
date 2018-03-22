import React from "react";

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

export default OrdersWindow;