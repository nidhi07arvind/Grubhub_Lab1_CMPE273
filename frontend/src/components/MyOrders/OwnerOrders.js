import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { runInThisContext } from "vm";

class OwnerOrders extends Component {
  constructor() {
    super();
    this.state = {
      items: [{ order_id: "", res_id: "", email: "", status: "" }],
      itemDetails: [],
      errorRedirect: false
    };

    //Bind
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, order_id, status) => {
    let checkItems = this.state.items.map(item => {
      if (item.order_id == order_id) {
        item.status = e.target.value;

        this.setState({
          status: e.target.value
        });
        console.log(item.status);
      }
      return item;
    });

    console.log("Updated Orders", checkItems);
  };

  handleSubmit = e => {
    e.preventDefault;

    axios.defaults.withCredentials = true;

    const { data } = this.state.items[0].order_id;

    axios
      .post("http://localhost:3001/update-owner-order", this.state.items)
      .then(response => {
        if (response === 200) {
          console.log("Order Updated");
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            errorRedirect: true
          });
        }
      });
  };
  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/owner-order-details")
      .then(response => {
        if (response.status === 200) {
          console.log("Response:", response.data);
          var data = response.data;
          data = data.map(item => {
            this.setState({
              items: response.data,
              order_id: data.order_id,
              res_id: data.res_id,
              email: data.email,
              status: data.status
            });
            console.log(item.status);
          });
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            errorRedirect: true
          });
        }
      });
  }

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }

    if (this.state.errorRedirect === true) {
      redirectVar = <Redirect to="/error" />;
    }

    console.log(this.state.orders);
    let itemDetails = this.state.items.map(function(item, index) {
      return (
        <div className="container trip-details-container" key={index}>
          <div className="trip-details-content border">
            <div className="trip-main-details blue-text">
              <div>Order ID : {item.order_id}</div>

              <div>Restaurant: {item.res_id}</div>
              <div>
                Status:{console.log("status", item.status)}
                <input
                  type="text"
                  name="quantity"
                  onChange={e => {
                    this.handleChange(e, item.order_id, item.status);
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
      );
    }, this);

    return (
      <div>
        <Header />
        <div className="dashboard-container">
          <div className="center-content owner-dashboard-banner">
            <h1>Orders</h1>
            <button className="btn-btn-success" onClick={this.handleSubmit}>
              Place Order
            </button>
          </div>
        </div>
        <div>{itemDetails}</div>
      </div>
    );
  }
}

export default OwnerOrders;
