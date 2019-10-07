import React, { Component } from "react";
import Header from "../Header/Header";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

class PastOrders extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemDetails: [],
      errorRedirect: false
    };

    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.defaults.withCredentials = true;

    axios
      .get("http://localhost:3001/past-order")
      .then(response => {
        if (response.status === 200) {
          console.log("Response : ", response.data);
          this.setState({
            items: response.data
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
    console.log(this.state.items);
    let itemDetails = this.state.items.map(function(item, index) {
      return (
        <div className="container trip-details-container" key={index}>
          <div className="trip-details-content border">
            <div className="trip-main-details blue-text">
              <div>Order ID : {item.order_id}</div>
              <div>Restaurant : {item.res_id}</div>
              <div
                style={{
                  fontSize: 25,
                  color: "green",
                  fontFamily: "Cochin",
                  fontWeight: "bold"
                }}
              >
                Status : {item.status}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Header />
        <div className="dashboard-container">
          <div className="center-content owner-dashboard-banner">
            <h1>Dashboard</h1>
          </div>
          <div>{itemDetails}</div>
        </div>
      </div>
    );
  }
}

export default PastOrders;
