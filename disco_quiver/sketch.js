var d = 50;

// Create a new canvas to the browser size
function setup() {
  createCanvas(displayWidth, 700);
  //canvas.style.width= "100%";
  //canvas.style.height= "auto";
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(2048, 1024);
}

// Render loop that draws shapes with p5
function draw() {
  blendMode(BLEND);
  background("black");

  noStroke();
  fill("red");

  frameRate(3);
  for (let i = 0; i < 225; i++) {
    strokeWeight((i % 5) + 10);
    stroke(200, i, i);

    var angle0 = random(-i, i);
    var angle1 = random(-i, i);

    var d = random(700);
    var cx = width / random(5);
    var cy = height / random(5);

    line(
      cx + cos(angle0) * d,
      cy + sin(angle0) * d,
      cx + cos(angle1) * d,
      cy + sin(angle1) * d
    );
  }
  text("display is " + displayWidth, 30, 30);
}
