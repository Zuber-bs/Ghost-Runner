var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var edges;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 2;

  // Player
  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.35;

  // Edges
  edges = createEdgeSprites();


  // Groups
  climbersGroup = createGroup();
  doorsGroup = createGroup();
  invisibleBlockGroup = createGroup();
}

function draw() {
  background(0);

  if (gameState === "play") {
    drawSprites();
    // Tower
    if (tower.y > 600) {
      tower.y = 0;
    }

    // Player
    if (keyDown("space")) {
      ghost.velocityY = -13;
    }
    ghost.velocityY += 0.8;

    if (keyDown("left")) {
      ghost.x -= 3;
    } else if (keyDown("right")) {
      ghost.x += 3;
    }

    ghost.collide(edges[0]);
    ghost.collide(edges[1]);

    if (ghost.y > 600 || ghost.isTouching(invisibleBlockGroup)) {
      gameState = "end";
    }

    // Spawn doors
    spawnDoors();
  } else if (gameState === "end") {
    tower.velocityY = 0;
    ghost.velocityY = 0;
    invisibleBlockGroup.destroyEach();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    drawSprites();
    fill(0, 0, 255);
    textSize(32);
    text("GAME OVER!! :", 200, 300);
    // invisibleBlockGroup.setVelocityEach(0);
    // doorsGroup.setVelocityEach(0);
    // climbersGroup.setVelocityEach(0);.destroyEach();

  }

}

function spawnDoors() {

  if (frameCount % 200 === 0) {

    var rand = Math.round(random(65, 535));

    door = createSprite(rand, -65);
    door.addImage(doorImg);
    door.velocityY = 2;
    climber = createSprite(rand, 0);
    climber.addImage(climberImg);
    climber.velocityY = 2;
    invisibleBlock = createSprite(rand, 10, climber.width, 1);
    invisibleBlock.velocityY = 2;

    climbersGroup.add(climber);
    doorsGroup.add(door);
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth += door.depth;

  }

  ghost.collide(climbersGroup);
}

