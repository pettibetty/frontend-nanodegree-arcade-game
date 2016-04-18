var selectedPlayer = prompt("Enter 1 for boy player or 2 for girl player");

// Enemies our player must avoid
var Enemy = function(x, y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    //this.speed = Math.floor((Math.random() * 100) *2);
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    };

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
   this.sprite_2 = 'images/char-cat-girl.png';
   this.sprite_1 = 'images/char-boy.png';
   
  

};

 Player.prototype.update = function() {
   
            
};

Player.prototype.render = function() {
    //Prompt the user for a selection of player   
    switch(selectedPlayer){
        case "1":
            ctx.drawImage(Resources.get(this.sprite_1), this.x, this.y);
            break;
        case "2" :
         
            ctx.drawImage(Resources.get(this.sprite_2), this.x, this.y);  
            break;
        default:
            ctx.drawImage(Resources.get(this.sprite_1), this.x, this.y);     
    }  
       
};

    


Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys == "left") {
        if (this.x > 10) {
            this.x -= 50;
        }
    } else if (allowedKeys == "right") {
        if (this.x <= 350) {
            this.x += 50;
        }
    } else if (allowedKeys == "up") {
        if (this.y > 10 ) {
            this.y -= 50;
        }
        
    
    }
    else if (allowedKeys == "down") {
        if (this.y < 400) {
            this.y += 50;
        }
    }
      
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy_1 = new Enemy(0, 50, 150);
var enemy_2 = new Enemy(50,150, 250);
var enemy_3 = new Enemy(100,220, 200);


var allEnemies = [ enemy_1, enemy_2, enemy_3];

var player = new Player(200,430);






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

//Check if a Collision has happened
//If so then call the reset function, which bring the player back to the starting point otherwise player wins and game restarts.
function checkCollisions(){
    //a variable to collect the core
    var new_score;

    //Position of the player after the reset
    var reset = function () {
        player.x = 200;
        player.y = 380;
    }
     document.getElementById("myScore").defaultValue = 0;

    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x <= (player.x + 30) &&
            (allEnemies[i].x + 30) >= player.x &&
            allEnemies[i].y <= (player.y + 30) &&
            (allEnemies[i].y + 30) >= player.y) {

             if(parseInt(document.getElementById('myScore').value) == 0) {

                document.getElementById('myScore').value = 0;
             }
             else {
                 new_score = parseInt(document.getElementById('myScore').value ) - 1;
                document.getElementById('myScore').value = new_score;

             }
            reset();
       
        }
      }

    if (player.y == -20){
      reset();
      new_score = document.getElementById('myScore').value;
      document.getElementById('myScore').value = parseInt(new_score) + 1;
    }
}


