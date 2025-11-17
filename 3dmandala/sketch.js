//original work by kaoru
//http://www.velvet-number.com/

var easycam;

let slices;
let nlines = 1;
let photo;
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
let tempoMax;
let timeout;
let textprint;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes("antialias", true);

  easycam = createEasyCam({ distance: 300 });

 
  
  cleartime = 0;
  tempoMax = 2023;
  timeout = 0;
 // photo = createCanvas(windowWidth, windowHeight);

  //graphics = createGraphics(windowWidth, windowHeight, WEBGL);
  // graphics.clear();
  //graphics.colorMode(HSB, 100);
 // background(0, 0, 0);
  mouseX = width / 2 + random(-width / 5, width / 5);
  mouseY = height / 2 + random(-height / 5, height / 5);

 // mousePressed();
  nlines = random(3, 20);
  cleartime = 0;
  slices = int(random(5, 10));
  h_range = random(0, 80);
  w_range = int(random(7) + 1);
  easeMouseX = prevMouseX = mouseX;
  easeMouseY = prevMouseY = mouseY;
  background(0, 0, 0);
  timeout = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0, 0, windowWidth, windowHeight]);
}

function draw() {
  perspective((60 * PI) / 180, width / height, 1, 5000);

    strokeWeight(0.5);
  stroke(0);
  
  push();
  translate(50, 50, 0);
  fill(255);
  box(50, 50, 25);
  
  
  
  cleartime++;
  h = abs(sin(h_num)) * 30 + h_range;
  h_num += 0.1;
  easeMouseX += (mouseX - easeMouseX) * easing;
  easeMouseY += (mouseY - easeMouseY) * easing;
  //image(graphics, 0, 0);
  // pop();
  for (let i = 0; i < 10; i++) {
    //push();
    // graphics.translate(width / 2, height / 2);
    rotateZ(radians((i * 360) / slices));
    //graphics.rotate(0.001*frameCount);
    if (timeout == 0) drawLine();
    // textSize(48);

    //pop();
  }
pop();
  if (prevMouseX != easeMouseX) {
    time = frameCount + 50;
  }
  prevMouseX = easeMouseX;
  prevMouseY = easeMouseY;

  if (mouseX > 0 && mouseX < width) {
    mouseX = mouseX + random(-10, 10);
    mouseY = mouseY + random(-10, 10);
  } else {
    mouseX = width - 200;
    mouseY = height - 200;
  }
  if (mouseY > 0 && mouseY < height) {
    mouseX = mouseX + random(-10, 10);
    mouseY = mouseY + random(-10, 10);
  } else {
    mouseX = width - 200;
    mouseY = height - 200;
  }

  if (cleartime > tempoMax) {
    // cleartime = 0;
    timeout = 1;
    //  prevMouseX =  easeMouseX =mouseX = width / 2 + random(-width / 4, width / 4);
    //  prevMouseY = easeMouseY = mouseY =height / 2 + random(-height / 4, height / 4);
    //background(0);
  }

  if (cleartime > tempoMax + 10) {
    // cleartime = 0;
    setup();
    //  prevMouseX =  easeMouseX =mouseX = width / 2 + random(-width / 4, width / 4);
    //  prevMouseY = easeMouseY = mouseY =height / 2 + random(-height / 4, height / 4);
    //background(0);
  }

  if (timeout == 0) {
    textprint = tempoMax - cleartime;
    //fill(100);
    //rect(width / 2 - 45,
    let bar = 100 / tempoMax;
    fill(100, 100, 100);
    // text("Drawing "+ cleartime +" of 2023 frames", width / 2 + width / 4, height - 125);

    //background(0);
    //graphics.fill(100, 100, 100);
    //graphics.text("@zatlab", width / 2 + width / 4, height - 100);
    //graphics.text(
    //"@escoladasartescatolica",
    //width / 2 + width / 4,
    //  height - 100
    //);
  }
  if (timeout == 1) {
    fill(0, 0, 0, 0);
    rect(width / 2 - 45, height / 5, 45, -15);

    fill(100, 100, 100);
    // text("Happy New Year!", width / 2 + width / 4, height - 145);
    //text("(press s to save your artwork)", width / 2 + width / 4, height - 125);
  }
}
/*
function mousePressed() {
  nlines = random(3, 20);
  cleartime = 0;
  slices = int(random(5, 10));
  h_range = random(0, 80);
  w_range = int(random(7) + 1);
  easeMouseX = prevMouseX = mouseX;
  easeMouseY = prevMouseY = mouseY;
  background(0, 0, 0);
  timeout = 0;
}
function mouseMoved() {
  // cleartime = cleartime - 5;
  timeout = 0;
}

function touchMoved() {
  return false;
}
function touchStarted() {
  nlines = random(3, 20);
  cleartime = 0;
  slices = int(random(5, 20));
  h_range = random(0, 80);
  w_range = int(random(7) + 1);
  easeMouseX = prevMouseX = mouseX;
  easeMouseY = prevMouseY = mouseY;
  background(0, 0, 0);
  timeout = 0;
  return false;
}

function touchEnded() {
  return false;
}
*/
function drawLine() {
  for (let i = 0; i < nlines; i++) {
    if (timeout == 0) {
      stroke(h, h + 70 / cleartime, 50 + i * 13);
      let weight = dist(easeMouseX, easeMouseY, prevMouseX, prevMouseY);
      strokeWeight(weight / w_range);
    } else {
      // stroke(100, 100, 100);
      // let weight = dist(easeMouseX, easeMouseY, prevMouseX, prevMouseY);
      // strokeWeight(weight*50);
      // circle(easeMouseX-width/2, easeMouseY-height/2,10);
    }

    if (i % 1 == 0) {
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
/* full screening will change the size of the canvas */

function keyTyped() {
  if (key === "s") {
    save(graphics, "zatlab_artwork.jpg");
  }
}
