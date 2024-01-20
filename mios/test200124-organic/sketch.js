const TOTAL = 30;
const MAX = 500;
const MAX_SIZE = 75;
const MIN_SIZE = 10;

let points = [];
var created = 0;

function log_point(point) {
	console.log("Punto " + point + ":");
	console.log("Posición: ", point.pos);
	console.log("Dirección: ", point.dir);
	console.log("Tamaño: ", point.size);
	console.log("Color: ", point.color);
}

// Encapsulate the object creation inside the for loop into a separate function for better readability and maintainability
function createPoints() {
	for(var i = 0; i < TOTAL; i++){
		size = random(MIN_SIZE, MAX_SIZE)
		points.push(createPoint(size));
	}
}

function createPoint(size) {
	return {
		pos: createVector(random(0,window.innerWidth),random(0,window.innerHeight)),
		dir: random(TWO_PI),
		size: size,
		color: {
			h: random(0, 10),
			s: random(80, 100),
			l: random(0,50),
		}
	};
}

function resetCanvas() {
	background(100);
	created = 0;
	// Reset any other canvas-related variables or states here
  }

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSL, 100);
	background(100);
	noStroke();
	
	var resetButton = createButton('Reset');
	resetButton.position(10, window.innerHeight-30); // Set the position of the button
	resetButton.mousePressed(resetCanvas);

	for(var i = 0; i < TOTAL; i++){
		size = random(MIN_SIZE, MAX_SIZE)
		points.push(createPoint(size));
	}
}

function draw() {
	var time = Date.now()/1000;;

	for(var i = 0; i < TOTAL; i++){
		var point = points[i];
		
		point.dir += noise(point.pos.x, point.pos.y, time)-0.477;
		
		var mouseAngle = atan2(mouseY-point.pos.y, mouseX-point.pos.x);
		var mouseAngle = atan2(random(0,window.innerHeight)-point.pos.y, random(0,window.innerWidth)-point.pos.x);
		point.dir += (mouseAngle - point.dir) * 0.05;
		
		point.size *= 0.99;
		if(point.size < 0.5){
			//point = createPoint(random(10, MAX_SIZE));
			point.size = random(10, 60);
			point.pos = createVector(random(0,window.innerWidth),random(0,window.innerHeight))
			//point.pos.x = mouseX + random(-50, 50);
			//point.pos.y = mouseY + random(-50, 50);
			created++;
		}
		
		point.pos.x += cos(point.dir) / (point.size + 2.5) * 10;
		point.pos.y += sin(point.dir) / (point.size + 2.5) * 10;
		
		//trick 5
		if (created < MAX) { 
			var bri = (noise(point.pos.x/30, point.pos.y/30, time*2+i*0.005)-0.3) * (140-point.size*20);
			fill(point.color.h, point.color.s, point.color.l);
			circle(point.pos.x, point.pos.y, point.size);
			console.log(created);
		}
		//log_point(point);
	}
}