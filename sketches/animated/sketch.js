
let gif;
let animation;
let isRecording;
let context;

function setup() {
	context = createCanvas(400,400);
	animation = [{x:0, y:0}];
	initGif();
}

function draw() {
	background((frameCount*2)%255);
	let x = animation[0].x;
	let y = animation[0].y;
	noFill();
	stroke(0,255,128);
	animation.forEach((elem) => {
		strokeWeight(elem.d);
		line(x,y,elem.x, elem.y);
		x = elem.x;
		y = elem.y;
	});

	if(isRecording) {
		if(frameCount%4 == 0) gif.addFrame(context.elt, {delay: 1, copy: true});
		fill(255,0,0);
		noStroke();
		ellipse(20,120,20,20);
		console.log('recording ...');
	}
}

function mouseMoved() {
	animation.push({x:mouseX, y:mouseY, d: abs(mouseX-pmouseX)});
	if(animation.length > 100) animation.splice(0,1);
}

function keyPressed() {
	console.log('key-pressed', key);
	if(key === 'R') isRecording = !isRecording;
	if(key === 'S') gif.render();
}

function initGif() {
	gif = new GIF({
		workerScript: 'libraries/gif.worker.js',
    workers: 2,
    quality: 40
  });

  gif.on('finished', function(blob) {
		console.log('done');
    window.open(URL.createObjectURL(blob));
    initGif();
  });
}
