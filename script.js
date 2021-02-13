// circle collision
// nested loop

const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

let particleArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

//create particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  //method to draw individual
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    context.fillStyle = "white";
    context.fill();
  }
  // check position, check mouse, move particle, draw particle
  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionX = -this.directionX;
    }
    // check collision - mouse
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        // close enough
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        // far enough
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    // move particle
    this.x += this.directionX;
    this.y += this.directionY;
    // draw particle
    this.draw();
  }
}

function init() {
  particleArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "white";

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
  connect();
}

function connect() {
    let opacityValue = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let distance =
        (particleArray[a].x - particleArray[b].x) *
          (particleArray[a].x - particleArray[b].x) +
        (particleArray[a].y - particleArray[b].y) * (particleArray[a].y -
          particleArray[b].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          opacityValue = 1 - (distance/20000);
        context.strokeStyle = "rgba(255, 255, 255, "+ opacityValue +")";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(particleArray[a].x, particleArray[a].y);
        context.lineTo(particleArray[b].x, particleArray[b].y);
        context.stroke();
      }
    }
  }
}

window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80)*(canvas.height/80));
        init();
    }
)

window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.x = undefined;
    }
)

init();
animate();
