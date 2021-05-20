 var tower,towerImg
  var door, doorImg,doorsG
  var climber,climberImg,climberG
  var ghost, ghostImg
  var invisibleBlock, invisibleBlockG
  var gameState = "play"
  var spookySound
  
function preload(){
  towerImg = loadImage("tower.png")
  doorImg = loadImage("door.png")
  climberImg = loadImage('climber.png')
  ghostImg = loadImage('ghost-standing.png')
  spookySound = loadSound ('spooky.wav')
}

function setup(){
  createCanvas(600,600)
  spookySound.loop();
  tower = createSprite(300,300)
  tower.addImage("tower", towerImg)
  tower.velocityY=2
  doorsG = new Group()
  climberG = new Group()
  ghost = createSprite(200,200)
  ghost.addImage('ghost', ghostImg)
  ghost.scale=0.3
  invisibleBlockG = new Group()
  
  
}
function draw(){
  background('black')
  if(gameState === "play"){
      
  if(tower.y>600){
     tower.y= 300
     }
  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x-3
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x+3
  }
   if(keyDown("space")){
    ghost.velocityY = -5
    
  }
  if(climberG.isTouching(ghost)){
    ghost.velocityY=0
  }
  ghost.velocityY = ghost.velocityY+0.5  
  
  spawnDoors();
    if(invisibleBlockG.isTouching(ghost) || ghost.y > 600){ ghost.destroy(); 
                                                               gameState = "end"
 }
    
  drawSprites();
  }
if (gameState === "end")  {         
stroke("white");
fill("yellow");
textSize(30); 
text("Game Over", 230,250) }
  
}
function spawnDoors(){
  if(frameCount%240 ===0 ){
     door = createSprite(200,-50)
      door.addImage("door",doorImg)
      door.velocityY = 2
  door.x = Math.round(random(100,500))
    door.lifetime = 800
    doorsG.add(door)
    climber = createSprite(200,10)
    climber.addImage("climber", climberImg)
    climber.x =  door.x
    climber.velocityY = 2
    climber.lifetime = 800
    climberG.add(climber)
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1
   invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 2 
    invisibleBlock.visible = false
     invisibleBlock.lifetime = 800
     invisibleBlockG.add(invisibleBlock)
  }
  
  
}