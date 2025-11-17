//original work by kaoru
//http://www.velvet-number.com/

let slices;

//color
let h = 0.0;
let h_range = 50;
let h_num = 0.0;

//mouse position
let easeMouseX;
let easeMouseY;
let prevMouseX;
let prevMouseY;
let easing = 0.09;
let time = 10;
let cleartime = 0;
//weight
let w_range;
let posX;
let posY;

let depth;

function setup() {
  cleartime = 100;
  createCanvas(windowWidth, windowHeight,WEBGL);
  colorMode(HSB, 100);
  background(0, 0, 0);
  mouseX = width / 2 + random(-width / 4, width / 4);
  mouseY = height / 2 + random(-height / 4, height / 4);
  depth=random(-4, 4);
  mousePressed();
}

function draw() {

 // translate(width/2, heigth/2);
   //rotateZ(frameCount*0.01);
  cleartime++;
  h = abs(sin(h_num)) * 30 + h_range;
  h_num += 0.1;
  easeMouseX += (mouseX - easeMouseX) * easing;
  easeMouseY += (mouseY - easeMouseY) * easing;

  for (let i = 0; i < slices; i++) {
    push();
    //translate(width / 2, height / 2);
    rotate(radians((i * 360) / slices));
    drawLine();
    pop();
  }

  if (prevMouseX != easeMouseX) {
    time = frameCount + 50;
  }
  prevMouseX = easeMouseX;
  prevMouseY = easeMouseY;

  if (mouseX > 0 && mouseX < width+50) {
    mouseX = mouseX + random(-25, 25);
    mouseY = mouseY + random(-25, 25);
  }else{
    mouseX = width/2+60;
    mouseY=height/2+60;
  }

  if (cleartime > 3000) {
    cleartime = 0;

    prevMouseX =
      easeMouseX =
      mouseX =
        width / 2 + random(-width / 4, width / 4);
    prevMouseY =
      easeMouseY =
      mouseY =
        height / 2 + random(-height / 4, height / 4);
    background(0);
  }
}

function mousePressed() {
  cleartime = 0;
  slices = int(random(5, 25));
  h_range = random(0, 80);
  w_range = int(random(7) + 1);
  easeMouseX = prevMouseX = mouseX;
  easeMouseY = prevMouseY = mouseY;
  background(0, 0, 0);
}

function touchMoved() {
  return false;
}
function touchStarted() {
  slices = int(random(15, 55));
  h_range = random(0, 80);
  w_range = int(random(7) + 1);
  easeMouseX = prevMouseX = mouseX;
  easeMouseY = prevMouseY = mouseY;
  //ellipse(mouseX, mouseY, 50, 50);
  // prevent default
  cleartime = 0;
  background(0, 0, 0);
  return false;
}

function touchEnded() {
  return false;
}

function drawLine() {
  for (let i = 0; i < 3; i++) {
    stroke(h, 255-h+70/cleartime, 255-50 + i * 13);
    let weight = dist(easeMouseX, easeMouseY, prevMouseX, prevMouseY);
    strokeWeight(weight / w_range);
    if (i % 2 == 0) {
      line(
        easeMouseX - width / 2 - i,
        easeMouseY - height / 2 - i,
        prevMouseX - width / 2 - i,
        prevMouseY - height / 2 - i
      );
    } else {
      line(
        easeMouseX - width / 2 + i,
        easeMouseY - height / 2 + i,
        prevMouseX - width / 2 + i,
        prevMouseY - height / 2 + i
      );
    }
  }
}
