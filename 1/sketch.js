var boids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 10; i++) {
    boids.push(new Boid());
  }
}

function draw() {
  background(255, 0, 0);
  for (var i = 0; i < boids.length; i++) {
    boids[i].update();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
