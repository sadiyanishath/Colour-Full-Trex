var End = 0
var Play = 1
var score = 0

var gamestate = Play

var groundimage,inground,overimage,oversound

var cloudsGroup,cloudimage,resetimage,jumpsound

var obstaclesGroup,cac1,cac2,cac3,cac4,sunimage

var trex,trex_running,trex_collided,trex_jump,backimage



function preload(){
  
  cloudimage = loadImage("cloud11.png")
  
  cac1 = loadImage("cac1.png")
  
  cac2 = loadImage("cac2.png")
  
  cac3 = loadImage("cac3.png")
  
  cac4 = loadImage("cac4.png")
  
  groundimage = loadImage("grou.png")
  
  sunimage = loadImage("sun.png")
  
  backimage = loadImage("back.png")
  
  overimage = loadImage ("over.png")
  
  resetimage = loadImage("reset.png")
  
  oversound = loadSound("over.mp3")
  
  jumpsound = loadSound("jumps.mp4")
  
  trex_collided = loadAnimation("collided.png")
  
  trex_jump = loadAnimation("jump.png")
  
  trex_running = loadAnimation(
   "d (2).png","d (3).png","d (4).png","d (5).png",
   "d (6).png","d (7).png","d (8).png" )
 

  
}


function setup(){
  createCanvas(windowWidth,windowHeight)
  
   ground = createSprite(width/2,height,width,150)
  ground.addImage("ground",groundimage)
  ground.scale=0.25
  ground.x = width/2
  
  inground = createSprite(width/2,height-10,width,10)
  inground.visible=0;
  
   trex = createSprite(80,height-30,30,30)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.addAnimation("jump",trex_jump)
  trex.scale=0.15
 
  sun = createSprite(width-60,70)
  sun.addImage(sunimage)
  sun.scale=0.3
  
  over = createSprite(width/2,height/3)
  over.addImage(overimage)
  over.scale=0.5
  over.visible = false
  
  reset = createSprite (width/2,height/2.2)
  reset.addImage(resetimage)
  reset.scale=0.2
  reset.visible = false
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
 
  score = 0
}

function draw(){
  background(backimage)
  
  textSize(20);
  fill("black")
  text("Score: "+ score,20,40);
  
  if(gamestate === Play){
  
   score = score + Math.round(getFrameRate()/60);
  
   if (ground.x < 0){
      ground.x = ground.width/8;
    }
    
    ground.velocityX=-(10 + 3*score/200);
    
    spawnClouds()
    spawnObstacles()
 
  trex.collide(inground)
     
    
  if(touches.length > 0 || keyDown("space") && 
    trex.y>=height-105 )  {
    jumpsound.play()
    trex.velocityY = -11;
    touches = []
 }

   
 
    
  
  trex.velocityY = trex.velocityY + 0.8
    
    if (trex.isTouching(obstaclesGroup)){
      oversound.play()
      gamestate = End
    }
  
  }
  
  
  else if (gamestate ===End){
  trex.velocityY = trex.velocityY + 0.8
  
 
 
       over.visible = true;
    reset.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || mousePressedOver(reset)) {      
      Reset();
      touches = []
    }
  }
  

  
  
  drawSprites();
 
}
 

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-400,100,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudimage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    cloud.lifetime = 350;
    cloudsGroup.add(cloud)
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
      }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
     cac = createSprite(800,height-60,20,30);
     cac.setCollider('circle',0,0,45)

    cac.velocityX=-(10 + 3*score/200);
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: cac.addImage(cac1);
              break;
      case 2: cac.addImage(cac2);
              break;
      case 3: cac.addImage(cac3);
              break;
      case 4: cac.addImage(cac4);
              break;
      default: break;
    }
    obstaclesGroup.add(cac)
    cac.scale = 0.37;
    cac.lifetime = 350;
    cac.depth = trex.depth;
    cac.depth +=1;
    

  }


}

function Reset(){
  gamestate = Play;
  over.visible = false;
  reset.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}



