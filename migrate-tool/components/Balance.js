import React from "react";

class Balance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: true
        }
    }

    handleCheckboxChange(event) {
        console.log("checkbox changed!", event);
        this.setState({isChecked: event.target.checked});
    }

    toggleIsChecked() {
        console.log("toggling isChecked value!");
        this.setState({isChecked: !this.state.isChecked});
    }

    render() {
        return (
            <input type="checkbox" onChange={this.handleCheckboxChange} checked={this.state.isChecked} />
        )
    }
}

export default Balance;