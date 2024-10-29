const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 100,
    speed: 2,
    angle: 0
};

let carImage = new Image();
carImage.src = "car.png"; // Đường dẫn ảnh xe

let obstacles = Array.from({ length: 5 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 50,
    height: 50
}));

let rewards = Array.from({ length: 5 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 30,
    height: 30
}));

let score = 0;

carImage.onload = () => {
    gameLoop();
};

function moveCar() {
    car.x += car.speed * Math.cos(car.angle);
    car.y += car.speed * Math.sin(car.angle);
}

function drawCar() {
    ctx.save();
    ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
    ctx.rotate(car.angle);
    ctx.drawImage(carImage, -car.width / 2, -car.height / 2, car.width, car.height);
    ctx.restore();
}

function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function drawRewards() {
    ctx.fillStyle = "yellow";
    rewards.forEach(reward => {
        ctx.fillRect(reward.x, reward.y, reward.width, reward.height);
    });
}

function checkCollision() {
    return obstacles.some(obstacle => 
        car.x < obstacle.x + obstacle.width &&
        car.x + car.width > obstacle.x &&
        car.y < obstacle.y + obstacle.height &&
        car.y + car.height > obstacle.y
    );
}

function collectRewards() {
    rewards = rewards.filter(reward => {
        const collected = car.x < reward.x + reward.width &&
            car.x + car.width > reward.x &&
            car.y < reward.y + reward.height &&
            car.y + car.height > reward.y;
        if (collected) score += 10;
        return !collected;
    });
}

function updateScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "Control":
            car.speed = 5;
            break;
        case "ArrowLeft":
            car.angle -= 0.1;
            break;
        case "ArrowRight":
            car.angle += 0.1;
            break;
        case "ArrowUp":
            moveCar();
            break;
        case "ArrowDown":
            car.speed = 2;
            break;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveCar();

    if (checkCollision()) {
        alert("Game Over!");
        return;
    }

    collectRewards();
    drawObstacles();
    drawRewards();
    drawCar();
    updateScore();

    requestAnimationFrame(gameLoop);
}
