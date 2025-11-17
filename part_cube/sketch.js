let angleX = 0;
let angleY = 0;
let angleZ = 0;
let stop = 0;
let ca;
let cb;
let cc;

let number = 500;

let paintback = 0;
 let d=50;
let corner;
let zoom=20;
let s = 3;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //if(windowWidth<400){
    mouseX=width/4;
    mouseY=height/2;
    
    
 // }
  noStroke();
  smooth();
 // d=random(50,60);
}

function mouseMoved() {
  angleX = map(mouseY, 0, height, -PI, PI);
  angleY = map(mouseX, 0, width, -PI, PI);
  stop = 1;
 // number = map(mouseY, 0, height / 2, 50, 400);
}

function mousePressed() {
  paintback = 1;
  console.log(d); 
}

function mouseDragged() {
  angleX = map(mouseY, 0, height, -PI, PI);
  angleY = map(mouseX, 0, width, -PI, PI);
  stop = 1;
 // number = map(mouseY, width/2, height / 2, 50, 400);
}

function mouseReleased() {
  paintback = 0;
}

function touchMoved() {
  angleX = map(mouseY, 0, height, -PI, PI);
  angleY = map(mouseX, 0, width, -PI, PI);
  stop = 1;
  return false;
}
function touchStarted() {
 paintback = 1;
  return false;
}

function touchEnded() {
   paintback = 0;
  return false;
}

function draw() {
  
  //if(frameCount%10==0){
    
    console.log("mouseX "+ mouseX);
      console.log("mouseY "+ mouseY);
    console.log("d " + d); 
    
  //}
  if (paintback == 0) background(0);
  stop = 0;
  // Mouse-controlled rotation
  
  //ngleZ=0.01;
  // Zoom based on distance from center of screen
   d = dist(mouseX, mouseY, width / 2, height / 2);
   corner= dist(0,0,width/2, height/2);
  zoom = map(d, 0, corner, -700, 600);
 number = map(d, 0, corner, 250, 3);
  translate(0, 0, zoom);

  // 3D fractal
  rotateX(angleX);
  rotateY(angleY);
  rotateZ(angleZ);
  for (let x = -s; x <= s; x++) {
    for (let y = -s; y <= s; y++) {
      for (let z = -s; z <= s; z++) {
        let a = map(x, -s, s, -PI, PI);
        let b = map(y, -s, s, -PI, PI);
        let c = map(z, -s, s, -PI, PI);
        let n = 0;
        //if(frameCount%100==0){
        // ca = random (11, 210);
        // cb = random (11, 210);
        // cc = random (11, 210);
        //}
        let x0 = a;
        let y0 = b;
        let z0 = c;
        while (n < 50) {
          let x1 = sin(y0 * z0) * cos(x0) + 0.5;
          let y1 = sin(z0 * x0) * cos(y0) + 0.5;
          let z1 = sin(x0 * y0) * cos(z0) + 0.5;
          let d = dist(x0, y0, z0, x1, y1, z1);
          if (d < 1) {
            ca = map(x, -s, s, 0, 255);
            cb = map(y, -s, s, 0, 255);
            cc = map(z, -s, s, 0, 255);
            break;
          }
          x0 = x1;
          y0 = y1;
          z0 = z1;
          n++;
        }
        fill(ca, cb, cc);
        push();
        translate(x * number, y * number, z * number);
        sphere(25, 8, 16);
        pop();
      }
    }
  }
  if (stop == 0) {
    angleZ += 0.003;
    angleX += 0.003;
    angleY += 0.003;
  }
}
