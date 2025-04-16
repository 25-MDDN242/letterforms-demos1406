/* these are optional special variables which will change the system */
var systemBackgroundColor = "#f1f1f1";
var systemLineColor = "#000090";
var systemBoxColor = "#C73869";

/* internal constants */

/*
 * Draw the letter given the letterData
 *
 * Letters should always be drawn with the
 * following bounding box guideline:
 * from (0,0) to (100, 200)
 */
function drawLetter(letterData) {
  let offsetX = 50 + letterData["offsetX"];
  let offsetY = 150 + letterData["offsetY"];
  let numStations = letterData["numStations"];
  let size = letterData["size"];
  let lineColour = letterData["lineColour"]
  let customStationX = letterData["customStationX"]
  let customStationY = letterData["customStationY"]
  let customConnectionX = letterData["customConnectionX"]
  let customConnectionY = letterData["customConnectionY"]
  let layout = letterData["layout"]
  let lineAngle = letterData["lineAngle"]

  let stations = [];

  let cx = offsetX + customStationX;
  let cy = offsetY + customStationY;
  
  // Store all station positions
  for (let i = 0; i < numStations; i++) {
    let x, y;
    if (layout == 1) { // circle
      let angle = TWO_PI * i / numStations;
      x = offsetX + cos(angle) * (size / 2);
      y = offsetY + sin(angle) * (size / 2);
    } else if (layout == 2) { // just a line
      let spacing = size / (numStations - 1); // space between points
      x = offsetX + cos(radians(lineAngle)) * spacing * i;
      y = offsetY + sin(radians(lineAngle)) * spacing * i;
    } else if (layout == 3) { // top curve line
      let spacing = size / (numStations - 1);
      x = offsetX + cos(radians(lineAngle)) * spacing * i;
      y = offsetY + sin(radians(lineAngle)) * spacing * i;
      if(i == 0){
        stroke(lineColour);
        strokeWeight(6);
        drawAngularLine(x, y, cx - 20, cy, cx, cy)
      }
    } else if( layout == 4) { // bottom curve line
      let spacing = size / (numStations - 1);
      x = offsetX + cos(radians(lineAngle)) * spacing * i;
      y = offsetY + sin(radians(lineAngle)) * spacing * i;
      if(i == numStations - 1){
        stroke(lineColour);
        strokeWeight(6);
        drawAngularLine(x, y, cx + 20, cy, cx, cy)
      }
    }

    stations.push({ x: x, y: y });
  }
  stations.push({ x: cx, y: cy });


  // Draw connections
  stroke(lineColour);
  strokeWeight(6);
  for (let i = 0; i < numStations - 1; i++) {
    if (i + 1 >= stations.length) break;
    let a = stations[i];
    let b = stations[i + 1];
    line(a.x, a.y, b.x, b.y);
  }
  

  // Draw custom connection
  line(offsetX + customConnectionX, offsetY + customConnectionY, offsetX + customStationX, offsetY + customStationY);

  // Draw stations
  fill("#f1f1f1");
  stroke("#3b2f2f");
  strokeWeight(3);
  for (let i = 0; i < stations.length; i++) {
    let s = stations[i];
    ellipse(s.x, s.y, 12);
  }
}

// function assisted by ChatGPT
function drawAngularLine(x1, y1, x2, y2, inputMidX, inputMidY) {
  // Calculate the rectangle bounds.
  let left = min(x1, x2)
  let right = max(x1, x2)
  let top = min(y1, y2)
  let bottom = max(y1, y2)

  // Create vectors for easy management.
  let start = createVector(x1, y1)
  let end = createVector(x2, y2)
  let inputMid = createVector(inputMidX, inputMidY)

  // Map the input midpoint onto the rectangle edges.
  let candidates = [
    createVector(constrain(inputMidX, left, right), top),      // Top edge
    createVector(right, constrain(inputMidY, top, bottom)),     // Right edge
    createVector(constrain(inputMidX, left, right), bottom),    // Bottom edge
    createVector(left, constrain(inputMidY, top, bottom))       // Left edge
  ]

  // Find the candidate closest to the input midpoint.
  let snappedMid = candidates.reduce((closest, current) => 
    p5.Vector.dist(inputMid, current) < p5.Vector.dist(inputMid, closest) ? current : closest
  )

  // Draw the two line segments.
  line(start.x, start.y, snappedMid.x, snappedMid.y)
  line(snappedMid.x, snappedMid.y, end.x, end.y)
}





function interpolate_letter(percent, oldObj, newObj) {
  let new_letter = {};
  new_letter["size"]    = map(percent, 0, 100, oldObj["size"], newObj["size"]);
  new_letter["offsetX"] = map(percent, 0, 100, oldObj["offsetX"], newObj["offsetX"]);
  new_letter["offsetY"] = map(percent, 0, 100, oldObj["offsetY"], newObj["offsetY"]);
  new_letter["numStations"] = map(percent, 0, 100, oldObj["numStations"], newObj["numStations"]);
  new_letter["layout"] = map(percent, 0, 100, oldObj["layout"], newObj["layout"]);
  new_letter["lineColour"] = lerpColor(color(oldObj["lineColour"]), color(newObj["lineColour"]), percent / 100);
  new_letter["customStationX"] = map(percent, 0, 100, oldObj["customStationX"], newObj["customStationX"]);
  new_letter["customStationY"] = map(percent, 0, 100, oldObj["customStationY"], newObj["customStationY"]);
  new_letter["customConnectionX"] = map(percent, 0, 100, oldObj["customConnectionX"], newObj["customConnectionX"]);
  new_letter["customConnectionY"] = map(percent, 0, 100, oldObj["customConnectionY"], newObj["customConnectionY"]);
  new_letter["lineAngle"] = map(percent, 0, 100, oldObj["lineAngle"], newObj["lineAngle"]);
  return new_letter;
}

var swapWords = [
  "AUCKLAND",
  "HONGKONG",
  "LONDON ",
  "SHANGHAI",
  "ISTANBUL",
  "CAPETOWN",
  "NEW YORK",
  "SANTIAGO",
  "YOKOHAMA",
  "BRISBANE",
  "PORTLAND",
  "FLORENCE",
  "BUDAPEST",
  "PASADENA"
]
