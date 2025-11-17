var easycam;
var cnv;
let font;
let textString = 'Feels like Summer.';

var size;

function preload(){
  
  img = loadImage('https://cdn.glitch.global/a9d45bb7-0399-47e1-96d0-2814590dd3e9/2k_earth_daymap.jpeg?v=1696338828338');
  font = loadFont('https://cdn.glitch.global/0416fcb2-169f-4a66-963d-92152d1cb0ec/textlet.otf?v=1666262742834');
  
}


function setup() { 
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', true);
  
  easycam = createEasyCam({distance:300});
    easycam.setRotation([-0.06558126008011236, -0.0055834802578086954, -0.9818612443429126, 0.1778100670150725]);

   cnv = createGraphics(400, 400);
  cnv.background(img);
  noStroke();
  
  size=windowWidth/16;
  
} 


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
  easycam.rotation(100,0,0,0);
}


function draw(){
 
  // projection
  perspective(60 * PI/180, width/height, 1, 5000);
  
  // BG
  background(32);
  
  // objects
  strokeWeight(0.5);
  stroke(0);
  
  push();
  //translate(50, 50, 0);
  
  cnv.fill(255,random(5,210),random(5,20), random(50, 200));
  cnv.noStroke()
  cnv.circle(random(width), random(height), random(5, 20))
  
  fill(255);
  texture(cnv);
  // texture(img);
  
  rotateY(frameCount * 0.003);
  sphere(size,50);
 //easycam.setRotation(frameCount * 0.003,0,0,0);
  //box(150, 150, 150);
textFont(font);
  textSize(size/4);
  textAlign(CENTER);
  text(textString, 0, -size-10);
  pop();
  /*
  push();
  translate(-50, -50, 0);
  fill(255,0,128);
  box(50, 50, 25);
  pop();
  
  push();
  translate(+50, -50, 0);
  fill(0,128,255);
  box(50, 50, 25);
  pop();
  
  push();
  translate(-50, +50, 0);
  fill(255,255,0);
  box(50, 50, 25);
  pop();*/

}

function mousePressed(){
   cnv.background(img); 
   
}

function mouseReleased(){
   
    easycam.setRotation([-0.06558126008011236, -0.0055834802578086954, -0.9818612443429126, 0.1778100670150725]);

}