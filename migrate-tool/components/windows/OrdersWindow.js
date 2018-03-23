import React from "react";
import Order from '../Order'

class OrdersWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    populateBuyOrders() {
        return this.props.orders_buy_options.map((order, index) => {
            return (
                // TODO: Format what is shown in orders
                <Order
                    onChange={() => this.props.onOrderSelect(index)}
                    checked={order.is_selected}
                    key={order.id}
                    label={order.name + ":" + order.balance}/>
            )
        });
    }

    populateSellOrders() {
        return this.props.orders_sell_options.map((order, index) => {
            return (
                <Order
                    onChange={() => this.props.onOrderSelect(index)}
                    checked={order.is_selected}
                    key={order.id}
                    label={order.name + ":" + order.balance}/>
            )
        });
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
                            {/*TODO: Add loader using state variables*/}
                            <label htmlFor={'migrate-buy-orders'}>Buy Orders</label>
                            <ul id={'migrate-buy-orders'}>
                                {this.populateBuyOrders()}
                            </ul>
                            <label htmlFor={'migrate-sell-orders'}>Sell Orders</label>
                            <ul id={'migrate-buy-orders'}>
                                {this.populateSellOrders()}
                            </ul>
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