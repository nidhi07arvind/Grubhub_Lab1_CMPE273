import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Signup from "./Signup/Signup";
import OwnerSignup from "./Signup/OwnerSignup";
import AddRestaurant from "./ListRestaurant/AddRestaurant";
import DisplayItems from "./DisplayItems/DisplayItems";
import RestaurantDisplay from "./DisplayItems/RestaurantDisplay";
import CuisineDisplay from "./DisplayItems/CuisineDisplay";
import AddItems from "./Items/AddItems";
import UpdateItems from "./Items/UpdateItems";
import Profile from "./Profile/Profile";
import OwnerOrders from "./MyOrders/OwnerOrders";
import Cart from "./MyOrders/Cart";
import OwnerDashboard from "./OwnerDashboard/OwnerDashboard";
import Breakfast from "./OwnerDashboard/Breakfast";
import Lunch from "./OwnerDashboard/Lunch";
import Dinner from "./OwnerDashboard/Dinner";
import Error from "./Error/Error";
import BuyerOrder from "./MyOrders/BuyerOrder";
import PastOrders from "./MyOrders/PastOrders";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      searchText: ""
    };

    this.handlesearchClick = this.handlesearchClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handlesearchClick = () => {
    this.setState({
      isSearch: true
    });
  };

  handleInputChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        {/** Render Different Components based on Route*/}
        <Route
          exact
          render={() => {
            return (
              <Home
                handleInputChange={this.handleInputChange}
                searchText={this.state.searchText}
                isSearch={this.state.isSearch}
                searchClick={this.handlesearchClick}
              />
            );
          }}
          path="/"
        />
        <Route
          render={() => {
            return (
              <Home
                handleInputChange={this.handleInputChange}
                searchText={this.state.searchText}
                isSearch={this.state.isSearch}
                searchClick={this.handlesearchClick}
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
              <DisplayItems
                handleInputChange={this.handleInputChange}
                searchText={this.state.searchText}
                isSearch={this.state.isSearch}
                searchClick={this.handlesearchClick}
              />
            );
          }}
          path="/display-items"
        />
        <Route path="/restaurant-display/:id" component={RestaurantDisplay} />
        <Route path="/profile-details" component={Profile} />
        <Route path="/update-item/:id" component={UpdateItems} />
        <Route path="/owner-dashboard" component={OwnerDashboard} />
        <Route path="/add-items" component={AddItems} />
        <Route path="/error" component={Error} />
        <Route path="/cart-details" component={Cart} />
        <Route path="/place-order" component={Cart} />
        <Route path="/owner-order-details" component={OwnerOrders} />
        <Route path="/breakfast-display" component={Breakfast} />
        <Route path="/lunch-display" component={Lunch} />
        <Route path="/dinner-display" component={Dinner} />
        <Route path="/buyer-order" component={BuyerOrder} />
        <Route path="/past-order" component={PastOrders} />
        <Route path="/cuisine-display/:id" component={CuisineDisplay} />
      </div>
    );
  }
}

export default Main;
