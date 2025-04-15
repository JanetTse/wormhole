class WeapDrop{
  constructor(x,y,size){
    this.x = x;
    this.y = y;
    this.size = size;
}
  collide(){
    let wepDist = dist(ship.pos.x, ship.pos.y, this.x, this.y);
    if (wepDist < 30){
  pickedUp = true
  }
  }
  render(){
    push();
    rectMode(CENTER);
    fill(30, 30, 70);
    stroke(255);
    strokeWeight(2);
  
    rect(this.x, this.y - this.size*1/2, this.size/2, this.size);
    rect(this.x, this.y, this.size, this.size*3/4);
    pop();
    
  }

  weaponPickUp(){
    for (i = 0; i < weapDrops.length; i++){
      weapDrops[0].render();
      weapDrops[0].collide();
    }
    

    if (score == range && weapDrops.length <= 1 ){
     weapDrops.push(new WeapDrop(random(width),random(height),20)); 
    }
  
    if(pickedUp == true){
      weapon = new Weapon(ship.pos, ship.r, ship.heading);
      weapon.render(); 
      weapDrops = [];
    }
  }

  

}