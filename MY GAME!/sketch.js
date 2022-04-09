const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var HQ ,explosion;
var shipGroup , bomb,air_bombGroup , missileGroup;
//var ship1,ship2,ship3;
//var bombGroup=[];
var PLAY= 1;
var END= 0;
var gameState= PLAY;
var score=0;

function preload(){
air_bombImg = loadImage("air_bomb.png");
bombImg = loadImage("bomb.png");
//explosionimg= loadAnimation("explosion_1.png");
oceanimg= loadImage("ocean.jpg");
planeimg=loadImage("plane.png");
ship1img = loadImage("ship1.png");
ship2img= loadImage("ship2.png");
ship3img = loadImage("ship3.png");
sMissileImg= loadImage("sMissile.png");
HQimg= loadImage("HQ.png");
gameOverImg= loadImage("gameover.png")
startBoxImg= loadImage("start box.png");
restartImg= loadImage("R.png");
explosion= loadAnimation("explosion_1.png","explosion_1.png");

backgroundMusic= loadSound("background-music.mp3");
explosionSound= loadSound("explosionSound.mp3");
victorySound= loadSound("victory.mp3");
}






function setup(){
createCanvas(1200,800);
frameRate(80);

// if (!backgroundMusic.isPlaying ()){
    backgroundMusic.play();
    backgroundMusic.setVolume(0.6);
  //} 

engine = Engine.create();
world = engine.world;


ocean= createSprite(0,200,1200,800);
ocean.addImage(oceanimg);
ocean.scale=2.4;
ocean.velocityX=-3;

plane = createSprite(400,100);
 plane.addImage(planeimg);
 plane.scale=0.3;
//  bomb.x=plane.x;
//  bomb.y=plane.y;
 
 bomb= createSprite(plane.x,plane.y,20,20);
 bomb.addImage(bombImg);
 bomb.scale=0.1;
 bomb.depth=plane.depth;
 plane.depth+=1;

startBox= createSprite(width/2,height/2,400,400);
startBox.addImage(startBoxImg);
startBox.scale= 2;
startBox.lifetime=200;
     
    // bomb= wholeScree

//  ship1= createSprite(1500,600,100,20);
//  ship1.addImage(ship1img);
//  ship1.scale=0.5;
//  ship1.velocityX=-3;
  
//  ship2= createSprite(1500,500,100,20);
//  ship2.addImage(ship2img);
//  ship2.scale=0.5;
//  ship2.velocityX=-3;
  
//  ship3img= createSprite(1500,700,100,20);
//  ship3.addImage(ship3img);
//  ship3.scale=1;
//  ship3.velocityX=-3;
  

button1 = createImg('mute.png');
button1.position(1100,20);
button1.size(50,50);
button1.mouseClicked(mute);

// restart= createImg('R.png');
// restart.position(width/2,height/2);
// restart.size(60,60);
// restart.mouseClicked(reset);

restart= createSprite(width/2,height/2,60,60);
restart.addImage(restartImg);
restart.scale=0.05;

restart.visible=false;

gameover = createSprite(width/2,height/2,100,100);
gameover.addImage(gameOverImg);
gameover.scale=0.5;

gameover.visible=false;


shipGroup=createGroup();
air_bombGroup= createGroup();
missileGroup= new Group();
missileGroup2= createGroup();

plane.addAnimation('bombExplode', explosion);




//bomb= new Bomb(plane.position.x,plane.position.y,20,50)


score= 0;

HQ= createSprite(7000,650,200,200);
    HQ.velocityX=-2;
    HQ.addImage(HQimg);
    HQ.scale=0.5;
    
    


}

function draw(){

   


background(oceanimg);


    
    
    Engine.update(engine);
    
    //console.log(frameCount);

        
  
    
    
    
    //console.log(gameState);

   
    if(gameState===PLAY){

        score = score + Math.round(getFrameRate()/60);

        if(ocean.x<20){
            ocean.x=1000;
        }

       
     
     //ocean.velocityX = -(6 + 1*score/100);

        if(keyDown("space")){
            bomb.velocityY= 13;
           
        }


        

    // bomb.x=plane.x;
    // bomb.y=plane.y;


        planeMovement();
        airobstacles();
        obstacles();
        obstaclesDestroyed();
        //headDestroy();

    }

   if(frameCount===2400){
       
       ocean.velocityX=-1.5;
       
   }

   if( frameCount===3000){
    shipGroup.destroyEach();
    missileGroup.destroyEach();
    missileGroup2.destroyEach();
    




   }

     if(frameCount=== 3500){
         gameState=END;
         
         
     }

    if(plane.y<50){
        plane.y=50;
    }

    if(plane.x>1000){
        plane.x=1000;
    }

    if(plane.x<50){
        plane.x=50;
    }

    if(plane.y>400){
        plane.y=400;
    }
    
    if(bomb.y<50){
        bomb.y=50;
    }
   
        
      



    //bomb.show();
    if(bomb.isTouching(HQ)){
        if(backgroundMusic.isPlaying()){
            backgroundMusic.stop();
            victorySound.play();
            victorySound.setVolume(0.5);
        }
    }
    
    


    

   
    if(plane.isTouching(air_bombGroup) || plane.isTouching(shipGroup) || missileGroup.isTouching(plane) || missileGroup2.isTouching(plane) || bomb.isTouching(HQ) ) {
     gameState=END;
    
    }


if(gameState===END){
 gameOver();
 plane.changeAnimation('bombExplode');
 gameover.visible=true;

 
        
}
    
        //gamePlay();
    drawSprites();

    textSize(40);
    fill("black")
    text("Score: "+ score,900,150); 

}

