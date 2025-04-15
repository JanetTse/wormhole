/// When wormhole entered ///
function newPlane(){
  console.log("Type 0");
  wormholes = [];
  instCreatures = [];
  safeHole = false
  for (i = 0; i < score; i++){
    wormholeType = (!safeHole)? 0 : 1;
    safeHole = true;
    wormhole0 = new Wormhole(createVector(random(wormholeSize[0], width - wormholeSize[0]), random(wormholeSize[0], height - wormholeSize[0])), wormholeType);
    wormholes.push(wormhole0)
  }
  //instCreatures.push(new Creature(width/2, height/2))
}

/// Wormhole is actually a creature ///
function ghostTrap(newX, newY, objWormhole){
  //console.log(newX, newY);
  console.log("Type 1");
  instCreatures.push(new Creature(newX, newY))
  // instCreatures.push(new Creature(newX, newY));
  console.log(wormholes.indexOf(objWormhole));
  wormholes.splice(wormholes.indexOf(objWormhole), 1);
}

function gameOver(){
  gameMode = 2;
  image(gameOverScreen, width/2, height/2, width, height);
  textSize(46);
  fill(255);

  let px = width/2
  let py = height/2
  text("GAME OVER", px, py);
  py = py + 40;
  textSize(18);
  text("Score: " + score, px, py);
  py = py + 20;
  text("Bullets Used: " + bullets, px, py);


}