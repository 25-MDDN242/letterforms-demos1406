const canvasWidth = 960;
const canvasHeight = 500;

/*
 * my three variable per letter are:
 *
   size: radius of the second circle (in pixels)
   offsetx: x offset (in pixels) of the second circle
            relative to the first one
   offsety: y offset (in pixels) of the second circle
            relative to the first one
 *
 */

colours = ["#f1f1f1","#ffd206","#ef3423","#1f4492","#0fa1d4","#048a35","#3b2f2f"]

const letterA = {
  "offsetX": 0,
  "offsetY": 0,
  "circularStations": 7,
  "size": 125,
  "connections": [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 0],
    [0, 7]
  ],
  "customStationX": 62.5,
  "customStationY": 65,
  "lineColour": colours[2]
}

const letterB = {
  "offsetX": 0,
  "offsetY": 0,
  "circularStations": 9,
  "size": 125,
  "connections": [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 0],
    [0, 9]
  ],
  "customStations": [
    { x: 62.5, y: -150 }
  ],
  "lineColour": colours[3]
}

const letterC = {
  "offsetX": 0,
  "offsetY": 0,
  "circularStations": 5,
  "size": 125,
  "connections": [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4]
  ],
  "customStations": [],
  "lineColour": colours[5],
}

const backgroundColor = colours[0]




function setup () {
  // create the drawing canvas, save the canvas element
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  // with no animation, redrawing the screen is not necessary
  noLoop();
}

function draw () {
  // clear screen
  background(backgroundColor);

  // compute the center of the canvas
  let center_x = canvasWidth / 2;
  let center_y = canvasHeight / 2;

  // draw the letters A, B, C from saved data
  drawLetter(center_x - 250, center_y, letterA)
  drawLetter(center_x      , center_y, letterB)
  drawLetter(center_x + 250, center_y, letterC)
}


function drawLetter(posx, posy, letterData) {
  let offsetX = posx + letterData["offsetX"];
  let offsetY = posy + letterData["offsetY"];
  let circularStations = letterData["circularStations"];
  let size = letterData["size"];
  let connections = letterData["connections"] || [];
  let lineColour = letterData["lineColour"]
  let customStationX = letterData["customStationX"]
  let customStationY = letterData["customStationY"]

  let stations = [];

  // Store all station positions
  for (let i = 0; i < circularStations; i++) {
    let angle = TWO_PI * i / circularStations;
    let stationX = offsetX + cos(angle) * (size / 2);
    let stationY = offsetY + sin(angle) * (size / 2);
    stations.push({ x: stationX, y: stationY });
  }


  let ex = offsetX + customStationX;
  let ey = offsetY + customStationY;
  stations.push({ x: ex, y: ey });


  // Draw connections
  stroke(lineColour);
  strokeWeight(5);
  for (let i = 0; i < connections.length; i++) {
    let [indexA, indexB] = connections[i];
    let a = stations[indexA];
    let b = stations[indexB];
    line(a.x, a.y, b.x, b.y);
  }

  // Draw stations
  fill(colours[0]);
  stroke(colours[6]);
  strokeWeight(3);
  for (let i = 0; i < stations.length; i++) {
    let s = stations[i];
    ellipse(s.x, s.y, 12);
  }
}


function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
