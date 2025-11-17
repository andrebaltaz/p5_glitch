/*
 * @name Flocking
 * @description Demonstration of <a href="http://www.red3d.com/cwr/">Craig Reynolds' "Flocking" behavior</a>.<br>
 * (Rules: Cohesion, Separation, Alignment.)<br>
 * From <a href="http://natureofcode.com">natureofcode.com</a>.
 */
let boids = [];

let corR;
let corG;
let corB;
let corRT;
let nboids;
let gametime = 40000;

let globalalfa = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  corR = 0;
  corG = 0;
  corB = 0;
  background(0);
  nboids=5;
//  nboids = windowWidth / 15;
  // Add an initial set of boids into the system
  doboids();
}

function doboids() {
  for (let i = 0; i < nboids; i++) {
    boids[i] = new Boid(random(width), random(height));
  }
}

function draw() {
  // if (gametime - frameCount < 0) {
  //  gametime = gametime + 3000;
  //  background(1);
  //globalalfa=1;
  //doboids();
  // }

  if (frameCount > 1000) {
    noStroke();
    fill(0, 0, 0, 10); // preto com alfa baixo (10/255) → apaga devagar
    rect(0, 0, width, height);
  }
  // Run all the boids
  for (let i = 0; i < boids.length; i++) {
    boids[i].run(boids);
fill(255);       // cor do texto (branco)
noStroke();
textSize(20);    // tamanho da letra
text("Frame: " + frameCount, 20, 30); // posição x=20, y=30
    //background(5, 5, 0);
  }
}

// Boid class
// Methods for Separation, Cohesion, Alignment added
class Boid {
  constructor(x, y) {
    //print('The value of x is ');
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = random(2, 15);
    this.maxspeed = 1; // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
    this.colorR = random(23, 255);
    this.colorG = random(23, 255);
    this.colorB = random(230, 255);
    this.alfa = 2;
    this.maxtime = random(150, 300);
    this.tipo = int(random(0, 4));
    this.down = 0;
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  // Forces go into acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }

  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let sep = this.separate(boids); // Separation
    let ali = this.align(boids); // Alignment
    let coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }

  // Draw boid as a circle
  render() {
    //blendMode(LIGHTEST);
    //fill(corR, corG, corB)
    // fazer a cor rodar continuamente
this.colorR = (this.colorR + 1) % 256;  // passo 1
this.colorG = (this.colorG + 2) % 256;  // passo 2 (mais rápido)
this.colorB = (this.colorB + 3) % 256;  // passo 3 (ainda mais rápido)

corRT = color(this.colorR, this.colorG, this.colorB);

    corRT = color(this.colorR, this.colorG, this.colorB);
    strokeWeight(0.1);
    // stroke(1);

    if (this.maxtime - frameCount < 0 && this.down == 1) {
      this.maxtime += 10;
      //this.tipo = int(random(0, 4));
      if (this.r < 100) this.r++;
      if (this.alfa > 0) this.alfa--;
      if (this.alfa == 0) {
        this.maxtime += 2000;
        this.down = 0;
        this.r = 15;
      }
    }

    if (this.maxtime - frameCount < 0 && this.down == 0) {
      this.maxtime += 100;
      this.tipo = 1;
      if (this.alfa < 25) this.alfa=this.alfa+5;
      if (this.alfa == 255) {
        this.maxtime += 500;
        this.down = 1;
      }
    }

    // if(frameCount%100==0){
    // this.maxtime=this.maxtime*2;
    //  this.colorR--;
    //   this.colorG--;
    //  this.colorB--;
    //}
    // globalalfa=0;
    // if (this.alfa > 0) this.alfa = 0;
    // corRT.setAlpha(this.alfa);
    //  noStroke();
    // }
    corRT.setAlpha(this.alfa);
    fill(corRT);

    // if(frameCount % 5 == 0)
    // var raio=random(1, 20);
    //rect(this.position.x, this.position.y, this.r, this.r);
    if (this.tipo == 0) rect(this.position.x, this.position.y, this.r, this.r);
    else if (this.tipo == 1)
      ellipse(this.position.x, this.position.y, this.r, this.r);
    else if (this.tipo == 2)
      triangle(
        this.position.x,
        this.position.y,
        this.position.x + this.r,
        this.position.y + this.r,
        this.position.x + this.r,
        this.position.y - this.r
      );
    else if (this.tipo == 3) {
      // sphere(this.position.x, this.position.y, 16);
    }
    //
    //
  }

  // Wraparound
  borders() {
    /*
    //wrap no centro
    if (this.position.x < -this.r){ 
      this.r/=2;
      this.position.x = width/2 ;
      this.position.y = height;
    }
    if (this.position.y < -this.r){
      this.r/=2;
      this.position.x = width/2;
      this.position.y = height;
      
    } 
    if (this.position.x > width + this.r){
      this.r/=2;
      this.position.x = width/2;
      this.position.y = height;
      
    }
    if (this.position.y > height + this.r) {
      this.r/=2;
      this.position.x = width/2;
      this.position.y = height;
      
    }
    */
    //wrap original
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < desiredseparation) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
        //  boids[i].colorR=random(0,255);
        //boids[i].colorG=random(0,255);
        // boids[i].colorB=random(0,255);
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].velocity);
        count++;
     
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].position); // Add location

        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }
}

