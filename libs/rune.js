let f;
let path;
let polys;
let drawing = false;

function setup() {
  createCanvas(400, 400);
  background(0);
  stroke(255);

  // Set the font file
  f = new Rune.Font("Raleway-Black.ttf");

  // Load the font
  f.load(function(err){
    // Get path of the text (string, x, y, fontsize)
    path = f.toPath("Hello", 0, 0, 120)

    // Convert the path to polygons
    polys = path.toPolygons({ spacing: 5 })

    print(polys);

    // Loading is finished
    drawing = true;
  });
}

function draw() {
  background(0);

  if (drawing) {
    translate(40, height/2);

    // Loop through the points
    for (var i=0; i < polys.length ; i++){
      var poly = polys[i].state.vectors;

      for(var j = 0; j < poly.length; j++) {
        var pos = poly[j];

        circle(pos.x, pos.y, 2);
        line(pos.x, pos.y, mouseX, mouseY);
      }
    }
    // noLoop();
  }
}
