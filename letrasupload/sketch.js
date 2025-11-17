/*let roman;

function preload(){
  
  roman=loadFont('https://cdn.glitch.global/0416fcb2-169f-4a66-963d-92152d1cb0ec/textlet.otf?v=1666262742834');
  
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
  textFont(roman);
  textSize(60);
}

function draw(){
  background(220);
  
  text("HI", width/2,height/2);
  
  
}*/

let fc = 250;
let num = 250;
let ballCollection;
let save = false;
let scal, theta;
let letter;
let font;
let l = "EA";
let mousestop = true;
let time;
let distance3;

function setup() {
  background(0);
  createCanvas(windowWidth, windowHeight);
  letter = createGraphics(windowWidth, windowHeight);
  font = loadFont('https://cdn.glitch.global/0416fcb2-169f-4a66-963d-92152d1cb0ec/textlet.otf?v=1666262742834');
  
  ballCollection = [];
  createStuff();
}

function draw() {
  background(0);

  for (let i = 0; i < ballCollection.length; i++) {
    ballCollection[i].run();
  }

  theta += 0.0523;

  if (save) {
    if (frameCount % 1 == 0 && frameCount < fc + 30) saveFrame("image-####.gif");
  }

  if (millis() - time < 3000) mousestop = false;
  else mousestop = true;
}

function keyPressed() {
  //if (key != CODED) l = str(key);
  //createStuff();
}

function mouseReleased() {
  //createStuff();
  //fc = frameCount;
  //save = true;
  //saveFrame("image-###.gif");
  //doit=false;
}

function mouseMoved() {
 time = millis();
}

function mouseDragged() {
  // time=millis();
}

function mousePressed() {
  // mousestop=true;
  // time=millis();
}

function createStuff() {
 ballCollection = [];
  
  letter.background(255);
  letter.fill(0);
  letter.textFont(font, width / 2);
  letter.textAlign(CENTER);
  letter.text(l, width / 2, height/2);
  letter.loadPixels();

  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    let c = letter.get(x, y);
    if (brightness(c) < 255) {
      let org = createVector(x, y);
      let radius = random(1, 4);
      let loc = createVector(org.x + radius, org.y);
      let offSet = random(TWO_PI);
      let dir = 1;
      let r = random(1);
      if (r > 0.5) dir = -1;
      let myBall = new Ball(org, loc, radius, dir, offSet);
      ballCollection.push(myBall);
      console.log("ball "+ ballCollection.lenght);
    }
  }
}

class Ball {
  constructor(_org, _loc, _radius, _dir, _offSet) {
    this.org = _org;
    this.loc = _loc;
    this.radius = _radius;
    this.dir = _dir;
    this.offSet = _offSet;
    this.sz = random(4, 12);
    this.a;
    this.s;
    this.countC;
    this.d = 20;
    this.connection = new Array(num).fill(false);
  }

  run() {
    this.display();
    this.move();
    this.lineBetween();
  }

  move() {
    if (mousestop == false) {
      let mouseloc = createVector(mouseX, mouseY);
      let center = createVector(width / 2, height / 2);
      distance3 = 1 / (mouseloc.dist(center) / 1000);
    } else if (distance3 < 4 && distance3 > 1) {
      distance3 = distance3 - 0.001;
    }

    this.loc.x = this.org.x + sin(theta * this.dir + this.offSet) * this.radius * distance3;
    this.loc.y = this.org.y + cos(theta * this.dir + this.offSet) * this.radius * distance3;
  }

  lineBetween() {
    this.countC = 1;

    for (let i = 0; i < ballCollection.length; i++) {
      let other = ballCollection[i];
      let distance = this.loc.dist(other.loc);
      if (distance > 0 && distance < this.d) {
        this.a = map(this.countC, 0, 10, 100, 255);
        stroke(255, this.a);
        strokeWeight(2);
        line(this.loc.x, this.loc.y, other.loc.x, other.loc.y);
        this.connection[i] = true;
      } else {
        this.connection[i] = false;
      }
    }

    for (let i = 0; i < ballCollection.length; i++) {
      if (this.connection[i]) this.countC++;
    }

    for (let i = 0; i < ballCollection.length; i += 600) {
      let mouseloc = createVector(mouseX, mouseY);
      let distance2 = this.loc.dist(mouseloc);
      if (distance2 > 0 && distance2 < 80) {
        stroke(255, this.a);
        strokeWeight(1);
        line(this.loc.x, this.loc.y, mouseloc.x, mouseloc.y);
      }
    }
  }

  display() {
    noStroke();
    fill(255, 255, 255, 200);
    ellipse(this.loc.x, this.loc.y, this.sz, this.sz);
  }
}
