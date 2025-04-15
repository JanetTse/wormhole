let weapon;

class Weapon{
  constructor(pos, size, heading){
    this.pos = pos
    this.size = size
    this.heading = heading

  }
  

  render(){

    push();
    rectMode(CENTER);
    fill(30, 30, 70);
    stroke(255);
    strokeWeight(2);
    translate(this.pos, this.pos+20);
    rotate(this.heading);
    rect(0, ship.r*2/4, this.size/2, this.size);
    rect(0, ship.r, this.size, this.size*3/4);
    pop();
  }
}


