import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import './exchangeForm.css'
const { NEW_EXCHANGE } = Mutations

class ExchangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      start_date: '',
      ship_date: '',
      budget: 0
    };
  }
  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  handleSubmit(e, newExchange) {
    e.preventDefault();
    newExchange({
      variables: {
        name: this.state.name,
        start_date: this.state.start_date,
        ship_date: this.state.ship_date,
        budget: parseInt(this.state.budget),
        santa_assigned: this.state.santa_assigned
      }
    });
  }

  render() {
    let datePickerId = document.getElementById("StartDate")
    if (datePickerId){
      datePickerId.min = new Date().toISOString().split("T")[0];
    }
    return (
      <Mutation
        mutation={NEW_EXCHANGE}

        onError={err => this.setState({ message: err.message })}
        
        update={(cache, data) => this.updateCache(cache, data)}

        onCompleted={data => {
          const { name } = data.newExchange;
          this.setState({
            message: `New exchange ${name} created successfully`
          });
          this.props.history.push('/dashboard');
        }}
      >
        {(newExchange, { data }) => (
          <div className='FormDiv'>
            <form onSubmit={e => this.handleSubmit(e, newExchange)} className='FormArea'>
              <label htmlFor="name" >Exchange Name</label>
              <input
                onChange={this.update("name")}
                value={this.state.name}
                placeholder="Name"
                className='FormTextFeild'
                id='name'
              />
              <input
                onChange={this.update("start_date")}
                value={this.state.start_date}
                type="date"
                id="StartDate"
                className='FormDateFeild'
              />
              <input
                onChange={this.update("ship_date")}
                value={this.state.ship_date}
                type="date"
                id="datePickerId"
                className='FormDateFeild'
              />
              <input
                onChange={this.update("budget")}
                value={this.state.budget}
                type="number"
                min='0'
                className='FormTextFeild'
                />

              <button type="submit">Create Exchange</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default ExchangeForm;