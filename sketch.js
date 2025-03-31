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
  "numStations": 6,
  "layout": "circle",
  "size": 125,
  "numConnections": 5,
  "customStationX": 62.5,
  "customStationY": 65,
  "customConnectionX": 62.5,
  "customConnectionY": 65,
  "customConnectionX2": 62.5,
  "customConnectionY2": 0,
  "lineColour": colours[2]
}

const letterB = {
  "offsetX": 0,
  "offsetY": 0,
  "numStations": 9,
  "layout": "circle",
  "size": 125,
  "numConnections": 8,
  "customStationX": -60,
  "customStationY": -150,
  "customConnectionX": -60,
  "customConnectionY": -150,
  "customConnectionX2": -60,
  "customConnectionY2": -30,
  "lineColour": colours[3]
}

const letterC = {
  "offsetX": 0,
  "offsetY": 0,
  "numStations": 5,
  "layout": "circle",
  "size": 125,
  "numConnections": 4,
  "lineColour": colours[5],
}

const letterI = {
  "offsetX": 0,
  "offsetY": -72,
  "numStations": 5,
  "size": 125,
  "customStationX": 0,
  "customStationY": -50,
  "numConnections": 4,
  "layout": "line",
  "lineAngle": 90,
  "lineColour": colours[4]
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
  let numStations = letterData["numStations"];
  let size = letterData["size"];
  let numConnections = letterData["numConnections"]
  let lineColour = letterData["lineColour"]
  let customStationX = letterData["customStationX"]
  let customStationY = letterData["customStationY"]
  let customConnectionX = letterData["customConnectionX"]
  let customConnectionY = letterData["customConnectionY"]
  let customConnectionX2 = letterData["customConnectionX2"]
  let customConnectionY2 = letterData["customConnectionY2"]
  let layout = letterData["layout"]
  let lineAngle = letterData["lineAngle"]

  let stations = [];

  // Store all station positions
  for (let i = 0; i < numStations; i++) {
    let x, y;
  
    if (layout === "circle") {
      let angle = TWO_PI * i / numStations;
      x = offsetX + cos(angle) * (size / 2);
      y = offsetY + sin(angle) * (size / 2);
    } else if (layout === "line") {
      let spacing = size / (numStations - 1); // space between points
      x = offsetX + cos(radians(lineAngle)) * spacing * i;
      y = offsetY + sin(radians(lineAngle)) * spacing * i;
    }
  
    stations.push({ x: x, y: y });
  }


  let ex = offsetX + customStationX;
  let ey = offsetY + customStationY;
  stations.push({ x: ex, y: ey });


  // Draw connections
  stroke(lineColour);
  strokeWeight(5);
  for (let i = 0; i < numConnections; i++) {
    if (i + 1 >= stations.length) break;  // don’t go out of bounds
    let a = stations[i];
    let b = stations[i + 1];
    line(a.x, a.y, b.x, b.y);
  }
  // Draw custom connection
  line(offsetX + customConnectionX, offsetY + customConnectionY, offsetX + customConnectionX2, offsetY + customConnectionY2);


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