function obstacles(){
    if(frameCount% 500===0){
       ship= createSprite(1500,650,100,20);
        ship.addImage(ship1img);
         ship.scale=0.7;
         ship.velocityX=-5;

         sMissile= createSprite(ship.x,ship.y,20,20);
        sMissile.velocityX= -11;
        sMissile.velocityY=-2;
        sMissile.addImage(sMissileImg);
        sMissile.scale= 0.3;
        

        sMissile2= createSprite(ship.x+300,ship.y-200,20,20);
        sMissile2.velocityX= -9;
        sMissile2.velocityY=-3;
        sMissile2.addImage(sMissileImg);
        sMissile2.scale=0.3;

         var rand= Math.round(random(1,3))

         switch (rand){
            case 1:ship.addImage(ship1img);
                    break;
            case 2:ship.addImage(ship2img);
                    break;
            case 3:ship.addImage(ship3img);
            
                    break;
         }
         shipGroup.add(ship);
         ship.lifetime=500;
        
         missileGroup.add(sMissile);
         missileGroup2.add(sMissile2);
         
    //      sMissile.setCollider('circle',0,0,40);
    //    sMissile.debug=true;

    //    sMissile2.setCollider('circle',0,0,40);
    //    sMissile2.debug=true;

       

    

    //    if(bomb.isTouching(HQ)){
    //        gamestate=END;
    //    }
            

         
    }
   }

   function airobstacles(){
    if(frameCount% 150===0){
        air_bomb= createSprite(1500,100,20,20);
        air_bomb.addImage(air_bombImg);
        air_bomb.velocityX=-5;
        air_bomb.scale=0.2;

        var rand1= Math.round(random(1,3))

            switch (rand1){
                case 1: air_bomb.y=150;
                      break;
                case 2: air_bomb.y=200;
                      break;
                case 3: air_bomb.y=140;
                      break;
                case 4: air_bomb.y=50;
                      break;
            
        }
        air_bomb.lifetime=300;
       air_bomb.setCollider('circle',0,0,200);
       air_bomb.debug=false;

        air_bombGroup.add(air_bomb);
        air_bombGroup.depth=plane.depth;
        air_bombGroup.depth+=1;
    }
   }

    

    
    

   function planeMovement(){
    if(keyDown("UP_ARROW")){
        plane.y= plane.y-5;
        bomb.y=plane.y;
       
    }
    
     if(keyDown("DOWN_ARROW")){
         plane.y= plane.y+5;
         bomb.y=plane.y;
         
    }

    if(keyDown("RIGHT_ARROW")){
        plane.x= plane.x+5;
        //plane.y=plane.y+2;
        bomb.x=plane.x;
        //bomb.y=bomb.y+2;
        
   }

   if(keyDown("LEFT_ARROW")){
    plane.x= plane.x-5;
   // plane.y=plane.y-2;
    bomb.x=plane.x;
    //bomb.y=bomb.y-2;
    
}
   }
  
//    function gamePlay(){
//     obstacles();
//     airobstacles();
//     planeMovement();
//     gameOver();

   

   // bg_music.play();
   // bg_music.setVolume(2);
   

 function obstaclesDestroyed(){
 if(bomb.isTouching(shipGroup)){
     shipGroup.destroyEach();
     //ship.changeAnimation('bombExplode');
     explosionSound.play();
     
 }

 }




   function gameOver(){
       //if(plane.isTouching(air_bombGroup) || plane.isTouching(shipGroup)){

       if( backgroundMusic.isPlaying()){
           backgroundMusic.stop();
            explosionSound.play();
            explosionSound.setVolume(0.5);
       }
        
        //restart.visible=true;

            shipGroup.setVelocityXEach(0);
            air_bombGroup.setVelocityXEach(0);

         shipGroup.destroyEach();
         air_bombGroup.destroyEach();
         missileGroup.destroyEach();
         missileGroup2.destroyEach();
         plane.destroy();
         bomb.destroy();
           ocean.velocityX=0;
           HQ.destroy();
           //planeMovement() =false;
       
       }
    //}

   shipGroup.setCollider('rectangle',0,0,200,100);
     shipGroup.debug = true;

     function mute(){
         if(backgroundMusic.isPlaying()){
             backgroundMusic.stop();
         }
         else{
             backgroundMusic.play();
         }
     }

     