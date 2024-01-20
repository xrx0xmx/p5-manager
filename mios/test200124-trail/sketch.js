const TOTAL = 600;
let points = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	for(var i = 0; i < TOTAL; i++){
		points.push({
			pos: createVector(width/2, height/2),
			dir: random(TWO_PI),
			size: random(1,250)
		});
	}
}

function draw() {
	var time = Date.now()/1000;
	for(var i = 0; i < TOTAL; i++){
		var point = points[i];
		
		//trick 2
		point.dir += noise(point.pos.x, point.pos.y, time)-0.49;
		
		var mouseAngle = atan2(mouseY-point.pos.y, mouseX-point.pos.x);
		point.dir += (mouseAngle - point.dir) * 0.05;
		point.size *= 0.5;

		if(point.size < 0.5){
			point.size = random(10, 60);
			point.pos.x = mouseX + random(-50, 50);
			point.pos.y = mouseY + random(-50, 50);
		}

		point.pos.x += Math.cos(point.dir);
		point.pos.y += Math.sin(point.dir);
		
		circle(point.pos.x, point.pos.y, point.size);
	}
}