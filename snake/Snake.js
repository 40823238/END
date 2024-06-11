const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const width = canvas.width / gridSize;
const height = canvas.height / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
let score = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < width; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gridSize, 0);
    ctx.lineTo(i * gridSize, canvas.height);
    ctx.stroke();
  }

  for (let j = 0; j < height; j++) {
    ctx.beginPath();
    ctx.moveTo(0, j * gridSize);
    ctx.lineTo(canvas.width, j * gridSize);
    ctx.stroke();
  }

  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  if (direction === "right") {
    head.x++;
  } else if (direction === "left") {
    head.x--;
  } else if (direction === "up") {
    head.y--;
  } else if (direction === "down") {
    head.y++;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
    score++;
  } else {
    snake.pop();
  }
}

function checkGameOver() {
  const head = snake[0];

  if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function gameLoop() {
  if (checkGameOver()) {
    alert("Game Over! Your score: " + score);
    return;
  }

  moveSnake();
  draw();

  setTimeout(gameLoop, 100);
}

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: // 左箭頭
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 38: // 上箭頭
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 39: // 右箭頭
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case 40: // 下箭頭
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
});

gameLoop();