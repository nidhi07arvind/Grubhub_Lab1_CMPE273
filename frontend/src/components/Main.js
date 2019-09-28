import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Signup from "./Signup/Signup";
import OwnerSignup from "./Signup/OwnerSignup";
import AddRestaurant from "./ListRestaurant/AddRestaurant";
import DisplayProperties from "./DisplayProperties/DisplayProperties";
import AddItems from "./Items/AddItems";
import UpdateItems from "./Items/UpdateItems";
//import PropertyDisplay from "./DisplayProperties/PropertyDisplay";
import Profile from "./Profile/Profile";
import MyOrders from "./MyOrders/MyOrders";
import OwnerDashboard from "./OwnerDashboard/OwnerDashboard";
import Error from "./Error/Error";
import moment from "moment";

class Main extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      searchStartDate: moment(),
      searchEndDate: moment(),
      searchText: "",
      guests: 2
    };

    this.handlesearchClick = this.handlesearchClick.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handlesearchClick = () => {
    this.setState({
      isSearch: true
    });
  };

  handleStartDateChange = date => {
    this.setState({
      searchStartDate: date
    });
  };

  handleEndDateChange = date => {
    this.setState({
      searchEndDate: date
    });
  };

  handleInputChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    });
  };*/

  render() {
    return (
      <div>
        {/** Render Different Components based on ROute*/}
        <Route
          exact
          render={() => {
            return (
              <Home
              /*handleInputChange={this.handleInputChange}
                searchText={this.state.searchText}
                handleEndDateChange={this.handleEndDateChange}
                endDate={this.state.searchEndDate}
                handleStartDateChange={this.handleStartDateChange}
                startDate={this.state.searchStartDate}
                isSearch={this.state.isSearch}
                searchClick={this.handlesearchClick}*/
              />
            );
          }}
          path="/"
        />
        <Route
          render={() => {
            return (
              <Home
              /*handleInputChange={this.handleInputChange}
                searchText={this.state.searchText}
                handleEndDateChange={this.handleEndDateChange}
                endDate={this.state.searchEndDate}
                handleStartDateChange={this.handleStartDateChange}
                startDate={this.state.searchStartDate}
                isSearch={this.state.isSearch}
                searchClick={this.handlesearchClick}*/
              />
            );
          }}
          path="/home"
        />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={Signup} />
        <Route path="/owner-sign-up" component={OwnerSignup} />
        <Route path="/add-property" component={AddRestaurant} />
        <Route
          render={() => {
            return (
              <DisplayProperties
                handleInputChange={this.handleInputChange}
                searchText={this.state.searchText}
                handleEndDateChange={this.handleEndDateChange}
                endDate={this.state.searchEndDate}
                handleStartDateChange={this.handleStartDateChange}
                startDate={this.state.searchStartDate}
                isSearch={this.state.isSearch}
                searchClick={this.handlesearchClick}
                guests={this.state.guests}
              />
            );
          }}
          path="/display-properties"
        />

        <Route path="/profile-details" component={Profile} />
        <Route path="/update-item" component={UpdateItems} />
        <Route path="/owner-dashboard" component={OwnerDashboard} />
        <Route path="/my-trips" component={MyOrders} />
        <Route path="/add-items" component={AddItems} />
        <Route path="/error" component={Error} />
      </div>
    );
  }
}

export default Main;
