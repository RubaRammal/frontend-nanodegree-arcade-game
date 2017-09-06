'use strict';
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Set the y position of the enemy to one of three values (52, 134, 216) 
    // This way the enemies will only appear on the stones (not grass or water)
    // The position will be chosen randomly for each instance,
    // based on the value of the var random which will either be 0, 1 or 2
    var yPos = [52, 134, 216];
    var random = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    this.y = yPos[random];
    this.x = 0;
    // Speed of the enemy is a random number between 200 and 400
    this.speed = Math.floor(Math.random() * (400 - 200 + 1) + 200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    if (!this.checkCollision()) {
        if (this.x > 505) {
            this.x = 0;
        } else {
            this.x = this.x + this.speed * dt;
        }
    } else {
        player.collision = true;
        player.reset();
    }
};

// Check that no collision is occurring while moving an enemy
// Collision points are the player's x position +/- 50 and enemies y positions (52, 134, 216) 
Enemy.prototype.checkCollision = function() {
    if ((this.x <= player.x + 50 && this.x >= player.x - 50 && this.y == player.y)) 
        return true;
    return false;
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// The player that avoids enemies and tries to reach water
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 201;
    this.y = 380;
    this.newX = 0;
    this.newY = 0;
    this.score = 0;
    this.collision = false;
    this.lives = 3;

};

// Checks collision with enemies
Player.prototype.update = function() {
    // for (var i = 0; i < allEnemies.length; i++) {
    //     if(allEnemies[i].checkCollision()){
    //         this.collision = true;
    //         this.reset();
    //     }
    // }
};

// Resets the player position to the starting position
// If collision occurs and lives are available, score does not reset but does not increase
// lives are decreased by one
// If collesion occurs and 1 life is available, score resets and lives reset
// If the player reached water and no collision occured, score is increased by one 
Player.prototype.reset = function() {
    this.x = 201;
    this.y = 380;
    this.newX = 0;
    this.newY = 0;
    if (!this.collision) {
        this.score += 1;
    } else if (this.lives > 1 && this.collision) {
        this.lives -= 1;
        this.collision = false;
    } else {
        this.score = 0;
        this.collision = false;
        this.lives = 3;
    }
};

// Draw the player, lives and score on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.font = "30px Arial";
    ctx.fillText('SCORE: ' + this.score, 10, 575);

    var x = 450;
    var y = 520;
    for (var i = 0; i < this.lives; i++) {
        ctx.drawImage(Resources.get('images/Heart.png'), x, y, 50, 70);
        x = x - 50;
    }
};

// Handles keyboard pressed to update the player's position on the canvas
// Parameter: direction, player's direction based on the pressed key
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.newX = this.x - 100;
            if (this.newX > 0) {
                this.x = this.newX;
            }
            break;

        case 'right':
            this.newX = this.x + 100;
            if (this.newX < 500) {
                this.x = this.newX;
            }
            break;

        case 'up':
            this.newY = this.y - 82;
            if (this.newY > 0) {
                this.y = this.newY;
            } else {
                // Game won, reset
                this.reset();
            }
            break;

        case 'down':
            this.newY = this.y + 82;
            if (this.newY < 400) {
                this.y = this.newY;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

var player = new Player();




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