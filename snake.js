class settings {
  constructor() {
    // oletukset
    this.fieldWidth = 300;
    this.fieldHeight = 300;
    this.snakeLength = 3;
    this.snakeSpeed = 500;
    this.field = null;
  }
  setFieldSize(width, height) {
    this.fieldWidth = width;
    this.fieldHeight = height;
  }
  drawField() {
    this.field = document.createElement("div");
    this.field.setAttribute("id", "field");
    this.field.style.width = this.fieldWidth + "px";
    this.field.style.height = this.fieldHeight + "px";
    this.field.style.display = "inline-block";
    document.getElementById("gameWindow").appendChild(this.field);
    console.log("Field drawn");
  }
}

class snakeCell {
  constructor(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.id = "cell" + num;
    this.div = document.createElement("div");
    this.div.setAttribute("id", this.id);
    // make head different color - other cells get color from class snakeCell
    (this.num != 1) ? this.div.setAttribute("class", "snakeCell") : "";
    this.div.style.left = this.x + "px";
    this.div.style.top = this.y + "px";
    document.getElementById("field").appendChild(this.div);
    console.log(this.id + " drawn");
    this.next = null; // used to point to next cell in snake
  }
  moveCell(newX, newY) {
    if(this.next != null) {
      // if this isn't the last cell, give my position to the next in line
      this.next.moveCell(this.x, this.y);
    }
    // after I've given my position to the next in line, I can move forward
    this.x = newX;
    this.y = newY;
    this.div.style.left = this.x + "px";
    this.div.style.top = this.y + "px";
  }
  checkCollision(x, y) {
    if(this.x == x && this.y == y) {
      // hit!
      return 1;
    }
    if(this.next != null) {
      // check the next cell
      return this.next.checkCollision(x, y);
    }
    return 0;
  }
}

class snake {
  constructor(x, y) {
    this.direction = "up"; // up at the beginning
    this.fieldWidth = x - 10; // substract the size of a cell from width & height
    this.fieldHeight = y - 10;
    this.alive = 1;
    this.score = 0;
    this.head = null // for now we don't have a head yet
    this.num = 0; // so for now # of cells is 0
    this.foodX = 0;
    this.foodY = 0;
    this.food = document.createElement("div");
    this.food.setAttribute("id", "food");
    this.setFood();
    document.getElementById("field").appendChild(this.food);
  }
  add(x, y) {
    // create new cell to give coordinate and give it the number
    const newCell = new snakeCell(x, y, ++this.num);
    if(this.head == null) {
      // this is a new snake, so let's make a head
      this.head = newCell;
      console.log("Snake given a head!");
    }
    else {
      // otherwise we'll add a cell to the snake
      let currentCell = this.head;
      while(currentCell.next != null) {
	currentCell = currentCell.next;
      }
      // we are at the end of the tail, next points to emptyness
      currentCell.next = newCell;
      console.log("Added cell #" + this.num);
    }
  }
  setDirection(direction) {
    switch (direction) {
      case 38:
	this.direction = "up";
        break;
      case 40:
	this.direction = "down";
        break;
      case 37:
	this.direction = "left";
        break;
      case 39:
	this.direction = "right";
        break;
      default:
        break;
    }
  } 
  move() {
    if(this.alive<1) {
      // snake dead -> let's finish things up!
      this.gameOver();
    }
    let headX = this.head.x;
    let headY = this.head.y;
    switch (this.direction) {
      case "up":
	headY -= 10;
        break;
      case "down":
        headY += 10;
        break;
      case "left":
	headX -= 10;
        break;
      case "right":
	headX += 10;
        break;
      default:
        break;
    }
    if(headX<0 || headX>this.fieldWidth)
      this.alive = 0;
    if(headY<0 || headY>this.fieldHeight)
      this.alive = 0;
    this.head.moveCell(headX, headY);
    let hit = 0;
    hit = this.head.next.checkCollision(headX, headY);
    if(hit>0) {
      // head collided with the tail
      this.alive = 0;
    }
  }
  setFood() {
    let x = this.fieldWidth / 10;
    let y = this.fieldHeight / 10;
    x *= Math.random();
    y *= Math.random();
    this.foodX = Math.floor(x) * 10;
    this.foodY = Math.floor(y) * 10;
    // console.log(x);
    // console.log(y);
    this.food.style.left = this.foodX + "px";
    this.food.style.top = this.foodY + "px";
  }
  gameOver() {
    let field = document.getElementById("field");
    field.parentNode.removeChild(field);
    /*
    this.finish = document.createElement("div");
    this.finish.setAttribute("id", "gameover");
    this.finish.innerHTML = "GAME OVER";
    let elem = document.getElementById("gameWindow");
    elem.replaceChild(this.finish, elem.childNodes[1]);
    */
  }
}

