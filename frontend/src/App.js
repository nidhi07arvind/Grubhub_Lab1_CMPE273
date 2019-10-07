import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
