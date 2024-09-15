import '../CSS/Snake.css';

const width = 10;
const height = 10;


var squares =
	[]; /* representation of what the canvas should be showing ... s=snake, a=apple, x=blank */

var snake = [
	[0, 2],
	[0, 1],
	[0, 0],
]; // head is front, tail is back
var apple = null;

var moving_direction = "ArrowRight";
var latest_direction = "ArrowRight";

var started = false;

document.addEventListener("keydown", onKey);

window.onload = function ()  {
	placeRandomApple();
	draw();
};

function startGame() {
	createBoard();
	setInterval(frame, 350);
}

function indexToCoordinates(index) {
	return [index % width, Math.floor(index / height)];
}

function coordinatesToIndex(x, y) {
	return x + y * width;
}


function createBoard() {
	createSquares();
	if (apple == null) {
		placeRandomApple();
	}
	draw();
}

function placeRandomApple() {
	let apple_coords = snake[0];
	placed = false;
	while (!placed) {
		apple_coords = indexToCoordinates(
			Math.floor(Math.random() * width * height)
		);
		placed = true;
		snake.forEach(pos => {
			if (apple_coords[0] == pos[0] && apple_coords[1] == pos[1]) {
				placed = false;
			}
		});
	}
	apple = apple_coords;
}


function onKey(key) {
	/* trigged on key press, activates the movement mechanics */
	if (key.code === "Space") {
		location.reload();
	} else if (equalsInverseDirection(key.code)) {
		return;
	} else {
		latest_direction = key.code;

		if (!started) {
			started = true;
			startGame();
		}
	}
}

function equalsInverseDirection(code) {
	/* checks if the current direction is the opposite direction of the given key code (supports arrows and WASD) */
	switch (code) {
		case "ArrowUp":
		case "KeyW":
			return ["ArrowDown", "KeyS"].includes(moving_direction);
		case "ArrowRight":
		case "KeyD":
			return ["ArrowLeft", "KeyA"].includes(moving_direction);
		case "ArrowDown":
		case "KeyS":
			return ["ArrowUp", "KeyW"].includes(moving_direction);
		case "ArrowLeft":
		case "KeyA":
			return ["ArrowRight", "KeyD"].includes(moving_direction);
		default:
			return null;
	}
}

function frame() {
	/* updates the frame in the game */
	calculateHead();
	checkForSelfCollision();
	draw();
}

function checkForSelfCollision() {
	let head = snake[0];
	snake.slice(1).forEach(pos => {
		if (pos[0] == head[0] && pos[1] == head[1]) {
			alert("You ran into yourself! Press \"OK\" to try again.");
			location.reload();
		}
	});
}

function calculateHead() {
	/* moves the head in the indicated arrow direction */
	let head_coords = snake[0];
	let new_coords = [-1, -1];
	switch (latest_direction) {
		case "ArrowUp":
		case "KeyW":
			new_coords = [head_coords[0] - 1, head_coords[1]];
			break;
		case "ArrowRight":
		case "KeyD":
			new_coords = [head_coords[0], head_coords[1] + 1];
			break;
		case "ArrowDown":
		case "KeyS":
			new_coords = [head_coords[0] + 1, head_coords[1]];
			break;
		case "ArrowLeft":
		case "KeyA":
			new_coords = [head_coords[0], head_coords[1] - 1];
			break;
		default:
			return false;
	}
	let head = new_coords;
	if (head[0] < 0) {
		head[0] = width - 1;
	}
	if (head[0] >= width) {
		head[0] = 0;
	}
	if (head[1] < 0) {
		head[1] = height - 1;
	}
	if (head[1] >= width) {
		head[1] = 0;
	}
	snake.unshift(head);

	if (apple[0] != head[0] || apple[1] != head[1]) {
		snake.pop();
	} else {
		placeRandomApple();
	}
	moving_direction = latest_direction;
	return true;
}

function createSquares() {
	/* sets `squares` to an empty array of width x height "x" */
	squares = [];
	for (let i = 0; i < width; i++) {
		squares.push([]);
		for (let j = 0; j < height; j++) {
			squares[i].push("x");
		}
	}
}

function setSquares() {
	/* notes `squares` to the existing entities */
	snake.forEach((pos) => {
		squares[pos[0]][pos[1]] = "s";
	});
	squares[snake[0][0]][snake[0][1]] = "h";

	if (apple != null) {
		squares[apple[0]][apple[1]] = "a";
	}
}

function draw() {
	/* draws `squares` to the canvas */
	createSquares();
	setSquares();
	let canvas = document.querySelector("div canvas");
	let ctx = canvas.getContext("2d");
	for (let i = 0; i < 600; i += 60) {
		for (let j = 0; j < 600; j += 60) {
			item = squares[j / 60][i / 60];
			let fill = "";
			let is_bordered = false;
			switch (item) {
				case "x":
					fill = "#222222";
					break;
				case "s":
					fill = "#00ff00";
					is_bordered = true;
					break;
				case "h":
					fill = "#00bb00";
					is_bordered = true;
					break;
				case "a":
					fill = "#ff0000";
					is_bordered = true;
					break;
				default:
					fill = "#0000ff";
					break;
			}
			ctx.fillStyle = "#222222";
			ctx.fillRect(i, j, 60, 60);	
			ctx.fillStyle = fill;
			if (is_bordered) {
				ctx.fillRect(i+5, j+5, 50, 50);
			}
		}
	}
}

function Snake() {
    return (
        <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Snake</title>
        <link rel="stylesheet" href="/CSS/snake.css" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon-2.ico?" />
        <div className="container">
            <div className="card">
            <h3>move using arrow keys or WASD</h3>
            <div>
                <canvas width={600} height={600} id="snake" />
            </div>
            <div className="hallow-buttons">
                <a href="/play.html">go back</a>
            </div>
            </div>
        </div>
        </>
    );
}

export default Snake;