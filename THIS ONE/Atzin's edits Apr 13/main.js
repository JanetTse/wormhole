let score = 0;
let lasers = [];
let gameMode = 0
var monster, ship1, thruster, music, weapon_hit;
let volume = 0.4;
let weapDrops = [];
let pickedUp = false;
let bullets = 0;
let range = 0;

function preload() {
  creature = loadImage("ghost.PNG");
  wormmhole = loadImage("wormhole.PNG");

  monster = loadSound("Monster Music.wav");
  ship1 = loadSound("ship.mp3");
  thruster = loadSound("thruster.mp3");
  music = loadSound("Music_01.wav");
  weapon_hit = loadSound("Gunshot.wav"); 
}

function setup() {
  resetSketch();

let resetButton =  createButton("Reset");
resetButton.mousePressed(resetSketch);
}

function resetSketch(){
  score = 0
  lasers = [];
  gamemode = 0
  weapDrops = [];
  pickedUp = false;
  wormholes = [];
  instCreatures = [];
  bullets = 0

  createCanvas(windowWidth, windowHeight-24);
  ship = new Ship();
  wormhole0 = new Wormhole(createVector(200, 300));
  wormholes.push(wormhole0)
  gameOverScreen = createGraphics(100, 100);
  gameOverScreen.background(255, 0, 0);
  gameMode = 0;
  //sound volumes
  thruster.setVolume(volume);
  music.setVolume(volume); 
  weapDrop = new WeapDrop();
  range = floor(random(6,10));
}



function draw() {
  if (gameMode == 0){
    startScreen();
  } else if (gameMode == 1){
    draw1();
  } else {
    gameOver();
  }
  // console.log(`Gamemode: ${gameMode}`);
}

function draw1(){
  background(0);

  console.log(keyCode);

  //plays bg music
  if (!music.isPlaying()) {
    console.log("should be playing");
    music.loop();
    // music.setVolume(0.2);
  }

  for (i=0; i < wormholes.length; i++){
    wormholes[i].create();
    wormholes[i].collide();
  }
  
  //Creature functions
  for (i=0; i < instCreatures.length; i++){
    instCreatures[i].move();
    instCreatures[i].collide();
  }

  //Make ship appear
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  move();

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    lasers[i].hits();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } 
  }
  
  weapDrop.weaponPickUp();
  //UI
  scoreUI();
}

function keyPressed(){
  if (gameMode == 0) {
    gameMode++;
  }
  if (key == ' ' && gameMode==1 && pickedUp == true){
    lasers.push(new Laser(ship.pos, ship.heading - PI/2));
    bullets = bullets + 1;
  }
  if (keyCode == 38){
    if(!thruster.isPlaying()) thruster.loop();
  }
}

//this is the code for the title screen
function startScreen() {
  background(0);

  if (!music.isPlaying()) {
    music.play();
  }

  //rect(400,155, CENTER, windowHeight/8);
  // color(white);
  textSize(100);
  textAlign(CENTER);
  textFont("Arial Black");
 
  fill(255);
  text("WORMHOLE", width / 2, height / 2 - 100);
  textSize(24);
  text("Press Any Key to Play", width / 2, height / 2 - 200);

  //Creature functions
  for (i = 0; i < instCreatures.length; i++) {
    instCreatures[0].move();
  }

  //Make ship appear
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  move();

  
}

// function loopSounds(){
//   while(keyIsDown(UP_ARROW)){
//     thruster.loop();
//   }if(keyReleased(UP_ARROW)){
//     thruster.stop();
//   }
// }