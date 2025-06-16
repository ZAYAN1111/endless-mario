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

let isGameOver = false;
let score = 0;

// Obstacles array
let obstacles = [];

function spawnObstacle() {
  const height = 50 + Math.random() * 50;
  const obstacle = {
    x: canvas.width,
    y: canvas.height - height,
    width: 30,
    height: height,
    speed: 5,
    passed: false // for scoring
  };
  obstacles.push(obstacle);
}

// Keyboard jump
document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !mario.isJumping && !isGameOver) {
    mario.ySpeed = mario.jumpPower;
    mario.isJumping = true;
  }
});

// Mobile tap jump
canvas.addEventListener("touchstart", function () {
  if (!mario.isJumping && !isGameOver) {
    mario.ySpeed = mario.jumpPower;
    mario.isJumping = true;
  }
});

// Collision detection
function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function gameOver() {
  isGameOver = true;
  alert("Game Over! Score: " + score + "\nRefresh the page to try again.");
}

function update() {
  if (isGameOver) return;

  mario.ySpeed += mario.gravity;
  mario.y += mario.ySpeed;

  if (mario.y > 300) {
    mario.y = 300;
    mario.ySpeed = 0;
    mario.isJumping = false;
  }

  for (let ob of obstacles) {
    ob.x -= ob.speed;

    if (!ob.passed && ob.x + ob.width < mario.x) {
      ob.passed = true;
      score++;
    }

    if (isColliding(mario, ob)) {
      gameOver();
      break;
    }
  }

  obstacles = obstacles.filter(ob => ob.x + ob.width > 0);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sky background (optional)
  ctx.fillStyle = "#5c94fc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Brown ground
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(0, 350, canvas.width, 50);

  // Draw Mario
  ctx.fillStyle = "red";
  ctx.fillRect(mario.x, mario.y, mario.width, mario.height);

  // Draw obstacles
  ctx.fillStyle = "green";
  for (let ob of obstacles) {
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
  }

  // Score
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, 20, 40);

  // Game over text
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
