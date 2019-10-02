import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Header/Header";

class OwnerSignup extends Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      Email: "",
      Password: "",
      RestaurantName: "",
      ZipCode: "",
      isNewUserCreated: false,
      validationError: false,
      errorRedirect: false
    };

    //bind
    this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.restaurantNameChangeHandler = this.restaurantNameChangeHandler.bind(
      this
    );
    this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
    this.signup = this.signup.bind(this);
  }

  firstNameChangeHandler = e => {
    this.setState({
      FirstName: e.target.value
    });
  };

  emailChangeHandler = e => {
    this.setState({
      Email: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      Password: e.target.value
    });
  };

  restaurantNameChangeHandler = e => {
    this.setState({
      RestaurantName: e.target.value
    });
  };

  zipcodeChangeHandler = e => {
    this.setState({
      ZipCode: e.target.value
    });
  };

  signup = e => {
    var data = {
      FirstName: this.state.FirstName,
      Email: this.state.Email,
      Password: this.state.Password,
      RestaurantName: this.state.RestaurantName,
      ZipCode: this.state.ZipCode,
      Accounttype: 2
    };

    if (
      this.state.FirstName === "" ||
      this.state.Email === "" ||
      this.state.Password === "" ||
      this.state.RestaurantName === ""
    ) {
      this.setState({
        validationError: true
      });
    } else {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      axios
        .post("http://localhost:3001/ownersignup", data)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              isNewUserCreated: true
            });
          } else {
            this.setState({
              isNewUserCreated: false
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
  };

  render() {
    let redirectVar = null;
    if (this.state.isNewUserCreated === true) {
      redirectVar = <Redirect to="/login" />;
    }

    if (this.state.errorRedirect === true) {
      redirectVar = <Redirect to="/error" />;
    }

    let errorAlert = null;
    if (this.state.validationError) {
      errorAlert = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Error!</strong> Fill all the fields to proceed!
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <div className="container fill-graywhite">
          {redirectVar}
          <div className="container content">
            <div className="login-container">
              <div>
                <p>Sign up for GrubHub</p>
                <p>
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>
              <div className="login-form-container col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3 border">
                <div>{errorAlert}</div>
                <div className="form-group login-form-control pad-top-20">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-control form-control-lg"
                    placeholder="First Name"
                    onChange={this.firstNameChangeHandler}
                    required
                  />
                </div>
                <div className="form-group login-form-control">
                  <input
                    type="text"
                    name="restaurantname"
                    id="restaurantname"
                    className="form-control form-control-lg"
                    placeholder="Restaurant Name"
                    onChange={this.restaurantNameChangeHandler}
                    required
                  />
                </div>
                <div className="form-group login-form-control">
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    className="form-control form-control-lg"
                    placeholder="ZipCode"
                    onChange={this.zipcodeChangeHandler}
                    required
                  />
                </div>

                <div className="form-group login-form-control">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    onChange={this.emailChangeHandler}
                    required
                  />
                </div>
                <div className="form-group login-form-control">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={this.passwordChangeHandler}
                    required
                  />
                </div>
                <div className="form-group login-form-control">
                  <button
                    className="btn btn-login col-lg-12 col-md-12 col-sm-12"
                    onClick={this.signup}
                  >
                    Sign me up{" "}
                  </button>
                </div>
                <hr />
                <div className="form-group login-form-control">
                  <button className="btn fb-btn col-lg-12 col-md-12 col-sm-12">
                    <img
                      className="fb-logo flt-left"
                      src={require("../../Static/Images/fb.png")}
                      alt="fb-logo"
                    ></img>
                    Log in with Facebook
                  </button>
                </div>
                <div className="form-group login-form-control">
                  <button className="btn google-btn col-lg-12 col-md-12 col-sm-12">
                    <span>
                      <img
                        className="google-logo flt-left"
                        src={require("../../Static/Images/google.jpg")}
                        alt="google-logo"
                      ></img>
                    </span>
                    Log in with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerSignup;
