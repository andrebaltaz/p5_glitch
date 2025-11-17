let particles = [];
let numParticles = 450;
let maxSpeed = 4;
let maxForce = 0.1;
let avoidanceRadius = 50;
let letterCanvas;
let font;
let letterX, letterY;
let letterSize;
let mouseHoverRadius = 50; // Radius of the grey circle around the mouse
let maxR=20;
let minR=4;
let colorletter=1;


function preload() {
  font = loadFont("https://cdn.glitch.global/0416fcb2-169f-4a66-963d-92152d1cb0ec/textlet.otf?v=1666262742834");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  letterSize = min(width, height) / 2; // Adjust letter size to occupy 33% of the screen
  letterX = width / 2;
  letterY = height / 2;
  letterCanvas = createGraphics(width, height);
  letterCanvas.textFont(font, letterSize);
  letterCanvas.textAlign(CENTER, CENTER);
  letterCanvas.fill(colorletter);
  letterCanvas.text("C C D", letterX, letterY);
  maxR= letterSize/8;
  
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0);

  // Draw hollow letters
  image(letterCanvas, 0, 0);

  // Update and display particles
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
  
   noFill(); // Empty center
  stroke(255); // Grey stroke color
  ellipse(mouseX, mouseY, mouseHoverRadius);
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  letterSize = min(width, height) / 3; // Adjust letter size to occupy 33% of the screen
  letterX = width / 2;
  letterY = height / 2;
  letterCanvas = createGraphics(width, height);
  letterCanvas.textFont(font, letterSize);
  letterCanvas.textAlign(CENTER, CENTER);
  letterCanvas.fill(colorletter);
  letterCanvas.text("C C D", letterX, letterY);
}

function mouseMoved() {
  for (let particle of particles) {
    if (particle.caught) {
      let d = dist(mouseX, mouseY, particle.loc.x, particle.loc.y);
      if (d <  mouseHoverRadius) {
        particle.caught = false; // Release the caught particle
        particle.vel = p5.Vector.random2D().mult(random(1, maxSpeed)); // Give it a random velocity
      }
    }
  }
}

class Particle {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, maxSpeed)); // Random initial velocity
    this.acc = createVector(); // Start with no acceleration
    this.sz = random(minR, maxR);
    
    this.caught = false; // Indicates whether the particle has been caught by the letter
    this.color = color(random(70,250), random(160, 250), random(120, 250)); // Random color for the particle
    this.a = (100); // Alpha value for transparency
  }

  update() {
    // Add random acceleration
    if(this.caught==false){
    let randomForce = p5.Vector.random2D().mult(0.2);
    this.acc.add(randomForce);
  
    // Update velocity
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed); // Limit velocity magnitude to avoid excessive speed

    // Update position
    this.loc.add(this.vel);
}
    // Check if particle hits the edges of the canvas
    if (this.loc.x < 0 || this.loc.x > width) {
      this.vel.x *= -1; // Reverse velocity in x direction
      this.loc.x = constrain(this.loc.x, 0, width); // Ensure particle stays within canvas
    }
    if (this.loc.y < 0 || this.loc.y > height) {
      this.vel.y *= -1; // Reverse velocity in y direction
      this.loc.y = constrain(this.loc.y, 0, height); // Ensure particle stays within canvas
    }

    // Check if particle is touching the letter
    let touchingLetter = letterCanvas.get(this.loc.x, this.loc.y)[0] === colorletter;

    if (touchingLetter) {
      this.caught = true;
      this.vel.mult(0); // Stop the particle
    }

    // Reset acceleration
    this.acc.set(0, 0);
  }

  display() {
    noStroke();
    if (this.caught) {
      fill(this.color); // Use random color when caught
    } else {
       noFill(); 
      stroke(255); 
      //fill(this.a); // Use white with transparency when not caught
    }
    ellipse(this.loc.x, this.loc.y, this.sz, this.sz);
  }
}
