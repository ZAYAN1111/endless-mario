const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Mario setup
let mario = {
  x: 100,
  y: 300,
  width: 50,
  height: 50,
  ySpeed: 0,
  gravity: 0.6,
  jumpPower: -12,
  isJumping: false
};

// Obstacles array
let obstacles = [];

function spawnObstacle() {
    const height = 50 + Math.random() * 50;
    const obstacle = {
    x: canvas.width,
    y: canvas.height - height,
    width: 30,
    height: height,
    speed: 5
  };
  obstacles.push(obstacle);
}

// Handle jumping
document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !mario.isJumping) {
    mario.ySpeed = mario.jumpPower;
    mario.isJumping = true;
  }
});

function update() {
  // Apply gravity
  mario.ySpeed += mario.gravity;
  mario.y += mario.ySpeed;

  // Prevent falling through floor
  if (mario.y > 300) {
    mario.y = 300;
    mario.ySpeed = 0;
    mario.isJumping = false;
  }

  // Move obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacles[i].speed;
  }

  // Remove off-screen obstacles
  obstacles = obstacles.filter(ob => ob.x + ob.width > 0);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Mario
  ctx.fillStyle = "red";
  ctx.fillRect(mario.x, mario.y, mario.width, mario.height);

  // Draw obstacles
  ctx.fillStyle = "green";
  for (let ob of obstacles) {
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start game
setInterval(spawnObstacle, 2000);
gameLoop();
