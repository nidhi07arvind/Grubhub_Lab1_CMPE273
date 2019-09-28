import React, { Component } from "react";
import Header from "../Header/Header";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";

class OwnerDashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemDetails: [],
      errorRedirect: false
    };
  }

  componentWillMount() {
    axios.defaults.withCredentials = true;

    axios
      .get("http://localhost:3001/owner-dashboard-details")
      .then(response => {
        if (response.status === 200) {
          console.log("Response : ", response.data);
          this.setState({
            items: response.data
          });

          var itemDetails = [];
          for (let i = 0; i < this.state.items.length; i++) {
            var data = {
              ItemId: this.state.items[i].item_id
            };

            axios
              .post("http://localhost:3001/item-details", data)
              .then(response => {
                if (response.status === 200) {
                  var itemDetail = response.data;
                  itemDetail["item_name"] = this.state.items[i].item_name;
                  itemDetail["description"] = this.state.items[i].description;
                  itemDetail["image"] = this.state.items[i].image;
                  itemDetail["price"] = this.state.items[i].price;
                  itemDetail["section"] = this.state.items[i].section;

                  itemDetails.push(itemDetail);
                  this.setState({
                    itemDetails: itemDetails
                  });
                  console.log("Item Details: ", this.state.itemDetails);
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
    /*if (!cookie.load('cookie')) {
            redrirectVar = <Redirect to="/login" />
        }
        if (this.state.errorRedirect === true) {
            redrirectVar = <Redirect to="/error" />
        }*/

    let itemDetails = this.state.itemDetails.map(function(item, index) {
      return (
        <div className="container trip-details-container" key={index}>
          <div className="trip-details-content border">
            <div className="trip-main-details blue-text">
              <h2>
                <strong>{item.Headline}</strong>
              </h2>
              <div>Item Section Type : {item.section}</div>
              <div>Name: {item.name}</div>
              <div>Description: {item.description}</div>
              <div>Image: {item.image}</div>
              <div>Price: {item.price} guests</div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="dashboard-container">
          <div className="center-content owner-dashboard-banner">
            <h1>Dashboard</h1>
            <h1>Items are:</h1>
          </div>
          <div>{itemDetails}</div>
        </div>
      </div>
    );
  }
}

export default OwnerDashboard;
