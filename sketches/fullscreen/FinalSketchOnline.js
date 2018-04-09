let tileCountX = 50;
let tileCountY = 10;

let hueValues = [];
let saturationValues = [];
let brightnessValues = [];

let mic;
let fft;
let midiMap = {};

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);
// change color here
  colorMode(RGB, 300, 100, 100, 100);
//Mode,Red Hue, Green hue, Blue hue, Alpha
  noStroke();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  for(let i =0; i <200; i++) {
    midiMap[i] * 0;
  }

// init with random values
  for (let i = 0; i < tileCountX; i++) {
  hueValues[i] = random(360);
  saturationValues[i] = random(0);
  brightnessValues[i] = random(0);
  }
}

function draw() {

//background(100, 100);
  let spectrum = fft.analyze();

  let lowlvls = fft.getEnergy("bass", "lowMid");
  let midlvls = fft.getEnergy("mid", "treble");

  let sw = map(midiMap[41],0,127,0,width);
  let sh = map(midiMap[21],0,127,0,height);
  let change = map(midiMap[9],0,127,0,1);

// limit mouse coordinates to canvas
   let mX = constrain(lowlvls, -50, width);
   let mY = constrain(midlvls, -30, height);

// tile counter
   let counter = 0;

// map mouse to grid resolution
   let currentTileCountX = int(map(mX, 0, width, 0, tileCountX));
   let currentTileCountY = int(map(mY, 0, height, 0, tileCountY));
   let tileWidth = width / currentTileCountX;
   let tileHeight = height / currentTileCountY;

   for (let gridY = 0; gridY < tileCountY; gridY++) {
     for (let gridX = 0; gridX < tileCountX; gridX++) {
          let posX = tileWidth / gridX;
          let posY = tileHeight * gridY;
          let index = counter % currentTileCountX;

// get component color values
   fill(hueValues[index], saturationValues[index], brightnessValues[index]);
   rect(posX, posY, tileWidth, tileHeight);
    counter++;
     }
   }


   let x1 = random(width);
   let y1 = random(height);

   let x2 = round(x1 + random(-10, width));
   let y2 = round(y1 + random(-10, height));

   let w = mouseX; // midi controller knob 41 width
   let h = mouseY; // midi controller knob 21 height

   set(x2, y2, get(x1, y1, w, h));

   if (mouseIsPressed) {
     setup();
   }

}
