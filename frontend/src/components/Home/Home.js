import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import DisplayItems from "../DisplayItems/DisplayItems";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }

    if (this.props.isSearch) {
      redirectVar = <Redirect to="/display-items" />;
    }

    return (
      <div className="home-container">
        <Header />
        {redirectVar}
        <div className="content">
          <div className="home-page-content">
            <div className="Hero-Image">
              <div className="jumbotron-content">
                <h1>
                  <div
                    className="headline-text"
                    style={{ fontSize: 50, color: "black" }}
                  >
                    Order mexican, indian cuisines...
                  </div>
                  <div
                    className="headline-text"
                    style={{ fontSize: 50, color: "black" }}
                  >
                    and more...
                  </div>
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

              <div className="home-page-list-content hidden-xs"></div>
              <div className="clear"></div>
            </div>
            <div className="recent-activity">
              <div className="jumbotron container recent-activity-content">
                <div className="container mt-3">
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
            </div>

            <div className="jumbotron footer-container">
              <div className="external-links">
                <h4
                  className="external-links-headline-text"
                  style={{ fontSize: 30, color: "black" }}
                >
                  Meet the Grubhub Family
                </h4>
                <a
                  href="https://www.homeaway.com/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  Grubhub
                </a>
                <div className="divider" />
                <a
                  href="https://www.vrbo.com/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  Gift Cards
                </a>
                <div className="divider" />
                <a
                  href="https://www.vacationrentals.com/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  Browse by cities
                </a>
                <div className="divider" />
                <a
                  href="https://www.homelidays.com/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  Browse by cuisine
                </a>
                <div className="divider" />
                <a
                  href="http://www.toprural.com/"
                  target="_blank   "
                  className="btn btn-lg external-link-buttons"
                >
                  Browse by restaurants
                </a>
                <div className="divider" />
                <a
                  href="https://www.bookabach.co.nz/"
                  target="_blank"
                  className="btn btn-lg external-link-buttons"
                >
                  Premium Membership
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
