/**
 * Espirógrafo / Spirograph (Hypotrochoid)
 * Usa 3 parâmetros clássicos:
 *  R = raio do círculo fixo
 *  r = raio do círculo rolante
 *  d = distância do ponto ao centro do círculo rolante
 */

let RSlider, rSlider, dSlider, speedSlider;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  background(0);

  // UI
  RSlider = makeSlider("R (fixo)", 20, 400, 220, 1, 20);
  rSlider = makeSlider("r (rolante)", 5, 200, 80, 1, 60);
  dSlider = makeSlider("d (offset)", 0, 300, 120, 1, 100);
  speedSlider = makeSlider("velocidade", 0.1, 5, 1.0, 0.1, 140);

  stroke(255);
  noFill();
}

function draw() {
  // fade suave por frame (para ver o desenho a crescer)
  background(0, 10);

  translate(width / 2, height / 2);

  let R = RSlider.slider.value();
  let r = rSlider.slider.value();
  let d = dSlider.slider.value();
  let speed = speedSlider.slider.value();

  // Desenhar curva acumulada
  strokeWeight(1.2);
  beginShape();
  for (let a = 0; a < t; a += 0.01) {
    let p = spiroPoint(R, r, d, a);
    vertex(p.x, p.y);
  }
  endShape();

  // Ponto atual (cursor)
  let pNow = spiroPoint(R, r, d, t);
  noStroke();
  fill(255);
  circle(pNow.x, pNow.y, 5);

  // Avança o tempo
  t += 0.01 * speed;

  // Reset quando fecha o ciclo (aproximação)
  if (t > TWO_PI * lcm(R, r) / r) {
    t = 0;
    background(0);
  }

  drawLabels();
}

function spiroPoint(R, r, d, a) {
  // hypotrochoid:
  // x = (R - r) cos a + d cos((R - r)/r * a)
  // y = (R - r) sin a - d sin((R - r)/r * a)
  let k = (R - r) / r;

  let x = (R - r) * cos(a) + d * cos(k * a);
  let y = (R - r) * sin(a) - d * sin(k * a);

  return createVector(x, y);
}

/* ---------- UI helpers ---------- */

function makeSlider(label, min, max, val, step, y) {
  let container = createDiv("");
  container.position(20, y);
  container.style("color", "#ddd");
  container.style("font-family", "monospace");
  container.style("font-size", "12px");

  let lab = createSpan(label + " ");
  lab.parent(container);

  let s = createSlider(min, max, val, step);
  s.parent(container);
  s.style("width", "220px");

  let readout = createSpan(" " + val);
  readout.parent(container);

  return { container, label: lab, slider: s, readout };
}

function drawLabels() {
  let sliders = [RSlider, rSlider, dSlider, speedSlider];
  for (let obj of sliders) {
    obj.readout.html(" " + nf(obj.slider.value(), 1, 1));
  }
}

/* --- LCM approx for cycle reset --- */
function gcd(a, b) {
  a = floor(a); b = floor(b);
  while (b !== 0) {
    let tmp = b;
    b = a % b;
    a = tmp;
  }
  return a;
}
function lcm(a, b) {
  a = floor(a); b = floor(b);
  return abs(a * b) / gcd(a, b);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
