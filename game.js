const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
console.log("game.js loaded");

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
  if (e.code === "Space" && !mario.isJumping && !isGameOver) {
    mario.ySpeed = mario.jumpPower;
    mario.isJumping = true;
  }
});

// Collision detection helper
function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

let isGameOver = false;

function gameOver() {
  console.log("Game Over triggered");
  isGameOver = true;
  alert("Game Over! Refresh the page to try again.");
}

function update() {
  if (isGameOver) return;

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

  // Check collisions
  for (let ob of obstacles) {
    if (isColliding(mario, ob)) {
      gameOver();
      break;
    }
  }
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

  // Draw GAME OVER text if game ended
  if (isGameOver) {
    ctx.fillStyle = "black";
    ctx.font = "bold 72px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  }
}

function gameLoop() {
  if (!isGameOver) {
    update();
  }
  draw();
  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

// Start game
setInterval(spawnObstacle, 2000);
spawnObstacle();
gameLoop();
