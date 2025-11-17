let suns = [];
let num_suns = 20;
let moons = [];
var angle = -90;
var moonsCount=0;
let pg;

let tempo=0;

//pg = new p5.Graphics(windowWidth, windowHeight, WEBGL);

function setup() {
  createCanvas(windowWidth, windowHeight);
  pg=createGraphics(windowWidth, windowHeight);
  for (let i = 0; i < num_suns; i++) {
    suns.push(new Sun(random(100, width), random(3, height)));
  }
  noStroke();
  fill(0);
 // pg.background(255);
  background(0);
  
 
 
}

function draw() {
  //background(175, 215, 255);
  // rotateY(frameCount * 0.01);
 //textSize(width/10);
  

// stroke(100); 
  fill(0);
  textSize(width/8);
  textAlign(CENTER,CENTER);
 // text('25 anos', width/2-width/10, height/2);

  for (let i = 0; i < suns.length; i++) {
    suns[i].display();
  }
  if(frameCount%10000==0 )
  {
    if( moonsCount<1000){
      moons.push( new Moon(random(0, width), random(3, height)));
      moonsCount++;
    }
      
  } if(frameCount%1==0)
  {
    tempo++;
   // suns.push(new Sun(random(100, width), random(3, height)));
      
  }
    
  for (let i = 0; i < moons.length; i++) {
    moons[i].display();
  }
}

function mousePressed() {
  tempo=0;
    fill(0);
  ellipse(mouseX, mouseY, width/5, width/5);
 // suns.push(new Sun(mouseX, mouseY));
 // moons.push(new Moon(mouseX, mouseY));
}
function mouseDragged() {
   fill(0);
  ellipse(mouseX, mouseY, width/5, width/5);
  // prevent default
  return false;
}

class Sun {
  constructor(x, y) {
    this.r = random(50, 950);
    this.x = x;
    this.y = y;
    this.newX = x;
    this.newY = y;
    this.speed = random(-15, 15)/10;
    this.angle = random(0,180);
    this.colorR=random()*256;
    this.colorG=random()*256;
    this.colorB=random()*256;
    this.lifetime=random(150,1000);
    //size of sun
    this.rad = random(1, 45);
    angleMode(DEGREES);
  }
  
  

  display() {
    if (frameCount % 1 == 0) {
      this.move();
    }
    
   
    //push();
    
    // translate(width/2,height/2);
    fill(this.colorR, this.colorG,this.colorB, this.lifetime);
     if(this.lifetime>0){
      this.lifetime--;
    this.r=this.r- 0.1;
     }
    
    this.pos = createVector(this.r* cos(this.angle), this.r * sin(this.angle));
    ellipse(this.x + this.pos.x,this.y + this.pos.y, this.rad * 2,this.rad * 2);
    //ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
   // pop();
    
    if(this.lifetime<tempo){
      this.r = random(50, 950);
      this.x = random(0, width);
      this.y = random(0, height);
      this.r = random(50, 950);
   
      this.speed = random(-15, 15)/10;
      this.angle = 0;
       this.rad = random(1, 45);
      this.colorR=random()*256;
      this.colorG=random()*256;
      this.colorB=random()*256;
      this.lifetime=random(150,1000);
    } 
    if (tempo>1000){
      this.colorR=this.coloR-5;
      this.colorG=this.coloG-5;
      this.colorB=this.coloB-5;
      //this.lifetime=random(6000,10000);
        this.rad = random(30, 45);
        
      }
      if(tempo>1450)
        tempo=0;
    
  }

  getx() {
    return this.x + this.pos.x;
  }

  gety() {
    return this.y + this.pos.y;
  }

  getrad() {
    return this.rad;
  }
  move() {
    if(abs(this.angle)<6660)
      
    this.angle += this.speed;
  }
  
}

class Moon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 4;
    this.loccount = 0; //for the lerp
    this.startspin = false;
    this.colorR=random()*256;
    this.colorG=random()*256;
    this.colorB=random()*256;
    this.lifetime=150;
    // calculate distance to each sun
    this.adj = [];
    this.opp = [];
    this.dist = [];
    for (let i = 0; i < num_suns; i++) {
      this.adj[i] = this.x - suns[i].getx();
      this.opp[i] = suns[i].gety() - this.y;
      this.dist[i] = sqrt(pow(this.adj[i], 2) + pow(this.opp[i], 2));
    }

    // for the closest sun, get the index and the distance
    this.closestsun_index = 0;
    this.closestsun_dist = 99999999;
    for (let i = 0; i < num_suns; i++) {
      if (this.dist[i] < this.closestsun_dist) {
        this.closestsun_index = i;
        this.closestsun_dist = this.dist[i];
      }
    }

    // get theta
    this.theta =
      atan2(this.opp[this.closestsun_index], this.adj[this.closestsun_index]) +
      PI / 2;
    // get the sun object
    this.sun = suns[this.closestsun_index];
    // get sun radius
    this.radmotion = this.sun.getrad() + 8;
    // calculate distance to sun
    this.distspin = this.closestsun_dist - this.radmotion;
    // calculate spin speed
    this.spinspeed = random(-0.04, 0.04);
  }

  display() {
     fill(this.colorR, this.colorG,this.colorB,this.lifetime);
    if(this.lifetime>0)
      this.lifetime--;
    if (!this.startspin) {
      this.locx = lerp(
        this.x,
        this.sun.getx(),
        this.loccount / this.closestsun_dist
      );
      this.locy = lerp(
        this.y,
        this.sun.gety(),
        this.loccount / this.closestsun_dist
      );
      ellipse(this.locx, this.locy, this.rad * 2, this.rad * 2);
      this.loccount += 1.6;
    } else {
      this.locx = this.sun.getx() + sin(this.theta) * this.radmotion;
      this.locy = this.sun.gety() + cos(this.theta) * this.radmotion;
      ellipse(this.locx, this.locy, this.rad * 2, this.rad * 2);
      this.theta += this.spinspeed;
    }
    if (this.loccount >= this.distspin) {
      this.startspin = true;
    }
  }
}
