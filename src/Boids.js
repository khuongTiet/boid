import React, { Component } from "react";
import Boid from "./classes/Boid";

export default class BoidPlane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boids: [
        <Boid x={10} y={10} z={4} />,
        <Boid x={20} y={20} z={4} />,
        <Boid x={30} y={30} z={4} />,
        <Boid x={40} y={40} z={4} />
      ],
      windSpeed: 5
    };
  }

  findNeighbors(boid) {
    return this.state.boids.filter(possibleNeighbor => {
      return boid.distanceFrom(possibleNeighbor) < 10;
    });
  }

  render() {
    const { boids } = this.state;

    return (
      <div style={{ width: "600px", height: "600px" }}>
        {boids.map((boid, index) => {
          return boid;
        })}
      </div>
    );
  }
}
