import React, { Component } from "react";
import Vector from "./Vector";

const getRandomWithin = n => {
  return Math.floor(Math.random() * Math.floor(n + 1));
};

const getRandomRange = (m, n) => {
  return Math.floor(Math.random() * (m - n + 1) + n);
};

export default class Boid {
  constructor(props) {
    this.color = "red";
    this.size = props.size || 5;
    this.velocity = new Vector({
      x: getRandomRange(10, 10),
      y: getRandomRange(10, 10)
    });
    this.position = new Vector({
      x: props.x || getRandomWithin(400),
      y: props.y || getRandomWithin(400)
    });
    this.id = getRandomRange(5000, 1);
  }

  distanceFrom(boid) {
    return this.position.distance(boid.position);
  }

  randomColor = () => {
    this.color = `rgb(${getRandomWithin(255)}, ${getRandomWithin(
      255
    )}, ${getRandomWithin(255)})`;
  };

  align = boids => {
    let a = new Vector({ x: 0, y: 0 });

    boids.forEach(boid => {
      if (this !== boid) {
        a = a.add(boid.velocity);
      }
    });

    a = a.divideBy(boids.length - 1);
    console.log(a.subtract(this.velocity).divideBy(8));
    return a.subtract(this.velocity).divideBy(8);
  };

  cohesion = boids => {
    let p = new Vector({ x: 0, y: 0 });

    boids.forEach(boid => {
      if (this !== boid) {
        if (this.distanceFrom(boid) < 12) {
          p = p.add(boid.position);
        }
      }
    });
    p = p.divideBy(boids.length - 1);
    const out = p.subtract(this.position);
    return out.divideBy(100);
  };

  separation = boids => {
    let c = new Vector({ x: 0, y: 0 });
    boids.forEach(boid => {
      if (this !== boid) {
        if (this.distanceFrom(boid) < 20) {
          c = c.subtract(boid.position.subtract(this.position));
        }
      }
    });

    return c;
  };

  bound = () => {
    let v = new Vector({ x: 0, y: 0 });
    if (this.position.x < 0) {
      v.x = 10;
    } else if (this.position.x > window.innerWidth) {
      v.x = -10;
    }
    if (this.position.y < 0) {
      v.y = 10;
    } else if (this.position.y > window.innerHeight) {
      v.y = -10;
    }

    return v;
  };

  update(boids, width, height) {
    const { x, y } = this.position;

    const a = this.align(boids);
    const c = this.cohesion(boids);
    const s = this.separation(boids);
    const b = this.bound();

    this.velocity = this.velocity
      .add(a)
      .add(c)
      .add(s)
      .add(b);

    this.position = this.position.add(this.velocity);

    return this;
  }
}
