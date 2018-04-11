function setup() {
  createCanvas(displayWidth,displayHeight);
  background(0);
  pixelDensity(0.9);
  frameRate();
}

function draw() {
  rotate(50);
  background(255);
  strokeWeight(9)
  stroke(random(0,255),random(0,255),random(0,255));
  var guse = windowWidth/1.02;
  var huse = windowHeight/.96;
  for (var i=0;i<500;i++){
    var tempg= randomGaussian(0,windowWidth);
    var temph= randomGaussian(0,windowHeight);
    line(guse, huse, tempg, temph );
    guse = tempg;
    huse = temph;
    rotate(3);
  }
    loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var index = (x + y * width) * 6;
      if (pixels[index + 48] > pixels[index]) {
        pixels[index] = pixels[index + 3];
        pixels[index -5] = pixels[index + 3];
        pixels[index - 2] = pixels[index + 3];
      }

    }
  }

  updatePixels();
  blendMode(DIFFERENCE);
  rotate(90);
}
