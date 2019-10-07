import React, { Component } from "react";
//import ReactDOM from "react-router-dom";
import axios from "axios";
import cookie, { save } from "react-cookies";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import DisplayItems from "../DisplayItems/DisplayItems";
import { isString } from "util";
import { runInThisContext } from "vm";
import "bootstrap/dist/css/bootstrap.css";

class CuisineDisplay extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      itemDetails: [],
      errorRedirect: false
    };

    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    var data = {
      cuisine: this.props.match.params.id
    };
    console.log("Data:", data);
    axios
      .post("http://localhost:3001/cuisine-display", data)
      .then(response => {
        if (response.status === 200) {
          console.log("All items in cuisine:", response.data);
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

  saveChanges = item => e => {
    console.log(item);

    const data = item;

    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/addtocart", data)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
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

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.errorRedirect) {
      redirectVar = <Redirect to="/error" />;
    }
    console.log(this.state.items);
    let itemDetails = this.state.items.map(function(item, index) {
      return (
        <div
          class="card"
          style={{ width: "20rem", height: "20rem" }}
          key={index}
        >
          <img class="card-img-top" />
          <div class="card-body">
            <p class="card-text"></p>
            <div
              style={{
                fontSize: 25,
                color: "black",
                fontFamily: "Cochin",
                fontWeight: "bold"
              }}
            >
              Restaurant: {item.res_name}
            </div>
            <div>Item Type : {item.item_id}</div>
            <div>Item Name: {item.item_name}</div>
            <div>Price: {item.price}$</div>
            <div>Description: {item.description}</div>
            <div>Cuisine: {item.cuisine}</div>
            <br></br>

            <button onClick={this.saveChanges(item)}>Add to Cart</button>
          </div>
        </div>
      );
    }, this);

    return (
      <div>
        <Header />
        <div className="dashboard-container">
          <div className="center-content owner-dashboard-banner">
            <h1>Choose Items!</h1>
          </div>
        </div>

        <div>{itemDetails}</div>
      </div>
    );
  }
}

export default CuisineDisplay;
