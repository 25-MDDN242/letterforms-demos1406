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
  let connectionStyle = letterData["connectionStyle"]
  let layout = letterData["layout"]
  let lineAngle = letterData["lineAngle"]

  let stations = [];

  let c1x = offsetX + customStationX;
  let c1y = offsetY + customStationY;
  
  if (layout === 4) { // zig zag
    // zig‑zag layout entirely self‑contained
    let step = size / (numStations - 1);
    for (let i = 0; i < numStations; i++) {
      let x = offsetX + step * i;
      let y = offsetY + (i % 2 === 0 ? 0 : size);
      stations.push({ x, y });
    }
  } else {
    for (let i = 0; i < numStations; i++) {
      let x, y;
      if (layout == 1 || layout == 3) { // circle
        let angle = TWO_PI * i / numStations;
        x = offsetX + cos(angle) * (size/2);
        y = offsetY + sin(angle) * (size/2);
      } else { // line
        let spacing = size / (numStations-1);
        x = offsetX + cos(radians(lineAngle)) * spacing * i;
        y = offsetY + sin(radians(lineAngle)) * spacing * i;
      }
      stations.push({ x, y });
    }
  }

  let c1 = { x: c1x, y: c1y}

  if (layout !== 3) {
    stations.push(c1);  
  }


  


  // Draw connections
  stroke(lineColour);
  strokeWeight(6);
  for (let i = 0; i < numStations - 1; i++) {
    if (i + 1 >= stations.length) break;
    let a = stations[i];
    let b = stations[i + 1];
    line(a.x, a.y, b.x, b.y);
  }

  if (layout == 3 && stations.length > 1) {
    let first = stations[0],
        last  = stations[stations.length-1];
    line(last.x, last.y, first.x, first.y);
  }
  

  // Draw custom connections
  let startX = offsetX + customConnectionX;
  let startY = offsetY + customConnectionY;
  let endX = offsetX + customStationX;
  let endY = offsetY + customStationY;

  drawCustomConnection(startX, startY, endX, endY, connectionStyle);

  // Draw stations
  fill("#f1f1f1");
  stroke("#3b2f2f");
  strokeWeight(3);
  for (let i = 0; i < stations.length; i++) {
    let s = stations[i];
    ellipse(s.x, s.y, 12);
  }

  // Draw custom stations
  ellipse(c1x, c1y, 12);
  ellipse(startX, startY, 12);
}


function drawAngularLine(x1, y1, mx, my, x2, y2) {
  line(x1, y1, mx, my);
  line(mx, my, x2, y2);
}

function drawCustomConnection(x1, y1, x2, y2, style = 0, ratio = 0.7){
  const dx = x2 - x1;
  const dy = y2 - y1;

  switch (style) {
    case 1: {
      // horizontal then angled into the target
      let mx = x1 + dx * ratio;
      let my = y1;
      drawAngularLine(x1, y1, mx, my, x2, y2);
      return;
    }
    case 2: {
      // │ then diagonal into the target
      let mx = x1
      let my = y1 + dy * ratio;
      drawAngularLine(x1, y1, mx, my, x2, y2);
      return;
    }
    case 3: {
      // diagonal out, then horizontal
      let mx = x1 + dx * ratio;
      let my = y1 + dy * ratio;
      drawAngularLine(x1,y1,mx,my,x2,my);
      return;
    }

    case 4: {
      // diagonal out, then vertical
      let mx = x1 + dx * ratio;
      let my = y1 + dy * ratio;
      drawAngularLine(x1,y1,mx,my,mx,y2);
      return;
    }
  }

  // — fallback to your old quadrant logic —
  if (dx === 0 || dy === 0) {
    drawAngularLine(x1, y1, x2, y2, x2, y2);
    return;
  }
  let mx, my;
  if (x2 > x1 && y2 < y1) {
    mx = x1 + dx * ratio;
    my = y2;
  } else if (x2 > x1 && y2 > y1) {
    mx = x1 + dx * ratio;
    my = y1;
  } else if (x2 < x1 && y2 > y1) {
    mx = x1;
    my = y1 + dy * ratio;
  } else {
    if (Math.abs(dx) > Math.abs(dy)) {
      mx = x1 + dx * ratio;
      my = y1;
    } else {
      mx = x1;
      my = y1 + dy * ratio;
    }
  }
  drawAngularLine(x1, y1, mx, my, x2, y2);
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
