import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

class DisplayItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Items: [],
      ItemDetails: [],
      res_id: "",
      isSelected: true,
      errorRedirect: false
    };

    //Bind

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    var data = {
      searchText: this.props.searchText
    };

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/search", data)
      .then(response => {
        if (response.status === 200) {
          console.log("Response:", response.data);
          this.setState({
            Items: response.data
          });

          /* var imageArr = [];
        for (let i = 0; i < this.state.Properties.length; i++) {
          axios
            .post(
              "http://localhost:3001/download-file/" +
                this.state.Properties[i].Photos.split(",")[0]
            )
            .then(response => {
              //console.log("Imgae Res : ", response);
              let imagePreview = "data:image/jpg;base64, " + response.data;
              imageArr.push(imagePreview);
              const propertyArr = this.state.Properties.slice();
              propertyArr[i].Photos = imagePreview;
              this.setState({
                Properties: propertyArr
              });
            })
            .catch(err => {
              if (err) {
                this.setState({
                  errorRedirect: true
                });
              }
            });
        }*/
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

    let itemDetails = this.state.Items.map(function(item, index) {
      return (
        <div className="container trip-details-container" key={index}>
          <Link to={"/restaurant-display/" + item.res_id}>
            <a href="/restaurant-display">Restaurant: {item.res_name}</a>
            <br></br>
          </Link>
          <Link to={"/cuisine-display/" + item.cuisine}>
            <a href="/cuisine-display">Cuisine: {item.cuisine}</a>
          </Link>
          <div className="trip-details-content border">
            <div className="trip-main-details blue-text">
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
              <div
                style={{
                  fontSize: 25,
                  color: "red",
                  fontFamily: "Cochin",
                  fontWeight: "bold"
                }}
              >
                Item Name: {item.item_name}
              </div>
              <div>Item Type : {item.item_id}</div>
              <div>Item Price: {item.price}$</div>
              <div>Item Description: {item.description}</div>
              <div>Cuisine: {item.cuisine}</div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Header />

        <div className="container">
          {redirectVar}
          <div className="form-group row search-tab container search-tab-display-property">
            {/*<span className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
              <input
                type="textbox"
                className="form-control form-control-lg"
                name="searchText"
                placeholder="Search"
                onChange={this.props.handleInputChange}
              ></input>
            </span>
            <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
              <button
                className="btn btn-primary btn-lg"
                style={{ width: "100%" }}
                onClick={this.props.searchClick}
              >
                Search
              </button>
    </span>*/}
          </div>
          <div className="property-listing-content">{itemDetails}</div>
          <div className="container center-content pad-top-20-pc">
            <div>
              Use of this Web site constitutes acceptance of the GrubHub.com
              Terms and conditions and Privacy policy.
            </div>
            <div>©2018 GrubHub. All rights reserved</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayItems;
