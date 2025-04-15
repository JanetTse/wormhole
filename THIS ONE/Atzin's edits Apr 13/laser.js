// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code form: https://youtu.be/hacZU523FyM


function Laser(spos, angle) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);

  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.render = function() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function() {
    for (i = 0; i < instCreatures.length; i++){
      var d = dist(this.pos.x, this.pos.y, instCreatures[i].x, instCreatures[i].y);
      if (d < instCreatures[i].creatureWidth/2 && instCreatures[i].cooldown == 0) {
        instCreatures.splice(instCreatures.indexOf(instCreatures[i]), 1);;
        console.log("Monster killed");
      }
    }
  }

  this.offscreen = function() {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }
}
