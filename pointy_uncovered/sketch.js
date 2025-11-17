var boxSz = 700;
var numSpheres = 200;
var img;
var balls = [];
var theta = 0;

var t = 0.0;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  img = loadImage("big11.jpeg");
 
  
  // init random balls
  for (var i = 0; i < numSpheres; i++) {
    x = random(-boxSz, boxSz);
    y = random(-boxSz, boxSz);
    z = random(-boxSz, boxSz);

    balls[i] = new Ball(x, y, z);
  }
}

function draw() {
  background(5, 5, 0);
  //translate(0,0,-100);
  rotateY(frameCount * 0.01);
  //rotateZ(theta * mouseX * 0.01);
  //rotateX(theta * mouseX * 0.01);
  //rotateY(theta * mouseX * 0.01);

  //display
  for (var i = 0; i < balls.length; i++) {
    balls[i].display();
  }
  if (frameCount % 1 == 0) {
    balls[int(random(balls.length))].move();
  }
  if (frameCount % 5000 == 0) {
    for (var i = 0; i < balls.length; i++) {
      balls[i].move();
    }
  }

  // DRAW OUTLINE BOX
  stroke(15, 205, 100);
  //front
} // draw

function Ball(_x, _y, _z) {
  this.x = _x;
  this.y = _y;
  this.z = _z;
  this.newX = 0;
  this.newY = 0;
  this.newZ = 0;
   this.color = (random(100, 150), random(100, 150), random(100, 150));

  this.display = function () {
    push();
    translate(this.x, this.y, this.z);
   
    //line(this.x, this.y, this.z, 0,0,0)//, this.y,this.newY, this.zthis.newz);
    texture(img);
    //box(boxSz / 50);
    sphere(boxSz / 50, 16);
    pop();

    this.x = lerp(this.x, this.newX, 0.01);
    this.y = lerp(this.y, this.newY, 0.01);
    this.z = lerp(this.z, this.newZ, 0.01);
  };

  this.move = function () {
    this.newX = random(-boxSz, boxSz);
    this.newY = random(-boxSz, boxSz);
    this.newZ = random(-boxSz, boxSz);
  };
} // Ball

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
