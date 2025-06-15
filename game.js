const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !mario.isJumping) {
    mario.ySpeed = mario.jumpPower;
    mario.isJumping = true;
  }
});

function update() {
  mario.ySpeed += mario.gravity;
  mario.y += mario.ySpeed;

  if (mario.y > 300) {
    mario.y = 300;
    mario.ySpeed = 0;
    mario.isJumping = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
