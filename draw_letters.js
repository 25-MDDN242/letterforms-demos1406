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

function getCustomStation(data) {
  const offX = 50 + data.offsetX;
  const offY = 150 + data.offsetY;
  return {
    x: offX + data.customStationX,
    y: offY + data.customStationY
  };
}

function getConnectionPivot(data) {
  const offX = 50 + data.offsetX;
  const offY = 150 + data.offsetY;
  return {
    x: offX + data.customConnectionX,
    y: offY + data.customConnectionY
  };
}

function pickPivotIndex(data, stations) {
  return 0
}


function drawLetter(letterData) {
  if (letterData.dot) {
    // white fill
    fill(systemBackgroundColor);
    // dark outline
    stroke(systemBoxColor);
    strokeWeight(3);
    ellipse(letterData.dot.x, letterData.dot.y, 12);
    return;
  }

  // — otherwise, connection branch or full‐map draw …
  if (letterData.conn) {
    // connection line
    stroke(letterData.strokeColour);
    strokeWeight(6);
    line(
      letterData.conn.start.x, letterData.conn.start.y,
      letterData.conn.end.x,   letterData.conn.end.y
    );
    // station tip
    fill(systemBackgroundColor);
    stroke(systemBoxColor);
    strokeWeight(3);
    ellipse(letterData.conn.end.x, letterData.conn.end.y, 12);
    return;
  }

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

  let pivotStation = 0


  // Draw stations
  fill("#f1f1f1");
  stroke("#3b2f2f");
  strokeWeight(3.5);

  // Draw custom stations
  ellipse(c1x, c1y, 12);
  ellipse(startX, startY, 12);

  for (let i = 0; i < stations.length; i++) {
    let s = stations[i];
    if (i == pivotStation) {
      strokeWeight(4);
      ellipse(s.x, s.y, 17);   // <-- bigger circle
    } else {
      strokeWeight(3.5);
      ellipse(s.x, s.y, 12);   // <-- normal size
    }
  }


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
  if (dx == 0 || dy == 0) {
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

function computeStations(data) {
  // 1) unpack & apply the same offsets
  let offX    = 50 + data.offsetX;
  let offY    = 150 + data.offsetY;
  let n       = data.numStations;
  let sz      = data.size;
  let layout  = data.layout;
  let angle   = radians(data.lineAngle || 0);
  let stations = [];

  // 2) the zig-zag (layout === 4)
  if (layout == 4) {
    if (n > 1) {
      let step = sz / (n - 1);
      for (let i = 0; i < n; i++) {
        stations.push({
          x: offX + step * i,
          y: offY + (i % 2 === 0 ? 0 : sz)
        });
      }
    }
  }
  // 3) circle or straight-line
  else {
    for (let i = 0; i < n; i++) {
      if (layout == 1 || layout == 3) {
        // full circle
        let a = TWO_PI * i / n;
        stations.push({
          x: offX + cos(a) * (sz / 2),
          y: offY + sin(a) * (sz / 2)
        });
      } else {
        // straight line at data.lineAngle
        let spacing = (n > 1) ? sz / (n - 1) : 0;
        stations.push({
          x: offX + cos(angle) * spacing * i,
          y: offY + sin(angle) * spacing * i
        });
      }
    }
  }

  // 4) the “custom station” that your drawLetter pushes for layout≠3
  if (layout !== 3
      && data.customStationX !== undefined
      && data.customStationY !== undefined) {
    stations.push({
      x: offX + data.customStationX,
      y: offY + data.customStationY
    });
  }

  return stations;
}

function interpolate_letter(percent, oldObj, newObj) {
  // 0–1 normalized
  let p = percent / 100;
  
  // if either has no stations, fall back to full switch
  if (
    !oldObj.numStations || !newObj.numStations
  ) {
    return { ...newObj };
  }

  // helper: get stations for a letter
  const oldStations = computeStations(oldObj);
  const newStations = computeStations(newObj);

  // determine connection counts
  const isOldCircular = oldObj.layout === 1 || oldObj.layout === 3;
  const oldConnCount   = isOldCircular
    ? oldStations.length
    : oldStations.length - 1;

  const isNewCircular = newObj.layout === 1 || newObj.layout === 3;
  const newConnCount  = isNewCircular
    ? newStations.length
    : newStations.length - 1;

  // Phase 1: shrink old letter (0 ≤ p < 0.5)
  if (p < 0.5) {
    let t = p / 0.5;                    // 0 → 1 over first half
    let prog = t * oldConnCount;       // total connection‐index progress
    let idx  = floor(prog);            // which segment we’re on
    idx = min(idx, oldConnCount - 1);  // clamp

    let frac = prog - idx;             // local 0→1 progress on this segment

    // pick segment endpoints
    let i1 = idx;
    let i2 = isOldCircular
      ? (i1 + 1) % oldStations.length
      : i1 + 1;

    let A = oldStations[i1];
    let B = oldStations[i2];

    // interpolate end of this segment
    let endX = lerp(A.x, B.x, frac);
    let endY = lerp(A.y, B.y, frac);

    return {
      conn: { start: A, end: { x: endX, y: endY } },
      strokeColour: oldObj.lineColour
    };
  }

  // Phase 2: grow new letter (0.5 ≤ p ≤ 1)
  else {
    let t = (p - 0.5) / 0.5;            // 0 → 1 over second half
    let prog = t * newConnCount;
    let idx  = floor(prog);
    idx = min(idx, newConnCount - 1);

    let frac = prog - idx;

    // for linear/zigzag, growth starts at station[0] → [1] → … → [n-1]
    // for circular, same CCW order: 0→1, 1→2, …, last→0
    let j1 = idx;
    let j2 = isNewCircular
      ? (j1 + 1) % newStations.length
      : j1 + 1;

    let C = newStations[j1];
    let D = newStations[j2];

    let endX = lerp(C.x, D.x, frac);
    let endY = lerp(C.y, D.y, frac);

    return {
      conn: { start: C, end: { x: endX, y: endY } },
      strokeColour: newObj.lineColour
    };
  }
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
