//original work by kaoru
//http://www.velvet-number.com/

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

let Cdata;
let Ctime;

function setup() {
  cleartime = 0;
  tempoMax = 2023;
  timeout = 0;
  photo = createCanvas(windowWidth, windowHeight);

  graphics = createGraphics(windowWidth, windowHeight, WEBGL);
  graphics.clear();
  graphics.colorMode(HSB, 100);
  background(0, 0, 0);
  mouseX = width / 2 + random(-width / 5, width / 5);
  mouseY = height / 2 + random(-height / 5, height / 5);

  mousePressed();
}

function draw() {
  cleartime++;
  h = abs(sin(h_num)) * 30 + h_range;
  h_num += 0.1;
  easeMouseX += (mouseX - easeMouseX) * easing;
  easeMouseY += (mouseY - easeMouseY) * easing;
  image(graphics, 0, 0);
  // pop();
  for (let i = 0; i < slices; i++) {
    graphics.push();
    // graphics.translate(width / 2, height / 2);
    graphics.rotate(radians((i * 360) / slices));
    //graphics.rotate(0.001*frameCount);
    if (timeout == 0) drawLine();
    // textSize(48);

    graphics.pop();
  }

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

  if (cleartime > tempoMax + 50) {
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
  // if (timeout == 1) {
  //  fill(0, 0, 0, 0);
  //rect(width / 2 - 45, height / 5, 45, -15);

  //}
  var currentYear = year();
  var currentMonth = month();
  var currentDay = day();
  var currentHour = hour();
  var currentMinute = minute();
  var currentSecond = second();

  var currentDate =
    currentYear + "-" + nf(currentMonth, 2) + "-" + nf(currentDay, 2);
  var currentTime =
    currentHour + ":" + nf(currentMinute, 2) + ":" + nf(currentSecond, 2);

  Cdata = currentDate;
  Ctime = currentTime;
  //background(32);

  //fill(255);
  //noStroke();
  if(windowWidth>750){
  textSize(16);
  fill(10, 100, 100);
  text(currentDate, 40, 30);
  text(Ctime, 40, 45);
  text("mouse drag to draw", 40, 60);
  text("mouse press to clear", 40, 75);
  
    if(timeout==1)text("'s' to save your print", 40, 90);
  }  
}

function mousePressed() {
  nlines = random(3, 20);
  cleartime = 0;
  slices = int(random(5, 10));
  h_range = random(0, 80);
  w_range = int(random(7) + 1);
  easeMouseX = prevMouseX = mouseX;
  easeMouseY = prevMouseY = mouseY;
  graphics.background(0, 0, 0);
  timeout = 0;
}
function mouseMoved() {
  // cleartime = cleartime - 5;
  timeout = 0;
}
/*
function touchMoved() {
 // timeout = 0;
  return false;
  
}
function touchStarted() {
  nlines=random(3, 20);
  cleartime = 0;
  slices = int(random(5, 20));
  h_range = random(0, 80);
  w_range = int(random(7) + 1);
  easeMouseX = prevMouseX = mouseX;
  easeMouseY = prevMouseY = mouseY;
  graphics.background(0, 0, 0);
  timeout = 0;
  return false;
}

function touchEnded() {
  setup();
  return false;
}
*/
function drawLine() {
  for (let i = 0; i < nlines; i++) {
    if (timeout == 0) {
      graphics.stroke(h, h + 70 / cleartime, 50 + i * 13);
      let weight = dist(easeMouseX, easeMouseY, prevMouseX, prevMouseY);
      graphics.strokeWeight(weight / w_range);
    } else {
      // stroke(100, 100, 100);
      // let weight = dist(easeMouseX, easeMouseY, prevMouseX, prevMouseY);
      // strokeWeight(weight*50);
      // circle(easeMouseX-width/2, easeMouseY-height/2,10);
    }

    if (i % 1 == 0) {
      graphics.line(
        easeMouseX - width / 2 - i,
        easeMouseY - height / 2 - i,
        prevMouseX - width / 2 - i,
        prevMouseY - height / 2 - i
      );
    } else {
      graphics.line(
        easeMouseX - width / 2 + i,
        easeMouseY - height / 2 + i,
        prevMouseX - width / 2 + i,
        prevMouseY - height / 2 + i
      );
    }
  }
}
/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  graphics = createGraphics(windowWidth, windowHeight);
  graphics.clear();
  graphics.colorMode(HSB, 100);
  cleartime = 0;
  background(0, 0, 0);
  setup();
}

function keyTyped() {
  if (key === "s") {
    save(
      graphics,
      "@zatlab" + " EA_generative_artwork " + Cdata + " " + Ctime + ".jpg"
    );
  }
}
