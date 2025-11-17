var deg_to_rad = Math.PI / 180.0;

let breeze = 0;
let wind = 0;

function drawLine(x1, y1, x2, y2, color, width) {
 
  stroke(color[0], color[1], color[2]);
  if (width > 2) {
    strokeWeight(width);
  } else {
    strokeWeight(2);
  }
  line(x1, y1, x2, y2);
}

function Tree(x1, y1, seedSize, color, blossom, blossomColor) {
  function Leaf(relativePos, relativeAngle, size, color) {
    this.size = size;
    this.color = color;
    this.offset = random();

    this.relativePos = relativePos;
    this.relativeAngle = relativeAngle;

    this.render = function (x1, y1) {
      var angle = this.relativeAngle;

      if (wind > 0) {
        angle += (0 - angle) * (Math.pow(wind, 2) / (1 + Math.pow(wind, 2)));
      } else if (wind < 0) {
        angle += (-180 - angle) * (Math.pow(wind, 2) / (1 + Math.pow(wind, 2)));
      }
      angle += Math.sin(breeze) * 10 + (Math.sin(breeze * 3) * 25) / this.size;

      if (blossom) {
        var sizeFactor = 4;
      } else {
        var sizeFactor = this.size * 1.3;
      }

      var x2 = x1 + Math.cos((angle + 15) * deg_to_rad) * sizeFactor * 2;
      var y2 = y1 + Math.sin((angle + 15) * deg_to_rad) * sizeFactor * 2;

      var x3 = x1 + Math.cos((angle + 1) * deg_to_rad) * (sizeFactor * 2 + 10);
      var y3 = y1 + Math.sin((angle + 1) * deg_to_rad) * (sizeFactor * 2 + 10);

      var x4 = x1 + Math.cos((angle - 15) * deg_to_rad) * sizeFactor * 2;
      var y4 = y1 + Math.sin((angle - 15) * deg_to_rad) * sizeFactor * 2;

      if (blossom) {
        fill(blossomColor);
        noStroke();
        circle(x4, y4, 8);
        circle(x2, y2, 8);
        circle(x3, y3, 8);
        fill("white");
        circle(x1, y1, 8);
      } else {
        let color = this.color;

        fill(color);
        noStroke();
        quad(x1, y1, x2, y2, x3, y3, x4, y4);
      }
    };
  }

  function Branch(relativePos, relativeAngle, size, length, color) {
    this.size = size;
    this.length = length;

    if (length < 3) {
      this.length = 3;
    }

    this.color = color;

    this.relativePos = relativePos;
    this.relativeAngle = relativeAngle;

    this.contents = [];

    if (!(this.size < 4)) {
      this.contents.push(
        new Branch(
          "end",
          this.relativeAngle - random(5, 25),
          size / 1.2 - 1.5,
          length / random(1, 1.4),
          [
            color[0] + random(0, 10),
            color[1] + random(0, 10),
            color[2] + random(0, 5),
          ]
        ),

        new Branch(
          "end",
          this.relativeAngle + random(5, 25),
          size / 1.2 - 1,
          length / random(1, 1.4),
          [
            color[0] + random(0, 10),
            color[1] + random(0, 10),
            color[2] + random(0, 5),
          ]
        )
      );

      if (random() > 0.5) {
        this.contents.push(
          new Branch(
            "mid",
            this.relativeAngle + random(-60, 60),
            size - 10,
            length - 5,
            [
              color[0] + random(0, 10),
              color[1] + random(0, 10),
              color[2] + random(0, 5),
            ]
          )
        );
      }
    } else {
      let rand = random(60, 120);

      this.contents.push(
        new Leaf("end", this.relativeAngle + random(-45, 45), random(4, 12), [
          rand,
          rand + 50,
          rand - 20,
        ])
      );
      this.contents.push(
        new Leaf("end", this.relativeAngle + random(-45, 45), random(3, 12), [
          rand,
          rand + 50,
          rand - 20,
        ])
      );
      this.contents.push(
        new Leaf("mid", this.relativeAngle + random(-45, 45), random(2, 12), [
          rand,
          rand + 50,
          rand - 20,
        ])
      );
    }

    this.render = function (x1, y1) {
      var angle = this.relativeAngle;

      if (wind > 0) {
        angle +=
          ((0 - angle) * (Math.pow(wind, 2) / (1 + Math.pow(wind, 2)))) /
          (Math.ceil(size) * 0.5);
      } else if (wind < 0) {
        angle +=
          ((-180 - angle) * (Math.pow(wind, 2) / (1 + Math.pow(wind, 2)))) /
          (Math.ceil(size) * 0.5);
      }
      angle += (Math.sin(breeze) * 400) / Math.pow(this.length, 2);

      var x2 = x1 + Math.cos(angle * deg_to_rad) * this.length * 3;
      var y2 = y1 + Math.sin(angle * deg_to_rad) * this.length * 3;
      drawLine(x1, y1, x2, y2, this.color, this.size);

      this.contents.forEach((element) => {
        if (element.relativePos == "end") {
          element.render(x2, y2);
        } else {
          element.render((x1 + x2) / 2, (y1 + y2) / 2);
        }
      });
    };
  }

  this.basex = x1;
  this.basey = y1;
  this.seed = seedSize;
  this.color = color;
  this.angle = -90;
  this.size = Math.pow(this.seed, 3);
  this.length = Math.pow(this.seed, 3);
  this.blossom = blossom;
  this.blossomColor = blossomColor;

  this.root = new Branch("end", this.angle, this.size, this.length, this.color);

  this.renderTree = function () {
    fill(0, 0, 0, 50);
    noStroke();
    ellipse(
      this.basex,
      this.basey + 10,
      Math.pow(this.seed, 3) * 10,
      Math.pow(this.seed, 3)
    );

    fill(60, 50, 40);
    rectMode(RADIUS);
    rect(
      this.basex,
      this.basey,
      Math.pow(this.seed, 3) / 2,
      Math.pow(this.seed, 3) / 2,
      5
    );

    this.root.render(this.basex, this.basey);
  };
}

let tree = "";
let tree2 = "";
let tree3 = "";

function setup() {
  colorMode(RGB);
   createCanvas(windowWidth, windowHeight);
let tree_offset=random(-150,150);
  tree = new Tree(
    width / 3.5+tree_offset,
    (height * 2) / 3,
    2.8,
    [50, 40, 30],
    false,
    [180, 200, 240]
  );
tree_offset=random(-150,150);
  tree2 = new Tree(width / 2+tree_offset, (height * 2) / 3, 3, [40, 30, 20]);
tree_offset=random(-150,150);
  tree3 = new Tree(
    width / 2+tree_offset,
    (height * 2) / 3,
    3.3,
    [70, 50, 40],
    false,
    [240, 200, 240]
  );
tree_offset=random(-150,150);
  tree4 = new Tree(
    width / 2+tree_offset,
    (height * 2) / 3,
    2.9,
    [60, 50, 40],
    true,
    [240, 190, 205]
  );

  //noLoop();
}

var i = 0;
var change = 0;

function draw() {
  background(220, 240, 210);
  tree.renderTree();
  tree2.renderTree();
  tree3.renderTree();
  tree4.renderTree();

  breeze += Math.abs(wind) * 0.08 + 0.1;

  change += random(-10, 10);
  change = change * 0.9;

  i += change / 100;
  i = i * 0.8;
  wind = i;
  // blendMode(BURN);

  //print(change);
}
