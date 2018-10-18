import React, { Component } from "react";
import Boid from "./classes/Boid";

const getRandomRange = (m, n) => {
  return Math.floor(Math.random() * (m - n + 1) + n);
};

export default class BoidPlane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boids: [],
      windSpeed: 5,
      seconds: 0
    };
  }

  findNeighbors(boid) {
    return this.state.boids.filter(possibleNeighbor => {
      return boid.distanceFrom(possibleNeighbor) < 10;
    });
  }

  updateAllBoids = boids => {
    return boids.map(boid => {
      return boid.update(boids, window.innerWidth, window.innerHeight);
    });
  };

  startSimulation = () => {
    this.setState(prevState => ({
      isSimulationRunning: !prevState.isSimulationRunning
    }));
  };

  createRandomBoids = ctx => {
    const { population } = this.props;

    return [...Array(population)].map((_, i) => {
      return new Boid({
        canvas: ctx,
        x: i % 2 === 0 ? getRandomRange(1000, 200) : getRandomRange(800, 600),
        y: i % 2 === 0 ? getRandomRange(1000, 200) : getRandomRange(800, 600)
      });
    });
  };

  drawBoid = (boid, ctx) => {
    const boidX = boid.position.x;
    const boidY = boid.position.y;
    const angle = boid.velocity.angle();

    ctx.save();
    ctx.translate(boidX, boidY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -2.5);
    ctx.lineTo(2.5, 5);
    ctx.lineTo(-2.5, 5);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

    ctx.fillStyle = boid.color;
    ctx.fill();
  };

  tick = () => {
    const { isSimulationRunning } = this.state;

    if (isSimulationRunning) {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
        boids: this.updateAllBoids(prevState.boids)
      }));
    }
  };

  componentDidMount = () => {
    this.interval = setInterval(() => this.tick(), 60);
    this.setState({
      boids: this.createRandomBoids(this.canvas.getContext("2d") || {})
    });
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { isSimulationRunning } = prevState;
    const ctx = this.canvas.getContext("2d");
    if (ctx && isSimulationRunning) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      prevState.boids.forEach(boid => {
        this.drawBoid(boid, ctx);
      });
    }
  };

  render() {
    const { boids } = this.state;

    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <div
          onClick={this.startSimulation}
          style={{
            background: "black",
            color: "white",
            width: "4rem"
          }}
        >
          Click to start flocking
        </div>
        <canvas
          ref={canvas => (this.canvas = canvas)}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    );
  }
}
