import React, { Component } from "react";

export default class Boid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x || Math.random(),
      y: props.y || Math.random(),
      z: props.z || Math.random() * 2 * Math.PI - Math.PI,
      size: props.size || 5
    };
  }

  update() {}

  distanceFrom(boid) {
    const { x, y } = this.state;
    return Math.sqrt(Math.pow(boid.x - x, 2) + Math.pow(boid.y - y, 2));
  }

  render() {
    return (
      <svg height="50" width="50">
        <polygon points="25, 10 10,40 40, 40" class="triangle" />
      </svg>
    );
  }
}
