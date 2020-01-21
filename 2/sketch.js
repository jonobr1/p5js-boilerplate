
var dimensions = 400;
var message = 'Loading...';
var size = 20;
var lineHeight = size * 1.15;
var index = 0;
var offset = {
  x: 0,
  y: 0,
  amount: size / 10
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(size);
  getText('./message.txt', updateText);
}

function draw() {

  background(220);

  var titles = capitalize(message).split(/\s/);
  var x = 0;
  var y = size;

  var frame = frameCount % 60;
  var peak = sin(frame / 60 * PI);

  if (frame === 0) {
    index = floor(random(titles.length));
  }

  push();
  translate(width / 2, height / 2);
  rotate(- PI / 4);
  scale(1.25 * max(width, height) / dimensions);

  for (var i = 0; i < titles.length; i++) {

    var title = titles[i] + ' ';
    var w = textWidth(title);
    var a = offset.amount * peak;

    if (i === index) {
      offset.x = random(- a, a);
      offset.y = random(- a, a);
    } else {
      offset.x = 0;
      offset.y = 0;
    }

    text(
      title,
      x + offset.x - dimensions / 2,
      y + offset.y - dimensions / 2
    );

    if (x + w > dimensions) {
      x = 0;
      y += lineHeight;
    } else {
      x += w;

    }

  }

  pop();

}

function updateText(text) {
  message = text;
}

function capitalize(str) {
  var words = str.split(' ');
  var result = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var title = word;
    result.push(title);
  }
  return result.join(' ');
}

function getText(url, callback) {
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.onreadystatechange = function() {
    if (req.readyState === 4 && req.status === 200) {
      callback(req.responseText);
    }
  };
  req.send();
  return req;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
