
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.height = 50;
  this.width = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = (this.x + (dt * this.speed));
  var sizeWidth = ctx.canvas.clientWidth;
  if ( this.x > sizeWidth) {
    this.x = 0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-horn-girl.png';
  this.x = 202;
  this.y = 400;
  this.step = 82;
  this.sidestep = 100;
  this.score = 0;
  this.height = 50;
  this.width = 50;
};

// Update the player position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
  //Check boundaries and score update
  if (this.y < -8) {
    this.score += 100;
  };
  if (this.y < -8 || this.y > 400) {
    this.y = 400;
  };
  if (this.x < 2) {
    this.x = 2;
  };
  if (this.x > 402) {
    this.x = 402;
  };
};

// Handling player movement with distance steps and direction
Player.prototype.handleInput = function(input) {
  console.log(this.score)
  switch (input) {
    case 'up':
      this.y = this.y - this.step;
      break;
    case 'down':
      this.y = this.y + this.step;
      break;
    case 'left':
      this.x = this.x - this.sidestep;
    break;
    case 'right':
      this.x = this.x + this.sidestep;
    break;
    default:
  }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.clearRect(0, 50, 800, -30);
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  var text = `Score: ${this.score}`;
  ctx.fillText(text,10,40);
};

Player.prototype.reset = function() {
  this.y = 400;
  this.score -= 80;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
var enemyPositions = [300, 230, 145, 60];
//Random speed generator for enemies
var createEnemies = function() {
  for (var i = 0; i < enemyPositions.length; i++) {
    enemy = new Enemy(-100, enemyPositions[i], (Math.floor((Math.random() * 500) + 100)));
    allEnemies.push(enemy);
  }
};
createEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
