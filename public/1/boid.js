class Boid {

  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.velocity = {
      x: random(- 10, 10),
      y: random(- 10, 10)
    }
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.x = mod(this.x, width);
    this.y = mod(this.y, height);
    circle(this.x, this.y, 40);
  }

}

function mod(v, l) {
  while (v < 0) {
    v += l;
  }
  return v % l;
}
