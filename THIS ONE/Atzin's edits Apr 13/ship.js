// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

let ship;

function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);

  if (keyCode === 38){
    thruster.stop();
  }
}

function move(){
  
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    ship.setRotation(0.1)}
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
    ship.setRotation(-0.1)}
  if (keyIsDown(87) || keyIsDown(UP_ARROW)){
    ship.boosting(true);
    if (!thruster.isPlaying() && (ship.vel.x < 0.1 && ship.vel.x > -0.1) && (ship.vel.y < 0.1 && ship.vel.y > -0.1)) {
      thruster.setVolume(volume-0.2);
      thruster.play();
      // console.log(ship.vel.array())
      // console.log((ship.vel.x < 0.1), (ship.vel.x > -0.1));
      // console.log((ship.vel.y < 0.1), (ship.vel.y > -0.1));
    }
  }
}




class Ship {
  constructor() {

    this.pos = createVector(width / 2, height / 2);
    this.r = 15;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.isBoosting = false;

    this.boosting = function (b) {
      this.isBoosting = b;
    };


    this.update = function () {
      if (this.isBoosting) {
        this.boost();
      }
      this.pos.add(this.vel);
      this.vel.mult(0.95);
    };


    this.boost = function () {
      var force = p5.Vector.fromAngle(this.heading - PI / 2);
      force.mult(0.5);
      this.vel.add(force);
    };



    this.render = function () {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.heading);
      noFill();
      stroke(255);
      strokeWeight(2);
      triangle(-this.r, this.r, this.r, this.r, 0, -20 - this.r);
      line(-this.r, this.r, -4 - this.r, this.r + 13.333);
      line(this.r, this.r, this.r + 4, this.r + 13.333);
      pop();
    };

    this.edges = function () {
      if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
      } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
      }
      if (this.pos.y > height + this.r) {
        this.pos.y = -this.r;
      } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
      }
    };

    this.setRotation = function (a) {
      this.rotation = a;
    };

    this.turn = function () {
      this.heading += this.rotation;
    };
  }
}