import React, { Component } from "react";
import Header from "../Header/Header";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

class Breakfast extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemDetails: [],
      errorRedirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.defaults.withCredentials = true;

    axios
      .get("http://localhost:3001/breakfast-details")
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

  handleChange = e => {};

  handleSubmit = e => {
    function myFunction() {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
    /*var data = {
      section: "Lunch"
    };
    console.log("Data:", data);
    axios
      .post("http://localhost:3001/owner-dashboard", data)
      .then(response => {
        if (response.status === 200) {
          console.log("All items in restaurant:", response.data);
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
      });*/
  };
  // };

  render() {
    let redrirectVar = null;
    if (!cookie.load("cookie")) {
      redrirectVar = <Redirect to="/login" />;
    }
    if (this.state.errorRedirect === true) {
      redrirectVar = <Redirect to="/error" />;
    }
    console.log(this.state.items);
    let itemDetails = this.state.items.map(function(item, index) {
      return (
        <div className="container trip-details-container" key={index}>
          <div className="trip-details-content border">
            <div className="trip-main-details blue-text">
              <div>Item Type : {item.item_id}</div>
              <div>{item.item_name}</div>
              <div>{item.price}</div>
              <div>{item.description}</div>
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
            <h1>Breakfast Items!</h1>
          </div>
          <div>{itemDetails}</div>
        </div>
      </div>
    );
  }
}

export default Breakfast;
