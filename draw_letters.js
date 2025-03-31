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
  fill("#f1f1f1");
  stroke("#3b2f2f");
  strokeWeight(3);
  for (let i = 0; i < stations.length; i++) {
    let s = stations[i];
    ellipse(s.x, s.y, 12);
  }
}

function interpolate_letter(percent, oldObj, newObj) {
  let new_letter = {};
  new_letter["size"]    = map(percent, 0, 100, oldObj["size"], newObj["size"]);
  new_letter["offsetx"] = map(percent, 0, 100, oldObj["offsetx"], newObj["offsetx"]);
  new_letter["offsety"] = map(percent, 0, 100, oldObj["offsety"], newObj["offsety"]);
  return new_letter;
}

var swapWords = [
  "ABBAABBA",
  "CAB?CAB?",
  "BAAAAAAA"
]
