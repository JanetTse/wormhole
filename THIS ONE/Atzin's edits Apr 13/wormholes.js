let wormholes = [];
wormholeSize = [50, 50];

//Wormhole
class Wormhole{
  constructor(vector, type = 0, overlap = true){
    this.vector = vector;
    this.overlap = overlap;
    this.type = type;
  }

  create(){
    push();
    translate(this.vector.x, this.vector.y);
    image(wormmhole, 0, 0, wormholeSize[0], wormholeSize[1]);
    pop();
  }

  collide(){
    //console.log(this.type);
    let distance = dist(this.vector.x, this.vector.y, ship.pos.x, ship.pos.y);

    fill(255);
    

    if (distance < wormholeSize[0]){
      switch (this.type){
        case 0: //Wormhole gives you points
          score++;
          newPlane();
          break;
        case 1: //Actually a creature
          ghostTrap(this.vector.x, this.vector.y, this);
          break;
        default:
          console.log(`Type ${this.type}`);
      }
    }
  }
}