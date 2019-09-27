import React, { Component } from "react";
import "./SignUp.css";
import axios from "axios";

//import { Redirect } from "react-router";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: null,
      Email: null,
      Password: null,
      RestaurantName: null,
      ZipCode: null,
      OwnerFlag: false
    };
    //Bind the handlers to this class
    this.NameChangeHandler = this.NameChangeHandler.bind(this);
    this.EmailChangeHandler = this.EmailChangeHandler.bind(this);
    this.PasswordChangeHandler = this.PasswordChangeHandler.bind(this);
    this.RestaurantNameChangeHandler = this.RestaurantNameChangeHandler.bind(
      this
    );
    this.ZipCodeChangeHandler = this.ZipCodeChangeHandler.bind(this);
    this.SignUp = this.SignUp.bind(this);
  }

  componentWillMount() {
    this.setState({
      OwnerFlag: false
    });
  }

  NameChangeHandler = e => {
    this.setState({
      Name: e.target.value
    });
  };

  EmailChangeHandler = e => {
    this.setState({
      Email: e.target.value
    });
  };

  PasswordChangeHandler = e => {
    this.setState({
      Password: e.target.value
    });
  };

  RestaurantNameChangeHandler = e => {
    this.setState({
      RestaurantName: e.target.value
    });
  };

  ZipCodeChangeHandler = e => {
    this.setState({
      ZipCode: e.target.value
    });
  };

  handleChangeOwnerFlag = e => {
    this.setState({
      OwnerFlag: e.target.checked
    });
  };

  SignUp = e => {
    e.preventDefault();
    var data = {
      Name: this.state.Name,
      Email: this.state.Email,
      Password: this.state.Password,
      RestaurantName: this.state.RestaurantName,
      ZipCode: this.state.ZipCode
    };

    axios.defaults.withCredentials = true;

    axios.post("http://localhost:3001/SignUp", data).then(response => {
      if (response.status === 200) {
        this.setState({
          UserCreated: true
        });
      } else {
        this.setState({
          UserCreated: false
        });
      }
    });
  };

  render() {
    //let redirectVar = null;
    return (
      <div id="login-box1">
        <div className="left">
          <h1>Sign up</h1>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            onChange={this.NameChangeHandler}
            autoFocus
          />
          <input
            type="text"
            name="RestaurantName"
            placeholder="Restaurant Name"
            onChange={this.RestaurantNameChangeHandler}
          />
          <input
            type="text"
            name="ZipCode"
            placeholder="Zip Code"
            onChange={this.ZipCodeChangeHandler}
          />
          <input
            type="text"
            name="Email"
            placeholder="Email"
            onChange={this.EmailChangeHandler}
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            onChange={this.PasswordChangeHandler}
          />
          <input
            type="password"
            name="Password2"
            placeholder="Retype password"
          />
          <input
            className="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            onChange={this.handleChangeStudentFlag}
            defaultChecked={false}
          />
          <label className="form-check-label" htmlFor="defaultCheck1">
            {" "}
            Owner?{" "}
          </label>

          <input
            type="submit"
            name="signup_submit"
            value="Sign me up"
            onClick={this.SignUp}
          />
        </div>

        <div className="right">
          <span className="loginwith">
            Sign in with
            <br />
            social network
          </span>

          <button className="social-signin facebook">
            Log in with facebook
          </button>
          <button className="social-signin twitter">Log in with Twitter</button>
          <button className="social-signin google">Log in with Google+</button>
        </div>
        <div className="or">OR</div>
      </div>
    );
  }
}

export default SignUp;
