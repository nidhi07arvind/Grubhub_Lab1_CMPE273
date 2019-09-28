import React, { Component } from "react";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import cookie from "react-cookies";
import { Redirect } from "react-router";
//import Header from "../Header/Header";
//import DisplayProperties from "../DisplayProperties/DisplayProperties";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let redrirectVar = null;
    /*if (!cookie.load("cookie")) {
      redrirectVar = <Redirect to="/login" />;
    }*/

    //if (this.props.isSearch) {
    //redrirectVar = <Redirect to="/display-properties" />;
    //}

    return (
      <div className="home-container">
        {redrirectVar}
        <div className="content">
          <div className="home-page-content">
            <div className="Hero-Image">
              <div className="jumbotron-content">
                <h1>
                  <div className="headline-text">
                    Order mexican, indian cuisines...
                  </div>
                  <div className="headline-text">and more...</div>
                </h1>
                <div className="form-group row search-tab">
                  <span className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
                    <input
                      type="textbox"
                      className="form-control form-control-lg"
                      name="searchText"
                      placeholder="Search"
                      onChange={this.props.handleInputChange}
                    ></input>
                  </span>

                  <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                    <input
                      type="textbox"
                      className="form-control form-control-lg"
                      name="guests"
                      placeholder="2 guests"
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
                  </span>
                </div>
              </div>

              <div className="home-page-list-content hidden-xs">
                <ul className="home-page-list">
                  <li className="value-props-item">
                    <strong className="value-props-title">
                      Find the best restaurants and cuisines in town!!
                    </strong>
                    <span className="value-props-content">
                      ..delivered to your doorstep...
                    </span>
                  </li>
                  <li className="value-props-item">
                    <strong className="value-props-title">
                      Order delivered in 30 minutes...
                    </strong>
                    <span className="value-props-content">
                      Have a nice day!!!
                    </span>
                  </li>
                </ul>
              </div>
              <div className="clear"></div>
            </div>
            <div className="recent-activity">
              <div className="jumbotron container recent-activity-content">
                <div className="container mt-3">
                  <h3>Recent Activity</h3>
                  <div
                    id="myCarousel"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <ul className="carousel-indicators">
                      <li
                        data-target="#myCarousel"
                        data-slide-to="0"
                        className="active"
                      ></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                      <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ul>
                    <div className="carousel-inner">
                      <div className="item active">
                        <img
                          className="carousel-img"
                          src={require("../../Static/Images/dessertback.jpg")}
                          alt="item-1"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          className="carousel-img"
                          src={require("../../Static/Images/pizza.jpg")}
                          alt="item-2"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          className="carousel-img"
                          src={require("../../Static/Images/dosa.jpg")}
                          alt="item-3"
                        />
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#myCarousel"
                      data-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#myCarousel"
                      data-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lyp-container h-100">
              <img
                src={require("../../Static/Images/pancakes.jpg")}
                alt="lyp-image"
              ></img>
              <div className="lyp-content center-content">
                <h1>List your Property</h1>
                <a href="/add-property" className="btn btn-success btn-lg">
                  List Your Property
                </a>
              </div>
            </div>

            <div className="jumbotron footer-container">
              <div className="external-links">
                <h4 className="external-links-headline-text">
                  Meet the HomeAway Family
                </h4>
                <a
                  href="https://www.homeaway.com/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  HomeAway
                </a>
                <div className="divider" />
                <a
                  href="https://www.vrbo.com/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  VRBO
                </a>
                <div className="divider" />
                <a
                  href="https://www.vacationrentals.com/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  VacationRentals.com
                </a>
                <div className="divider" />
                <a
                  href="https://www.homelidays.com/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  Homelidays
                </a>
                <div className="divider" />
                <a
                  href="http://www.toprural.com/"
                  target="_blank   "
                  className="btn btn-lg external-link-buttons"
                >
                  Toprural
                </a>
                <div className="divider" />
                <a
                  href="https://www.bookabach.co.nz/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  bookabach
                </a>
                <div className="divider" />
                <a
                  href="https://www.stayz.com.au/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  Stayz
                </a>
                <div className="divider" />
                <a
                  href="https://www.fewo-direkt.de/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  FeWo-direkt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
