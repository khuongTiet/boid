import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Boids from "./Boids";

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: "100vh", width: "100vw" }}>
        <Boids population={5} />
      </div>
    );
  }
}

export default App;
