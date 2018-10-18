export default class Vector {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
  }

  add = v => {
    return new Vector({ x: this.x + v.x, y: this.y + v.y });
  };

  distanceSquared = v => {
    return Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2);
  };

  distance = v => {
    return Math.sqrt(this.distanceSquared(v));
  };

  multiplyBy = s => {
    return new Vector({ x: this.x * s, y: this.y * s });
  };

  negative = v => {
    return new Vector({ x: -this.x, y: -this.y });
  };

  magnitude = () => {
    return this.distance(new Vector({ x: 0, y: 0 }));
  };

  normalize = () => {
    var magnitude = this.magnitude();

    if (magnitude === 0) {
      return new Vector({ x: 0, y: 0 });
    }

    return new Vector({ x: this.x / magnitude, y: this.y / magnitude });
  };

  subtract = v => {
    return this.add(v.negative());
  };

  divideBy = s => {
    return this.multiplyBy(1 / s);
  };

  limit = s => {
    if (this.magnitude() > s) {
      return this.normalize().multiplyBy(s);
    }
  };

  angle = () => {
    const { x, y } = this.normalize();
    return Math.atan2(y, x) + Math.PI / 2;
  };
}
