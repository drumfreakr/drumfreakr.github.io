let s2 = function(p) {


	p.setup = function() {
		let canvas = p.createCanvas(200,600,p.WEBGL);
		canvas.parent('sketch-2');
		p.noStroke();
	}

	p.draw = function () {
		p.background((p.frameCount)%255,255,0);
		p.fill(0,0,255);
		p.push();
		// p.translate(-p.width/2, -p.height/2);
		p.rotateX(p.frameCount * 0.02);
		p.rotateY(p.frameCount * 0.03);
		p.box(p.sin(p.frameCount*0.01) * 100);
		p.pop();
	}

}

let p2 = new p5(s2, 'sketch-2');
