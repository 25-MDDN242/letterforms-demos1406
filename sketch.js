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

const letterA = {
  // coreType: 1, // 0 = circle, 1 = triangle, 2 = square
  coreSize: 80,
  secondCoreSize: 70,
  // numRays: 3,
  // orbitalSpread: 60,
  // orbitalAngle: 60
}

const letterB = {
  // coreType: 0,
  coreSize: 100,
  secondsCoreSize: 90,
  // numRays: 8,
  // orbitalSpread: 90,
  // orbitalAngle: 0
}

const letterC = {
  // coreType: 2,
  coreSize: 60,
  secondCoreSize: 50,
  // numRays: 2,
  // orbitalSpread: 60,
  // orbitalAngle: 90
}



const backgroundColor  = "#d9d6dd";

const blueColor  = "#324dd4";
const pumpkin  = "#fd893e";
const pinkColor  = "#ff41ae";


function setup () {
  // create the drawing canvas, save the canvas element
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  // color/stroke setup
  // stroke(blueColor);
  // strokeWeight(4);


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
  let coreSize = letterData["coreSize"]
  let numRays = letterData["numRays"]
  let orbitalSpread = letterData["orbitalSpread"]
  let orbitalAngle = letterData["orbitalAngle"]
  let coreType = letterData["coreType"]
  let secondCoreSize = letterData["secondCoreSize"]

  // core circle
  strokeWeight(3);
  fill(pinkColor)
  stroke(blueColor)

  fill(pinkColor)
  ellipse(posx, posy, coreSize);
  noStroke()
  fill(50, 77, 212, 150)
  ellipse(posx + 30, posy + 30, secondCoreSize);



  // if (coreType == 0) {
  //   // circle
    
    
  // }
  // else if (coreType == 1) {
  //   // triangle
  //   beginShape()
  //   let r = coreSize / 2;
  //   for (let i = 0; i < 3; i++) {
  //     let angle = TWO_PI * i / 3; // equilateral triangle
  //     let vx = posx + cos(angle) * r;
  //     let vy = posy + sin(angle) * r;
  //     vertex(vx, vy);
  //   }
  //   endShape(CLOSE);
  // }
  // else if (coreType == 2) {
  //   // square
  //   rect(posx - coreSize / 2, posy - coreSize / 2, coreSize, coreSize);
  // }

  // stroke(blueColor)
  // // radial rays
  // // math was assited by ChatGPT
  // for (let i = 0; i < numRays; i++) {
  //   let angle = TWO_PI * i / numRays;
  //   let x1 = posx + cos(angle) * (coreSize / 2);
  //   let y1 = posy + sin(angle) * (coreSize / 2);
  //   let x2 = posx + cos(angle) * (coreSize / 2 + 30);
  //   let y2 = posy + sin(angle) * (coreSize / 2 + 30);
  //   line(x1, y1, x2, y2);
  // }

  // // // orbiting dots
  // // // math was assited by ChatGPT
  // let baseAngle = radians(orbitalAngle); // convert from degrees
  // for (let i = 0; i < 3; i++) {
  //   let angle = TWO_PI * i / 3 + baseAngle;
  //   let orbX = posx + cos(angle) * orbitalSpread;
  //   let orbY = posy + sin(angle) * orbitalSpread;
  //   noStroke();
  //   fill(pumpkin);
  //   ellipse(orbX, orbY, 10);
  // }
}


function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
