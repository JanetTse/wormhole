// Some code borrowed from Asherr Ratz
let creature;
let instCreatures = [];

class Creature{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.targetAngle = 0.0;
    this.currentAngle = 0.0;
    this.smoothSpeed = 0.01 * Math.floor(Math.random() * 5) + 0.04;
    // this.smoothSpeed = 0.05; // Smooth rotation
    this.speed = Math.floor(Math.random() * 5)+1;
    this.creatureWidth = 60; // Width of creature image
    this.creatureHeight = 60; // Height of creature image
    this.cooldown = 1*frameRate(); //Time before creature can destroy ship
    this.active = false; // By default, the creature can't attack the player
    this.baseAngle = 0;
  }

  move(){
    if (!this.cooldown){
      this.active = true;
      this.targetAngle = atan2(ship.pos.y - this.y, ship.pos.x - this.x);  // Get angle from pet to mouse

      // Smooth angle difference - avoids large jumps
      let angleDiff = this.targetAngle - this.currentAngle;
  
      // Normalize angle difference to range -PI to PI
      while (angleDiff > PI) angleDiff -= TWO_PI;
      while (angleDiff < -PI) angleDiff += TWO_PI;
  
      // Smooth transition
      this.currentAngle += angleDiff * this.smoothSpeed;
  
      rectMode(CENTER);
   
  
      let moveX = cos(this.currentAngle) * this.speed;
      let moveY = sin(this.currentAngle) * this.speed;
  
      // Update pet pos. smoothly
      this.x += (moveX*2);
      this.y += (moveY*2);
      // }
  
      // Creature doesn't go out of bounds
      this.x = constrain(this.x, 30, width - this.creatureWidth / 2);
      this.y = constrain(this.y, 30, height - this.creatureHeight / 2);
  
      // Check if mouse is clicked on creature (within bounds)
    } else {
      // console.log(`Cooldown: ${this.cooldown}`);
      this.cooldown--;
      this.cooldown = constrain(this.cooldown, 0, 1000);
    }


    
    // Draw image based on mouse interaction
    imageMode(CENTER);  // Set image mode to draw from center
    push();  // Save current drawing state
    translate(this.x, this.y);  // Move origin to creature's position
    this.baseAngle = Math.abs((this.currentAngle + PI)%(PI*2))
    //FLIP CREATURE
    if (ship.pos.x > this.x) {
      scale(-1, 1);
    }
    image(creature, 0, 0, this.creatureWidth, this.creatureHeight);  // Draw creature image normally
    pop();  // Restore drawing state
  }

  collide(){
    let distance = dist(this.x, this.y, ship.pos.x, ship.pos.y);

    //fill(255);
    if (distance < this.creatureWidth - this.creatureWidth*0.5 && this.active){
      gameOver();
    }
  }
}