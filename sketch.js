//Gamestate
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, bground, backImage,invisibleGround; 
var bananaImage, stoneImage;
var obstaclesGroup,bananaGroup;
var score;


function preload() {
  /* preload images here */
  backImage = loadImage("jungle.jpg");
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  stoneImage = loadImage("stone.png");
 
}

function setup() {
  createCanvas(700, 400);
  
  bground = createSprite(10,20,600,0);
  bground.addImage("bground",backImage);
  bground.scale=1.4;
  bground.velocityX = -2;
  bground.x = bground.width/2;
  
  player = createSprite(50,360,20,50);
  player.addAnimation("player running", player_running);
  player.scale = 0.1;
  
  invisibleGround = createSprite(100,360,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(255);
  
  if(gameState === PLAY){
    //When the space key is pressed, the monkey should jump
    if(keyDown("space") && player.y >= 280){
      player.velocityY = -16;
    }
    
    //add gravity
    player.velocityY = player.velocityY + 0.8;

    //stop player from falling down
    player.collide(invisibleGround);

    if(bground.x < 0){
      bground.x = 200;
    }

    switch(score){
      case 10 : player.scale = 0.12;
        break;
      case 20 : player.scale = 0.14;
        break;
      case 30 : player.scale = 0.16;
        break;
      case 40 : player.scale = 0.18;
        break;
      default: break;
      }

    if(bananaGroup.isTouching(player)){
      score = score+2;
      bananaGroup.destroyEach();  
    }

    if(obstaclesGroup.isTouching(player)){
      player.scale = 0.08;
    }
    
    obstacles();
    food();
  }
    
  if(obstaclesGroup.isTouching(player)){
    gameState=END;
    bananaGroup.setLifetimeEach(0);
    obstaclesGroup.setLifetimeEach(0);
    player.velocityX = 0;
    bground.velocityX = 0;
    player.scale=0;
  }
  
  drawSprites();
  
  if(gameState === END){
    stroke("white");
    textSize(32);
    fill("white");
    text("Game Over", 220,200);
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,580,40);
  
}

function food() {
  if(World.frameCount % 80 === 0) {
    banana = createSprite(600,random(120,200),50,50);
    banana.scale = 0.06;
    banana.addAnimation("Fruit",bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 130;
    bananaGroup.add(banana);
  }
}


function obstacles() {
  if(World.frameCount % 200 === 0){
    var obstacle = createSprite(500,340,50,50);
    obstacle.addAnimation("Stone", stoneImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 130;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}