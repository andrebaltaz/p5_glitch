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
    this.offset = random(-10, 10);

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
      angle += (Math.sin(wind) * 400) / Math.pow(this.length, 2);

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

let api = "https://api.openweathermap.org/data/2.5/weather?q=";
let city = "Porto";
let apiKey = "&APPID=3a6c728f7ad54686e4fda6ce19821184";
let units = "&units=metric";
let weather;
let windspeed;
let winddirection;
let rateref = 10;
let newframe = 100;
let cross = 0;

function weatherAsk() {
  // city = input.value();
  let url = api + city + apiKey + units;
  console.log(encodeURI(url));
  loadJSON(encodeURI(url), gotData);
}

function gotData(data) {
  weather = data;
  console.log(weather.wind.speed);
}

function setup() {
  colorMode(RGB);
  createCanvas(windowWidth, windowHeight);
  width = windowWidth;
  height = windowHeight;
  weatherAsk();

  let tree_offset = random(-20, 100);
  tree = new Tree(
    width / 2 + tree_offset,
    height - height / random(2, 30),
    2.8,
    [50, 40, 30],
    false,
    [180, 200, 240]
  );
  tree_offset = random(-100, 100);
  tree2 = new Tree(
    width / 2 + tree_offset,
    height - height / random(10, 30),
    3,
    [40, 30, 20]
  );
  tree_offset = random(-150, 150);
  tree3 = new Tree(
    (width * 3) / 4 + tree_offset,
    height - height / random(10, 30),
    3.3,
    [70, 50, 40],
    false,
    [240, 200, 240]
  );
  tree_offset = random(-100, 100);
  tree4 = new Tree(
    width * (1 / 4) + tree_offset,
    height - height / random(10, 30),
    2.9,
    [60, 50, 40],
    true,
    [240, 190, 205]
  );

  //noLoop();
}

var i = 0;
var change = 0;
let ramp = 100;
let up = 1;

function draw() {
  background(220, 240, 210);

  if (frameCount % 60 == 0) {
    weatherAsk();
  }

  if (weather) {
    windspeed = weather.wind.speed;
    winddirection = weather.wind.deg;

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
    if (windowWidth > 500) {
      textSize(12);
      fill(10, 100, 100);
      text("Porto " + currentDate, width / 8, height - 50);
      text(Ctime, width / 8, height - 40);
      text(
        "WindSpeed today: " + float(windspeed) + " m/s",
        width / 8,
        height - 30
      );
      text("WindGust: " + wind.toPrecision(2) + " m/s", width / 8, height - 20);
      //text("frame: " + frameCount + " ramp " + ramp + " up "+ up , width / 8, height - 10);
    }
  }

  tree.renderTree();
  tree2.renderTree();
  tree3.renderTree();
  tree4.renderTree();
  //wind=windspeed;

  breeze += Math.abs(int(wind)) * 0.008 + 0.1;

  //change += random(-10, 10);
  //change = change * 0.9;
  if (frameCount % ramp == 0) {
    ramp = frameCount + int(random(50, 200));
    up = int(random(0, 3));
  }
  // i += change / 100;
  if (up == 1) {
    if (wind < windspeed) {
      wind = wind + random(0, 1);
    }
  }

  if (up == 0) {
    if (wind > 0.2) {
      wind = wind - 0.1;
    } else if (wind < 0) {
      wind = wind + 0.1;
    }
  }
  if (up == 2) {
    if (wind > -1 * windspeed) {
      wind = wind - random(0, 1);
    }
  }
}

//

// wind = float(windspeed)+i;
//blendMode(BURN);

//print(change);
