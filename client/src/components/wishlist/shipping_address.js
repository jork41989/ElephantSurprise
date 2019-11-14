import React, { Component } from 'react';
import Mutations from "../../graphql/mutations";
import { Mutation } from "react-apollo";
import "./shipping_address.css";
const { UPDATE_SHIPPING } = Mutations;

class ShippingAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shipping_address: "",
      display: "none"
    }

    this.openUpdate = this.openUpdate.bind(this);
    this.closeUpdate = this.closeUpdate.bind(this);
  }

  update(e) {
    this.setState({ shipping_address: e.target.value });
  }

  handleSubmit(e, updateShipping) {
    e.preventDefault();
    updateShipping({
      variables: {
        wish_list_id: this.props.wish_list_id,
        shipping_address: this.state.shipping_address
      }
    });
  }

  openUpdate() {
    this.setState({display: "block"});
  }

  closeUpdate() {
    this.setState({ display: "none" });
  }

  render() {
    return (
      <div className="shipping-main">
        <p>Shipping Address:</p>
        <p>{this.props.shipping_address}</p>
        <div>
          <button onClick={this.openUpdate}>Update Shipping Address</button>
          <Mutation 
            mutation={UPDATE_SHIPPING}
            onError={err => console.log(err.message)}
            onCompleted={data => {
              this.setState({ shipping_address: "" });
              this.setState({ display: "none" });
            }}
          >
            {(updateShipping) => (
              <div style={{ display: this.state.display }} className="shipping-form">
                <form onSubmit={e => this.handleSubmit(e, updateShipping)}>
                  <input
                    onChange={e => this.update(e)}
                    value={this.state.shipping_address}
                    placeholder="Shipping Address"
                  />
                  <button>Update Shipping Address</button>
                </form>
                <button onClick={this.closeUpdate}>Cancel</button>
              </div>
              
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default ShippingAddress;