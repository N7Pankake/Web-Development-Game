//Level 1

scenes.scene3 = function(){};

//Player stats
var link, vel = 150, inmortality = false;
//facing
var up = false,down = false,left = false,right = false;

//Game System
var waveNumber = 1;
var enemiesAlive = 0;
var enemiesTotal = 0;
var enemies;
var enemyText; 
var waveNumberText; 
var enemyCreationCD;
var waveTimer;
var waveStarts;
var waveON = false;
var ghost;

//Arrow
var arrow;
var fireRate = 500;
var nextArrow = 0;
var arrowsOwned = 5;
var arrowText;
var arrowGUI;
var bunchOfArrows;
var quiver;
var randomQuiver = true;

//Map/Level/GUI
var map; 
var fireButton, swordButton, arrowButton, upButton, downButton, leftButton,rightButton,padButton;
var scoreText, score = 0;

//Buffs
var buffs, shield;
//Tiled Layers
var floor, water,walls;

//Object Tiled Layers
var rocks
var bushes1, bushes2, bushes3, bushes4;

scenes.scene3.prototype = {
    preload: function (){
        
        game.load.image('tiles', 'Assets/Sprites/Levels/zelda_01.png');
        music = game.add.audio('openWorld');
        music.addMarker('openWorld', 0, 16, true);
        music.play('openWorld', 0,1,true);
        game.scale.setGameSize(1216/2, 800/2);
        arrowsOwned = 5;
    },
    
    create: function (){
        //Game itself
        game.world.setBounds(0,0, 1216, 800);
        game.physics.startSystem(Phaser.Physics.ARCADE);
               
        //map
        map = game.add.tilemap('level_01');
        map.addTilesetImage('tiles');

        floor = map.createLayer('ground');
        walls = map.createLayer('walls');
        water = map.createLayer('water');
        
        map.setCollisionBetween(0, 100, true, 'walls');
        map.setCollisionBetween(0, 100, true, 'water');
        
        //Objects layer related
        //Rocks
        rocks = game.add.physicsGroup();
        map.createFromObjects('rocks',48,'Rocky', 0, true, false, rocks);
        rocks.forEach(function(rocks){
        rocks.body.immovable = true;});  
        
        //Bushes
        bushes = game.add.physicsGroup();
        map.createFromObjects('bushes', 'BUSHTOP', 'tBush', 0, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHBOT', 'bBush', 0, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHLEFT', 'lBush', 0, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHRIGHT', 'rBush', 0, true, false , bushes);
        bushes.forEach(function(bushes){bushes.body.immovable = true;});  
         
        // Player
        link = game.add.sprite(608, 400, 'LinkMovement');
        link.scale.setTo(0.2, 0.2);
        link.anchor.setTo(0.5);
        link.animations.add('walkHorizontalRight', [6,7,8]);
        link.animations.add('walkHorizontalLeft', [9,10,11]);
        link.animations.add('walkVerticalDown', [0,1,2]);
        link.animations.add('walkVerticalUp', [3,4,5]);
        game.physics.enable(link);
        link.body.collideWorldBounds=true;
        
        //GUI
        life = game.add.sprite((game.camera.x), (game.camera.y), 'lifeBar');
        life.scale.setTo(0.15, 0.15);
        life.animations.add('Full', [0]);
        life.animations.add('Two', [1]);
        life.animations.add('One', [2]);
        life.animations.add('Zero', [3]);
        life.fixedToCamera = true;
        
        //Arrows available
        arrowGUI = game.add.sprite((game.camera.x), (game.camera.y+30), 'BunchofArrows');
        arrowGUI.scale.setTo(1.15, 1.15);
        arrowGUI.fixedToCamera = true;
        arrowText = game.add.text((game.camera.x+30), (game.camera.y+30), "X "+arrowsOwned, {font: "", fill: "#DAA520", align: ""});
        arrowText.fixedToCamera = true;
        
        //Score
        scoreText = game.add.text((game.camera.x), (game.camera.y+60), "Score: "+score, {font: "", fill: "#DAA520", align: ""});
        scoreText.fixedToCamera = true;
        
        //BUFFS
        buffs = game.add.text((game.camera.x+400), (game.camera.y+0), "Buffs ON: ", {font: "", fill: "#DAA520", align: ""});
        buffs.fixedToCamera = true;
        
        //Inmortality
        shield = game.add.sprite((game.camera.x+535), (game.camera.y+5), 'Shield');
        shield.alpha = 0;
        shield.scale.setTo(0.2, 0.2);
        shield.fixedToCamera = true;
        
        //Arrows
        arrow = game.add.group();
        arrow.enableBody = true;
        arrow.physicsBodyType = Phaser.Physics.ARCADE;
        arrow.createMultiple(30, 'arrow');
        arrow.setAll('anchor.x', 0.5);
        arrow.setAll('anchor.y', 1);
        arrow.setAll('outOfBoundsKill', true);
        arrow.setAll('checkWorldBounds', true);
        
        // Camera Related
        game.camera.height = 608;
        game.camera.width = 300;
        game.camera.setSize(608,400);
        game.camera.bounds = (null);
        game.camera.follow(link); //normal follow
        // game.camera.follow(link, Phaser.Camera.FOLLOW_TOPDOWN,0.5,0.5); Follow with box
        
        //Buttons/Joystick/Movement
        //Fire Button
        fireButton = game.add.button(487.50,240, 'buttonFire', function() {
            music.pause();
            changeState(null, 1);
            game.scale.setGameSize(1216, 800);
            
        });
        fireButton.alpha = 0.5;
        fireButton.scale.setTo(0.20,0.20);
        fireButton.fixedToCamera = true;
        
        //Sword Button
        swordButton = game.add.button(525,300, 'buttonSword');
        swordButton.alpha = 0.5;
        swordButton.scale.setTo(0.20,0.20);
        swordButton.fixedToCamera = true;
        
        //Arrow Button
        arrowButton = game.add.button(450,300, 'buttonArrow', function() {
           fire(nextArrow, fireRate);
        });
        arrowButton.alpha = 0.5;
        arrowButton.scale.setTo(0.20,0.20);
        arrowButton.fixedToCamera = true;
        
        //UP Key
        upButton = game.add.button(75,230, 'buttonUP', function() {
           moveUP();
        });
        upButton.alpha = 0.25;
        upButton.scale.setTo(0.3,0.3);
        upButton.fixedToCamera = true;
        
        //DOWN key
        downButton = game.add.button(75,320, 'buttonDOWN', function() {
           moveDOWN();
        });
        downButton.alpha = 0.25;
        downButton.scale.setTo(0.3,0.3);
        downButton.fixedToCamera = true;
        
        //LEFTKEY
        leftButton = game.add.button(30,275, 'buttonLEFT', function() {
           moveLEFT();
        });
        leftButton.alpha = 0.25;
        leftButton.scale.setTo(0.3,0.3);
        leftButton.fixedToCamera = true;
        
        //RIGHTKEY
        rightButton = game.add.button(120,275, 'buttonRIGHT', function() {
           moveRIGHT();
        });
        rightButton.alpha = 0.25;
        rightButton.scale.setTo(0.3,0.3);
        rightButton.fixedToCamera = true;
        
        //PAD
        padButton = game.add.sprite(75,275, 'buttonPAD');
        padButton.alpha = 0.25;
        padButton.scale.setTo(0.3,0.3);
        padButton.fixedToCamera = true;
        
        //Arrow keys for movement and Space bar for shooting arrows
        cursors = game.input.keyboard.createCursorKeys();
        fireBUTTON = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        
        //Timers/Waves
        waveTimer = game.add.text((game.camera.x +135), (game.camera.y), "Wave starts in: "+waveStarts, {font: "50", fill: "#DAA520", align: ""});
        waveTimer.fixedToCamera = true;
        
        waveNumberText = game.add.text((game.camera.x +135), (game.camera.y + 60), "Wave# "+waveNumber, {font: "50", fill: "#DAA520", align: ""});
        waveNumberText.fixedToCamera = true;
        
        waveStarts = game.time.create(false);
        waveStarts.add(1000, function(){createEnemies()});
        waveStarts.start();
        
        enemyText = game.add.text((game.camera.x +135), (game.camera.y+30), "enemy # "+enemiesAlive, {font: "50", fill: "#DAA520", align: ""});
        enemyText.fixedToCamera = true;
        
        //Enemy
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        
        quiver = game.add.group();
        quiver.enableBody = true;
        quiver.physicsBodyType = Phaser.Physics.ARCADE;
        
        randomQuiverTimer = game.time.create(false);
        randomQuiverTimer.add(1000, function(){randomQuiverF()});
        randomQuiverTimer.start();
    },
    
    
    update: function (){
        //Collide with Walls, Water, Rocks, Bushes from TILED
        game.physics.arcade.collide(link, walls);
        game.physics.arcade.collide(link, water);
        game.physics.arcade.collide(link, rocks);
        game.physics.arcade.collide(link, bushes);
                
        //Arrows Collide with Rocks and Bushes TILED
        game.physics.arcade.collide(arrow, rocks, hitRock, null, this);
        game.physics.arcade.collide(arrow, bushes, hitBush, null, this);
                
        //Arrows Owned Update
        arrowText.setText("x "+ arrowsOwned);
        scoreText.setText("Score: "+ score);
        
        //Enemy vs Arrow 
        game.physics.arcade.overlap(arrow, enemies, killEnemy, null, this);
        
        //Enemy vs Player 
        game.physics.arcade.overlap(link, enemies, hitPlayer, null, this);
        game.physics.arcade.overlap(link, quiver, arrowPack, null, this);
        //Player Related
        playerHealth();
        playerMovement();
        
        //GameSystem
        waveTimer.setText("Wave starts in: "+waveStarts.duration);
        waveNumberText.setText("Wave# "+waveNumber);
        enemyText.setText("enemy #"+enemiesAlive);
        
        //Wave System
        if (waveON == true && enemiesAlive == 0)
            {
                waveNumber += 1;
                waveON = false;
                waveTimer.alpha = 1;
                waveStarts.add(20000, function(){createEnemies()});
                waveStarts.start();
            }
        
        //Random Quivers system
        if(randomQuiver === true && waveON === false){
                randomQuiverTimer.add(1000, function(){randomQuiverF()});
                randomQuiverTimer.start();
                randomQuiver = false;
                }
        
        //Keyboard Extension to shoot arrows with SPACE
        if(fireBUTTON.isDown){
            fire();
        }
        
        //chasePlayer();
        
 }
};

//Player Movement and facing
function playerMovement(){
        if(cursors.up.isDown){
              link.body.velocity.y = -vel;
              link.animations.play('walkVerticalUp', 9, true);
              up = true,down = false,left = false,right = false;
            }
        
        else if(cursors.down.isDown){
              link.body.velocity.y = vel;
              link.animations.play('walkVerticalDown', 9, true);
              up = false,down = true,left = false,right = false;
            }
        
        else{
              link.body.velocity.y = 0;
              link.animations.stop('walkVerticalUp');
              link.animations.stop('walkVerticalDown');
        }
        
        if(cursors.left.isDown){
              link.body.velocity.x = -vel;
              link.animations.play('walkHorizontalLeft', 9, true);
              up = false,down = false,left = true,right = false;
            }
        
        else if(cursors.right.isDown){
              link.body.velocity.x = vel;
              link.animations.play('walkHorizontalRight', 9, true);
              up = false,down = false,left = false,right = true;
            }
        
        else{
              link.body.velocity.x = 0;
              link.animations.stop('walkHorizontalRight');
              link.animations.stop('walkHorizontalLeft');
        }
}

//Fire function changes direction depending on which direction the player is facing
function fire (){
    if (game.time.now > nextArrow)
    {
        nextArrow = game.time.now + fireRate;
        var bullet = arrow.getFirstExists(false);

        if(bullet){
            if(arrowsOwned >= 1)
                {
                     if(up == true && down == false && right == false && left ==false ){
                bullet.rotation = 0;
                bullet.reset(link.x, link.y - 15);
                bullet.body.velocity.y = -400;
                bulletTime = game.time.now + 200;
                arrowsOwned -= 1;
            }
            if(up == false && down == true && right == false && left ==false){
                bullet.rotation = -135;
                bullet.reset(link.x, link.y + 15);
                bullet.body.velocity.y = +400;
                bulletTime = game.time.now + 200;
                arrowsOwned -= 1;
            }
            
            if(up == false && down == false && right == true && left == false){
                bullet.rotation = 1.5;
                bullet.reset(link.x + 15, link.y);
                bullet.body.velocity.x = +400;
                bulletTime = game.time.now + 200;
                arrowsOwned -= 1;
            }
            
            if(up == false && down == false && right == false && left == true){
                bullet.rotation = -1.5;
                bullet.reset(link.x - 15, link.y);
                bullet.body.velocity.x = -400;
                bulletTime = game.time.now + 200;
                arrowsOwned -= 1;
            }
            
            if(up == false && down == false && right == false && left == false){
                bullet.rotation = -135;
                bullet.reset(link.x, link.y + 15);
                bullet.body.velocity.y = +400;
                bulletTime = game.time.now + 200;
                arrowsOwned -= 1;
            }
                }
        }
    }
}

//Destroy rock after 3 hits and chance of receiving 1-3 arrows afterwards
function hitRock(arrow, rocks){  
    rocks.Hitpoints -= 1;
        if (rocks.Hitpoints <= 0  )
            {
                rocks.kill();
                score = score + 10;
                if(game.rnd.integerInRange(1, 100) >= 70){
                     bunchOfArrows = game.add.sprite(rocks.x, rocks.y,'BunchofArrows');
                     quiver.add(bunchOfArrows)
                    }
            }
    arrow.kill();
   }

//Destroy rock after 3 hits and chance of receiving 1-2 arrows afterwards
function hitBush(arrow, bushes){  
       bushes.Hitpoints -= 1;
        if(bushes.Hitpoints <= 0){
            bushes.kill();
            score = score + 5;
            if(game.rnd.integerInRange(1, 100) >= 35){
               bunchOfArrows = game.add.sprite(bushes.x, bushes.y,'BunchofArrows');
               quiver.add(bunchOfArrows)
              }
        }
    arrow.kill();
   }

function arrowPack(link, arrows){
        arrows.kill();
        arrowsOwned = arrowsOwned + game.rnd.integerInRange(2, 4);
}

function randomQuiverF(){
    var randX, randY;
    randX = Math.floor(Math.random()*1216+1);
    randY = Math.floor(Math.random()*800+1);
    
    if((randX >= 64 && randX <= 1120) && (randY >= 96 && randY <= 736))
    {
       bunchOfArrows = game.add.sprite(randX,randY,'BunchofArrows');
       quiver.add(bunchOfArrows);
    }
     randomQuiver = true;
}

/*Health GUI for player works with an INT variable and 
an animation that change states depending on the INT value*/
function playerHealth(){
    if (hitpoints === 3){
            life.animations.play('Full', 5, true);
            life.animations.stop('Two');
            life.animations.stop('One');
            life.animations.stop('Zero');
            }
        else if (hitpoints === 2){
            life.animations.play('Two', 5, true);
            life.animations.stop('Full');
            life.animations.stop('One');
            life.animations.stop('Zero');
            }
        else if (hitpoints === 1){
            life.animations.play('One', 5, true);
            life.animations.stop('Full');
            life.animations.stop('Two');
            life.animations.stop('Zero');
            }
        else  if (hitpoints === 0){
            life.animations.play('Zero', 5, true);
            life.animations.stop('Full');
            life.animations.stop('One');
            life.animations.stop('Two');
            }
}

function killEnemy(arrow, enemies){  
    enemies.kill();
    score = score + 50;
    enemiesAlive -= 1;
    if(game.rnd.integerInRange(1, 10) >= 3 ){
               bunchOfArrows = game.add.sprite(enemies.x, enemies.y,'BunchofArrows');
               quiver.add(bunchOfArrows)
               arrow.kill();}
    else {}
}

//Player gets hit and Death.
function hitPlayer(){ 
    if (inmortality === false){
        inmortality = true;
        shield.alpha = 1;
        hitpoints -= 1;
    }
    else if (inmortality === true){
           var timer;
           timer = Phaser.Timer.SECOND * 2;
           var tween = game.add.tween(link).to({tint: 0xff0000}, 150, "Linear", true);
           tween.repeat (10,0);
           game.time.events.add(timer, notInmortal,this);
        }
    if (hitpoints <= 0){
        link.kill();
        music.pause();
        changeState(null, 8);
        game.scale.setGameSize(1216, 800);
        }
    }

function notInmortal() {
    shield.alpha = 0;
    link.tint = 0xFFFFFF;
    inmortality = false;
}


function createEnemies(){
    for(var i = 1; i <= waveNumber; i++)
        {  enemies.create((32),(384),'bigGhost');
           enemies.create((448),(64),'bigGhost');
           enemies.create((1152),(384),'bigGhost');
           enemies.create((576),(768),'bigGhost');
           enemiesAlive += 4;
         //Math.floor(Math.random()*100+1)
         }
    enemies.callAll('animations.add', 'animations', 'flap', [0,1,2,3,4,5], 16, true);
    enemies.callAll('play', null, 'flap');
    
            waveON = true;
}

function chasePlayer(enemies){
   enemiesSpeed = 25 * waveNumber;
    if(link.body.x < enemies.body.x)
        {
            enemies.body.velocity.x = -enemiesSpeed;
        }
    else(link.body.x < enemies.body.x)
        {
            enemies.body.velocity.x = enemiesSpeed;
        }
    
    if(link.body.y < enemies.body.y)
        {
            enemies.body.velocity.y = -enemiesSpeed;
        }
    else(link.body.y < enemies.body.y)
        {
            enemies.body.velocity.y = enemiesSpeed;
        }
}

//Buttons Set up
function moveUP(){
     link.body.velocity.y = -vel;
     link.animations.play('walkVerticalUp', 9, true);
     up = true,down = false,left = false,right = false;     
}

function moveDOWN(){
     link.body.velocity.y = vel;
     link.animations.play('walkVerticalDown', 9, true);
     up = false,down = true,left = false,right = false;     
}

function moveLEFT(){
     link.body.velocity.x = -vel;
     link.animations.play('walkHorizontalLeft', 9, true);
      up = false,down = false,left = true,right = false;     
}

function moveRIGHT(){
     link.body.velocity.x = vel;
     link.animations.play('walkHorizontalRight', 9, true);
      up = false,down = false,left = false,right = true;   
}