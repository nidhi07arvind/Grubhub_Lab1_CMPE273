import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      res_id: "",
      phone: "",
      aboutme: "",
      city: "",
      country: "",
      company: "",
      gender: "",
      profileimage: "",
      ProfileImagePreview: undefined,
      errorRedirect: false,
      isOwner: false
    };

    //Bind
    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3001/profile-details").then(response => {
      if (response.status === 200) {
        console.log(response.data);
        var data = response.data;
        this.setState({
          name: data.name,
          email: data.email,
          res_id: data.res_id,
          accounttype: data.accounttype,
          phone: data.phone,
          aboutme: data.aboutme,
          city: data.city,
          country: data.country,
          gender: data.gender,
          company: data.company,
          profileimage: data.profileimage
        });

        //Download Image
        // console.log("Profile Photo Name: ", data.profileimage);

        // //Download image
        // axios
        //   .post("http://localhost:3001/download-file/" + data.profileimage)
        //   .then(response => {
        //     let imagePreview = "data:image/jpg;base64, " + response.data;
        //     this.setState({
        //       ProfileImagePreview: imagePreview
        //     });
        //   });
      }
    });
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    // if (name === "profileimage") {
    //   console.log(target.files);
    //   var profilePhoto = target.files[0];
    //   var data = new FormData();
    //   data.append("photos", profilePhoto);
    //   axios.defaults.withCredentials = true;
    //   axios.post("http://localhost:3001/upload-file", data).then(response => {
    //     if (response.status === 200) {
    //       console.log("Profile Photo Name: ", profilePhoto.name);

    //       //Download image
    //       axios
    //         .post("http://localhost:3001/download-file/" + profilePhoto.name)
    //         .then(response => {
    //           let imagePreview = "data:image/jpg;base64, " + response.data;
    //           this.setState({
    //             profileimage: profilePhoto.name,
    //             ProfileImagePreview: imagePreview
    //           });
    //         })
    //         .catch(err => {
    //           if (err) {
    //             this.setState({
    //               errorRedirect: true
    //             });
    //           }
    //         });
    //     }
    //   });
    // } else {
    this.setState({
      [name]: value
    });
  };
  //};

  saveChanges = e => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      aboutme: this.state.aboutme,
      country: this.state.country,
      city: this.state.city,
      gender: this.state.gender,
      company: this.state.company,
      profileimage: this.state.profileimage
    };

    console.log("Data: ", data);
    axios
      .post("http://localhost:3001/update-profile", data)
      .then(response => {
        if (response.status === 200) {
          console.log("");
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
    let owner_tab = null;
    let redrirectVar = null;
    if (!cookie.load("cookie")) {
      redrirectVar = <Redirect to="/login" />;
    }

    if (this.state.errorRedirect === true) {
      redrirectVar = <Redirect to="/error" />;
    }

    //if (cookie.load("owner")) {
    if (this.state.accounttype === 2) {
      owner_tab = (
        <div className="form-group">
          <input
            type="text"
            name="res_id"
            id="res_id"
            className="form-control form-control-lg"
            placeholder="Restaurant ID"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </div>
      );
    }

    let profileImageData = (
      <img
        src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg"
        alt="logo"
      />
    );
    if (this.state.ProfileImagePreview) {
      profileImageData = (
        <img src={this.state.ProfileImagePreview} alt="logo" />
      );
    }
    return (
      <div>
        <Header />
        <div className="container">
          <h3>
            Hello! {this.state.name} {this.state.accounttype}
          </h3>
          <p></p>
        </div>
        <div className="container profile-content">
          <div className="row">
            <div className="col-8 border">
              <div className="headline-text">
                <h4>
                  <strong>Profile Information</strong>
                </h4>
              </div>
              <div className="profile-form-content">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control form-control-lg"
                    placeholder="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </div>
                <div>{owner_tab}</div>
                <div className="form-group">
                  <textarea
                    type="text"
                    name="aboutme"
                    id="aboutme"
                    className="form-control form-control-lg"
                    placeholder="About me"
                    onChange={this.handleChange}
                    value={this.state.aboutme}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control form-control-lg"
                    placeholder="Phone"
                    onChange={this.handleChange}
                    value={this.state.phone}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className="form-control form-control-lg"
                    placeholder="Country"
                    onChange={this.handleChange}
                    value={this.state.country}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="form-control form-control-lg"
                    placeholder="City"
                    onChange={this.handleChange}
                    value={this.state.city}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    className="form-control form-control-lg"
                    placeholder="Gender"
                    onChange={this.handleChange}
                    value={this.state.gender}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="form-control form-control-lg"
                    placeholder="Company"
                    onChange={this.handleChange}
                    value={this.state.company}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ProfileImage">
                    <strong>Profile Image : </strong>
                  </label>
                  <br />
                  <input
                    type="file"
                    name="profileimage"
                    id="profileimage"
                    className="btn btn-lg photo-upload-btn"
                    onChange={this.handleChange}
                    className="btn btn-lg photo-upload-btn"
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-lg btn-primary"
                    onClick={this.saveChanges}
                  >
                    Save Changes
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

export default Profile;
