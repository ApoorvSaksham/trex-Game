//Declaring variables for the Game
var trex, trex_running, trex_collided,edges;
var groundImage;
var ground;
var iGround;
var cloud,cloud_Image;
var ob1Image;
var ob2Image;
var ob3Image;
var ob4Image;
var ob5Image;
var ob6Image;
var obstacle;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obsGroup;
var cloudsGroup;
var gameOver, gameOverImage;
var restart, restartImage;
var trexJump;
var trexDie;
var checkPoint;



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloud_Image = loadImage("cloud.png");
  ob1Image = loadImage("obstacle1.png");
  ob2Image = loadImage("obstacle2.png");
  ob3Image = loadImage("obstacle3.png");
  ob4Image = loadImage("obstacle4.png");
  ob5Image = loadImage("obstacle5.png");
  ob6Image = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  trexJump = loadSound("jump.mp3");
  trexDie = loadSound("die.mp3");
  checkPoint = loadSound("checkPoint.mp3");

  
}

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50;
  
  //Creating a ground
  ground = createSprite(300,170,600,20);
  ground.addImage("moving",groundImage);
  
  //Creating Invisible Ground
  iGround = createSprite(300,180,600,10);
  iGround.visible = false;
  
  gameOver = createSprite(300,60,5,5);
  gameOver.addImage("gameoverPic",gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(320,100,5,5);
  restart.addImage("restartPic", restartImage);
  restart.scale = 0.55;
  restart.visible = false;
  
  
  
   
  obsGroup = createGroup();
  cloudsGroup = createGroup();
  trex.debug = false;
  trex.setCollider("rectangle",0,0,100,70);
  
}


function draw(){
  
  //set background color 
  background("white");
  
if(gameState===PLAY){
  spawnClouds();
  spawnObstacles();
  
  //jump when space key is pressed
  if(keyDown("space")&&trex.y>148){
    trexJump.play();
    trex.velocityY = -12;
  }
    trex.velocityY = trex.velocityY + 0.5;
  //moving the Ground
  ground.velocityX = -(3+ score/1000);
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  score = score+Math.round(getFrameRate()/50);
  
  if(obsGroup.isTouching(trex)){
    trexDie.play();
    gameState=END;
  }

  
//Condition to play CheckPoint Sound
if(score%500===0&&score>0){
  checkPoint.play();
 } 


  
}
  else if(gameState===END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    score = 0;
    obsGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.addAnimation("running",trex_collided);
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      reset();
  
  }
 }
  

  

  //stop trex from falling down
  trex.collide(iGround);

  drawSprites();
  text("Score: " +score,520,32);

}

function spawnClouds(){
  if(frameCount%60===0){
  cloud = createSprite(600,65,40,20);
  cloud.y = Math.round(random(20,60));
  cloud.velocityX = -5;
  cloud.lifetime = 120;
  cloud.addImage("cloudPic",cloud_Image);
  cloudsGroup.add(cloud);
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
  }
}

function spawnObstacles(){
  if(frameCount%80===0){
    obstacle = createSprite(600,150,15,15);
    obstacle.velocityX = -(5 + score/1000);
    
    obstacle.lifetime = 130;
    obstacle.scale = 0.6;
   
    var any = Math.round(random(1,6));
    switch(any){
      case 1: obstacle.addImage("obs",ob1Image);
      break;
      case 2: obstacle.addImage("obs",ob2Image);
      break;
      case 3: obstacle.addImage("obs",ob3Image);
      break;
      case 4: obstacle.addImage("obs",ob4Image);
      break;
      case 5: obstacle.addImage("obs",ob5Image);
      break;
      case 6: obstacle.addImage("obs",ob6Image);
      break;
      default:break;
    }
    obsGroup.add(obstacle);
    
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obsGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.addAnimation("running",trex_running);
}










