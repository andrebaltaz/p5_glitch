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
let tempoMax;
let timeout;


function setup() {
  cleartime = 0;
  tempoMax=int(random(500, 1000));
  timeout=0;
  createCanvas(windowWidth, windowHeight);
 

  colorMode(HSB);
  background(360, 100, 100);
  mouseX = width / 2 + random(-width / 4, width / 4);
  mouseY = height / 2 + random(-height / 4, height / 4);
  
  
 

  mousePressed();
}

function draw() {
  
  // rotateX(frameCount*0.01);
  cleartime++;
  h = abs(sin(h_num)) * 30 + h_range;
  h_num += 0.1;
  easeMouseX += (mouseX - easeMouseX) * easing;
  easeMouseY += (mouseY - easeMouseY) * easing;

  for (let i = 0; i < slices; i++) {
    push();
    translate(width / 2, height / 2);
    rotate(radians((i * 360) / slices));
    drawLine();
     // textSize(48);

    pop();
  }

  if(timeout==0){
  if (prevMouseX != easeMouseX) {
    time = frameCount + 50;
  }
  prevMouseX = easeMouseX;
  prevMouseY = easeMouseY;

   if (mouseX > 0 && mouseX < width) {
    mouseX = mouseX + random(-15, 15);
    mouseY = mouseY + random(-15, 15);
  }else{
    mouseX = width-200;
    mouseY=height-200;
  }
  if (mouseY > 0 && mouseY < height) {
    mouseX = mouseX + random(-15, 15);
    mouseY = mouseY + random(-15, 15);
  }else{
    mouseX = width-200;
    mouseY=height-200;
  }
  }
  if (cleartime > tempoMax) {
   // cleartime = 0;
    timeout=1;
  //  prevMouseX =  easeMouseX =mouseX = width / 2 + random(-width / 4, width / 4);
  //  prevMouseY = easeMouseY = mouseY =height / 2 + random(-height / 4, height / 4);
    //background(0);
  }
  
   if (cleartime > tempoMax*2) {
   // cleartime = 0;
    
    setup();
  //  prevMouseX =  easeMouseX =mouseX = width / 2 + random(-width / 4, width / 4);
  //  prevMouseY = easeMouseY = mouseY =height / 2 + random(-height / 4, height / 4);
    //background(0);
  }
  
  fill(0);
  rect(29, 14, 110,15);
  fill(0, 0, 100,50);
  let textprint=tempoMax-cleartime;
  text('time  '+ mouseX, 30, 25);
  
}

function mousePressed() {
  cleartime = 0;
  slices = 15;//int(random(15, 55));
  h_range = random(0, 80);
  w_range = int(random(7) + 1);
  easeMouseX = prevMouseX = mouseX;
  easeMouseY = prevMouseY = mouseY;
  background(360, 0, 100);
  timeout=0;
}
function mouseMoved() {
  cleartime=cleartime-5;
   timeout=0;
}


function doubleClicked() {
  
}

function keyTyped() {
  if (key === 's') {
  save( "abaltazar_org_mandala #" + frameCount + ".jpg")
  // uncomment to prevent any default behavior
  // return false;
  }
  
  
}


function touchMoved() {
  return false;
}
function touchStarted() {
  slices = 1;//int(random(15, 55));
  h_range = random(0, 80);
  w_range = int(random(7) + 1);
  easeMouseX = prevMouseX = mouseX;
  easeMouseY = prevMouseY = mouseY;
  //ellipse(mouseX, mouseY, 50, 50);
  // prevent default
  cleartime=cleartime-5;
  background(0, 0, 0);
  timeout=0;
  return false;
}

function touchEnded() {
  return false;
}

function drawLine() {
  for (let i = 0; i < 5; i++) {
    if(timeout==0){
      stroke(h, h+70/cleartime, 50 + i * 13);
      let weight = dist(easeMouseX, easeMouseY, prevMouseX, prevMouseY);
      strokeWeight(weight / w_range);
    }
    
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