makeSettingsWindow();
// startGame();

function makeSettingsWindow() {
  let p = document.createElement("p");
  p.innerHTML = "Game settings";
  document.getElementById("settingsWindow").appendChild(p);
  let widthLabel = document.createElement("label");
  widthLabel.innerHTML = "Width: ";
  document.getElementById("settingsWindow").appendChild(widthLabel);
  let widthInput = document.createElement("input");
  widthInput.setAttribute("id", "width");
  widthInput.setAttribute("type", "number");
  widthInput.setAttribute("min", "10");
  widthInput.setAttribute("max", "80");
  widthInput.setAttribute("value", "20");
  document.getElementById("settingsWindow").appendChild(widthInput);
  let heightLabel = document.createElement("label");
  heightLabel.innerHTML = "Height: ";
  document.getElementById("settingsWindow").appendChild(heightLabel);
  let heightInput = document.createElement("input");
  heightInput.setAttribute("id", "height");
  heightInput.setAttribute("type", "number");
  heightInput.setAttribute("min", "10");
  heightInput.setAttribute("max", "50");
  heightInput.setAttribute("value", "20");
  document.getElementById("settingsWindow").appendChild(heightInput);
  let button = document.createElement("button");
  button.innerHTML = "start!";
  button.onclick = function() {
    startGame();
  };
  document.getElementById("settingsWindow").appendChild(button);
  let hr = document.createElement("hr");
  document.getElementById("settingsWindow").appendChild(hr);
  let scoreField = document.createElement("p");
  scoreField.setAttribute("id", "scoreField");
  scoreField.innerHTML = "Score: ";
  document.getElementById("gameWindow").appendChild(scoreField);
}

function startGame() {
  const game = new settings();
  let width = document.getElementById("width").value * 10;
  let height = document.getElementById("height").value * 10;
  game.setFieldSize(width, height);
  game.snakeLength = 3;
  game.snakeSpeed = 300;
  game.drawField();
  
  const snakeMan = new snake(game.fieldWidth, game.fieldHeight);
  let startX = game.fieldWidth / 2;
  let startY = game.fieldHeight / 2;
  let speed = game.snakeSpeed;
  for(let i=1;i<=game.snakeLength;i++)
    snakeMan.add(startX, startY);
  

  var timer = setInterval(moveSnake, speed);
  
  // had to study this:
  //   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  document.addEventListener("keydown", event => {
    snakeMan.setDirection(event.keyCode);
    if(event.keyCode==32) {
      // clearInterval(timer);
      snakeMan.alive = 0;
      // snakeMan.gameOver();
    }
  });

  function moveSnake() {
    snakeMan.move();
    if(snakeMan.alive == 0) {
      clearInterval(timer);
      snakeMan.gameOver();
    }
    if(snakeMan.head.x == snakeMan.foodX && snakeMan.head.y == snakeMan.foodY) {
      snakeMan.add(snakeMan.head.x, snakeMan.head.y);
      snakeMan.score++;
      let scoreField = document.getElementById("scoreField");
      scoreField.innerHTML = "Score: " + snakeMan.score;
      snakeMan.setFood();
    }
  }

}

