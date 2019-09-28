import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      Address: "",
      // RestaurantName: "",
      // ZipCode: "",
      isOwner: false,
      errorRedirect: false
    };

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    axios.get("http://localhost:3001/profile").then(response => {
      if (response.status === 200) {
        console.log(response.data);
        var data = response.data;
        this.setState = {
          Name: data.Name,
          Email: data.Email,
          Password: data.Password,
          PhoneNumber: data.PhoneNumber,
          Address: data.Address
        };
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    const data = {
      Name: this.state.Name,
      Email: this.state.Email,
      Password: this.state.Password,
      PhoneNumber: this.state.PhoneNumber,
      Address: this.state.Address
    };
    console.log("Data:", data);
    axios
      .post("/update-profile", data)
      .then(response => {
        if (response.status === 200) {
          console.log("Inside update-profile POST");
        }
      })
      .catch(err => {
        this.setState({
          errorRedirect: true
        });
      });
  };

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;

      if (this.state.errorRedirect === true) {
        redirectVar = <Redirect to="/error" />;
      }

      return (
        <div className="container">
          <div className="form-test" style={{ width: 500, height: 500 }}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control form-control-lg"
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                id="address"
                className="form-control form-control-lg"
                placeholder="Address"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phonenumber"
                id="phonenumber"
                className="form-control form-control-lg"
                placeholder="Phone Number"
                required
              />
            </div>
            <div>
              <button
                className="btn btn-login col-lg-12 col-md-12 col-sm-12"
                onClick={this.handleSubmit}
              >
                Update{" "}
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
