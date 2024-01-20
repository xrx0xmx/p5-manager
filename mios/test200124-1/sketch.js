let palette = [];
let particles = [];
let maxParticles = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createPalette();
}

function createPalette() {
  palette = [];
  let hue = round(random(360));
  let r1 = round(random(180));

  palette.push(color(hue - (r1 * 2), round(random(100)), round(random(100))));
  palette.push(color(hue - r1, round(random(100)), round(random(100))));
  palette.push(color(hue, round(random(100)), round(random(100))));
  palette.push(color(hue + r1, round(random(100)), round(random(100))));
  palette.push(color(hue + (r1 * 2), round(random(100)), round(random(100))));
}

function draw() {
  background(255);

  // Lógica de las partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];

    // Movimiento hacia el exterior o hacia el centro
    if (particle.returning) {
      let directionToOrigin = particle.origin.copy().sub(particle.pos);
      directionToOrigin.normalize();
      particle.pos.add(directionToOrigin.mult(0.5));

      if (particle.pos.dist(particle.origin) < 5) {
        particles.splice(i, 1); // Eliminar la partícula una vez que ha regresado al centro
      }
    } else {
      particle.pos.x += cos(particle.dir) * particle.speed;
      particle.pos.y += sin(particle.dir) * particle.speed;

      // Verificar si la partícula alcanza el exterior del círculo
      let distanceToCenter = dist(particle.pos.x, particle.pos.y, width / 2, height / 2);
      if (distanceToCenter > 200) {
        particle.returning = true;
      }
    }

    // Dibujar la partícula
    fill(particle.color);
    noStroke();
    ellipse(particle.pos.x, particle.pos.y, 30);
  }

  // Generar nuevas partículas en cada iteración si no se ha alcanzado el máximo
  if (particles.length < maxParticles) {
    if (particles.length === 0 || particles[particles.length - 1].returning) {
      // Crear nuevas partículas solo si no hay partículas en movimiento o la última está regresando
      let numParticles = min(maxParticles - particles.length, floor(random(1, 26)));
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          pos: createVector(width / 2, height / 2),
          dir: random(TWO_PI),
          speed: 1,
          returning: false,
          origin: createVector(width / 2, height / 2), // Origen de la partícula
          color: palette[floor(random(palette.length))]
        });
      }
    }
  } else {
    // Si se alcanzó el máximo de partículas, esperar a que todas las partículas desaparezcan
    if (particles.length === 0) {
      // Una vez que todas las partículas han desaparecido, permitir la creación de nuevas partículas
      maxParticles = 0;  // Establecer maxParticles a 0 para evitar la generación continua
    }
  }
}
