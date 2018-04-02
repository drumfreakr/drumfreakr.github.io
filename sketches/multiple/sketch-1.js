const s1 = function(p) {


	p.setup = function() {
		let canvas = p.createCanvas(400,400);
		canvas.parent('sketch-1');
	}

	p.draw = function () {
		p.background((p.frameCount*2)%255);
		p.fill(255);
		p.noStroke();
		let x = 10;
		let y = p.height/2 + p.sin(p.frameCount * 0.01) * p.height/2 * 0.9;
		p.translate(x, y);
		p.rect(0, 0, p.width - x*2, 4);
	}

}

const p1 = new p5(s1, 'sketch-1');
