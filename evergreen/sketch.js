/**
 * Espirógrafo (Hypotrochoid)
 * - Desenho persistente (buffer pg)
 * - Ajuste automático ao tamanho da janela
 * - Sliders RGB
 */

let RSlider, rSlider, dSlider, speedSlider;
let rColorSlider, gColorSlider, bColorSlider;
let t = 0;
let pg; // buffer persistente

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  background(0);

  // buffer onde fica o desenho
  pg = createGraphics(windowWidth, windowHeight);
  pg.pixelDensity(2);
  pg.background(0);

  // UI
  RSlider = makeSlider("R (fixo)", 20, 400, 220, 1, 20);
  rSlider = makeSlider("r (rolante)", 5, 200, 80, 1, 60);
  dSlider = makeSlider("d (offset)", 0, 300, 120, 1, 100);
  speedSlider = makeSlider("velocidade", 0.1, 5, 1.0, 0.1, 140);

  // Sliders RGB
  rColorSlider = makeSlider("R cor", 0, 255, 255, 1, 200);
  gColorSlider = makeSlider("G cor", 0, 255, 255, 1, 240);
  bColorSlider = makeSlider("B cor", 0, 255, 255, 1, 280);
}

function draw() {
  // mostrar o buffer
  image(pg, 0, 0);

  let R = RSlider.slider.value();
  let r = rSlider.slider.value();
  let d = dSlider.slider.value();
  let speed = speedSlider.slider.value();

  let colR = rColorSlider.slider.value();
  let colG = gColorSlider.slider.value();
  let colB = bColorSlider.slider.value();

  // ---- AUTO-SCALE PARA A JANELA ----
  // raio máximo da trajetória
  let maxRadius = abs(R - r) + d;
  // raio máximo possível na janela
  let windowRadius = min(width, height) * 0.45;
  // fator de escala
  let scaleFactor = windowRadius / maxRadius;

  // desenhar no buffer
  pg.push();
  pg.translate(pg.width / 2, pg.height / 2);
  pg.scale(scaleFactor);

  pg.noFill();
  pg.stroke(colR, colG, colB);
  pg.strokeWeight(1);

  // desenhar segmento pequeno a cada frame
  let pPrev = spiroPoint(R, r, d, t);
  let pNow  = spiroPoint(R, r, d, t + 0.01);

  pg.line(pPrev.x, pPrev.y, pNow.x, pNow.y);

  pg.pop();

  t += 0.01 * speed;

  drawLabels();
}

function spiroPoint(R, r, d, a) {
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
  let sliders = [
    RSlider, rSlider, dSlider, speedSlider,
    rColorSlider, gColorSlider, bColorSlider
  ];
  for (let obj of sliders) {
    obj.readout.html(" " + nf(obj.slider.value(), 1, 1));
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    pg.background(0);
    t = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // recriar buffer mantendo conteúdo
  let old = pg;
  pg = createGraphics(windowWidth, windowHeight);
  pg.pixelDensity(2);
  pg.background(0);
  pg.image(old, 0, 0); // copiar o desenho existente
}
