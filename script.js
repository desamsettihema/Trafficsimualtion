const carContainer = document.getElementById("carContainer");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const red1 = document.getElementById("red1");
const yellow1 = document.getElementById("yellow1");
const green1 = document.getElementById("green1");
const red2 = document.getElementById("red2");
const yellow2 = document.getElementById("yellow2");
const green2 = document.getElementById("green2");

const red3 = document.getElementById("red3");
const yellow3 = document.getElementById("yellow3");
const green3 = document.getElementById("green3");

const red4 = document.getElementById("red4");
const yellow4 = document.getElementById("yellow4");
const green4 = document.getElementById("green4");

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

let cars = [];

let running = true;

let horizontalGreen = true;

const CAR_IMAGES = [

    "images/car.jpeg",
    "images/car2.jpeg",
    "images/car3.jpg",
    "images/bike.jpeg"

];
window.addEventListener("resize", () => {

    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;

});

class Car{

    constructor(direction){

        this.direction = direction;

        this.speed = 2 + Math.random();

        this.element = document.createElement("img");

        this.element.className = "car";

        this.element.src =
        CAR_IMAGES[Math.floor(Math.random()*CAR_IMAGES.length)];

        carContainer.appendChild(this.element);
        const ROAD_WIDTH = 220;
        const LANE = 55;
        switch(direction){

    case "left":

        this.x = -80;
        this.y = centerY + 45;
        this.angle = 0;

    break;

    case "right":

        this.x = window.innerWidth + 80;
        this.y = centerY - 45;
        this.angle = 180;

    break;

    case "up":

        this.x = centerX - 45;
        this.y = window.innerHeight + 80;
        this.angle = -90;

    break;

    case "down":

        this.x = centerX + 45;
        this.y = -80;
        this.angle = 90;

    break;
    }

        this.draw();

    }

    draw(){

        this.element.style.left = this.x + "px";

        this.element.style.top = this.y + "px";
        this.element.style.transform =
         `translate(-50%, -50%) rotate(${this.angle}deg)`;


    }

}


startBtn.onclick = () => {

    running = true;

}

stopBtn.onclick = () => {

    running = false;

}

function spawnCar() {

    const directions = [
        "left",
        "right",
        "up",
        "down"
    ];

    const direction =
        directions[Math.floor(Math.random() * directions.length)];

    const car = new Car(direction);

    cars.push(car);

}

setInterval(() => {

    if (!running) return;

    if (cars.length < 25) {

        spawnCar();

    }

}, 2000);
function drawCars() {

    cars.forEach(car => {

        car.draw();

    });

}

function canMove(car) {

    for (let other of cars) {

        if (car === other) continue;

        if (car.direction !== other.direction) continue;

        switch (car.direction) {

            case "left":

                if (other.x > car.x &&
                    other.x - car.x < 70)
                    return false;

                break;

            case "right":

                if (car.x > other.x &&
                    car.x - other.x < 70)
                    return false;

                break;

            case "up":

                if (car.y > other.y &&
                    car.y - other.y < 70)
                    return false;

                break;

            case "down":

                if (other.y > car.y &&
                    other.y - car.y < 70)
                    return false;

                break;

        }

    }

    return true;

}

function moveCars() {

    cars.forEach(car => {

        let stop = false;

        if (car.direction === "left") {

            if (
                !horizontalGreen &&
                car.x > centerX - 170 &&
                car.x < centerX - 70
            ) {

                stop = true;

            }

            if (!stop && canMove(car)) {

                car.x += car.speed;

            }

        }
        else if (car.direction === "right") {

            if (
                !horizontalGreen &&
                car.x < centerX + 120 &&
                car.x > centerX + 20
            ) {

                stop = true;

            }

            if (!stop && canMove(car)) {

                car.x -= car.speed;

            }

        }

        else if (car.direction === "up") {

            if (
                horizontalGreen &&
                car.y < centerY + 120 &&
                car.y > centerY + 20
            ) {

                stop = true;

            }

            if (!stop && canMove(car)) {

                car.y -= car.speed;

            }

        }

        else if (car.direction === "down") {

            if (
                horizontalGreen &&
                car.y > centerY - 170 &&
                car.y < centerY - 70
            ) {

                stop = true;

            }

            if (!stop && canMove(car)) {

                car.y += car.speed;

            }

        }

    });

}

function removeCars() {

    cars = cars.filter(car => {

        const outside =

            car.x < -150 ||
            car.x > window.innerWidth + 150 ||
            car.y < -150 ||
            car.y > window.innerHeight + 150;

        if (outside) {

            car.element.remove();

            return false;

        }

        return true;

    });

}
const SIGNAL_TIME = 5000;

function updateSignals() {

    [red1, red2, red3, red4].forEach(light => {
        light.classList.remove("red");
    });

    [yellow1, yellow2, yellow3, yellow4].forEach(light => {
        light.classList.remove("yellow");
    });

    [green1, green2, green3, green4].forEach(light => {
        light.classList.remove("green");
    });

    if (horizontalGreen) {

        green1.classList.add("green");
        green2.classList.add("green");

        red3.classList.add("red");
        red4.classList.add("red");

    } else {

        green3.classList.add("green");
        green4.classList.add("green");

        red1.classList.add("red");
        red2.classList.add("red");

    }

}

updateSignals();

setInterval(() => {

    if (!running) return;

    if (horizontalGreen) {

        green1.classList.remove("green");
        green2.classList.remove("green");

        yellow1.classList.add("yellow");
        yellow2.classList.add("yellow");

        setTimeout(() => {

            yellow1.classList.remove("yellow");
            yellow2.classList.remove("yellow");

            horizontalGreen = false;

            updateSignals();

        }, 1000);

    }

    else {

        green3.classList.remove("green");
        green4.classList.remove("green");

        yellow3.classList.add("yellow");
        yellow4.classList.add("yellow");

        setTimeout(() => {

            yellow3.classList.remove("yellow");
            yellow4.classList.remove("yellow");

            horizontalGreen = true;

            updateSignals();

        }, 1000);

    }

}, SIGNAL_TIME);

function animate() {

    if (running) {

        moveCars();

        removeCars();

    }

    drawCars();

    requestAnimationFrame(animate);

}

animate();