//Level 1

scenes.scene3 = function(){};

//Player speed
var link, vel = 150, inmortality = false;
//facing
var up = false,down = false,left = false,right = false;

//Arrow
var arrow;
var fireRate = 500;
var nextArrow = 0;
var arrowsOwned = 10;
var arrowText;

//Quiver
var quiver;

//Map/Level/GUI
var map, fireButton, swordButton, arrowButton;

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
     // music.play('openWorld', 0,1,true);
     // game.renderer.resize( 1216/2, 800/2); //<--- Giving me TOO MANY problems but still need it and love it <3
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
        
        //Enemies
        enemies = game.add.physicsGroup();
        map.createFromObjects('enemySpawn', 'enemy', 'bigGhost', 0, true, false, enemies);
        enemies.forEach(function(enemies){enemies.body.immovable = true;
        enemies.animations.add('spin', [0,1,2,3,4,5,5], 0, true);
        enemies.animations.play('spin');
        game.physics.enable(enemies);});
        
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
        
        //Arrows
        arrow = game.add.group();
        arrow.enableBody = true;
        arrow.physicsBodyType = Phaser.Physics.ARCADE;
        arrow.createMultiple(30, 'arrow');
        arrow.setAll('anchor.x', 0.5);
        arrow.setAll('anchor.y', 1);
        arrow.setAll('outOfBoundsKill', true);
        arrow.setAll('checkWorldBounds', true);
        
        //Arrows available
        var arrowGUI = game.add.sprite((game.camera.x), (game.camera.y+30), 'BunchofArrows');
        arrowGUI.scale.setTo(1.15, 1.15);
        arrowGUI.fixedToCamera = true;
        arrowText = game.add.text((game.camera.x+30), (game.camera.y+30), "X "+arrowsOwned, {font: "", fill: "#DAA520", align: ""});
        arrowText.fixedToCamera = true;
        
        // Camera Related
        game.camera.height = 608;
        game.camera.width = 300;
        game.camera.setSize(608,400);
        game.camera.bounds = (0,0,608,400);
        game.camera.follow(link, Phaser.Camera.FOLLOW_TOPDOWN,0.5,0.5);
        
        //Buttons/Joystick/Movement
        
        fireButton = game.add.button(487.50,240, 'buttonFire', function() {
            changeState(null, 0);
        });
        fireButton.alpha = 0.5;
        fireButton.scale.setTo(0.20,0.20);
        fireButton.fixedToCamera = true;
        
        swordButton = game.add.button(525,300, 'buttonSword', function() {
            changeState(null, 0);
        });
        swordButton.alpha = 0.5;
        swordButton.scale.setTo(0.20,0.20);
        swordButton.fixedToCamera = true;
        
        arrowButton = game.add.button(450,300, 'buttonArrow', function() {
           fire(nextArrow, fireRate);
        });
        arrowButton.alpha = 0.5;
        arrowButton.scale.setTo(0.20,0.20);
        arrowButton.fixedToCamera = true;
        
        //Arrow keys for movement and Space bar for shooting arrows
        cursors = game.input.keyboard.createCursorKeys();
        fireBUTTON = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
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
        
        //Enemy collider vs Arrow 
        game.physics.arcade.overlap(arrow, enemies, killEnemy, null, this);
        
        //Enemy collider vs Player and Follow him
        game.physics.arcade.overlap(link, enemies, hitPlayer, null, this);
        followPlayer();
        
        //Arrows Owned Update
        arrowText.setText("x "+ arrowsOwned);
        
        //Update player Health
        playerHealth();
        
        //Player Movement
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
        
        //Keyboard Extension to shoot arrows with SPACE
        if(fireBUTTON.isDown){
            fire();
        }
        
 }
};

//Destroy rock after 3 hits and chance of receiving 1-3 arrows afterwards
function hitRock(arrow, rocks){  
    rocks.Hitpoints -= 1;
        if (rocks.Hitpoints <= 0  )
            {
                rocks.kill();
                if(game.rnd.integerInRange(1, 15) >= 10){
                     arrowsOwned = arrowsOwned + game.rnd.integerInRange(1, 3);
                    }
            }
    arrow.kill();
   }

//Destroy rock after 3 hits and chance of receiving 1-2 arrows afterwards
function hitBush(arrow, bushes){  
       bushes.Hitpoints -= 1;
        if(bushes.Hitpoints <= 0){
            bushes.kill();
            if(game.rnd.integerInRange(1, 15) >= 5){
                     arrowsOwned = arrowsOwned + game.rnd.integerInRange(1, 2);
                    }
        }
    arrow.kill();
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

//Enemy movement (NOT working atm)
var enemies_speed = 20;
function followPlayer(link, enemies)
{
    /*if(link.body.x < enemies.body.x){
        enemies.body.velocity.x = enemies_speed * -1;
        }
    else{
        enemies.body.velocity.x = enemies_speed;
    }
    
    if(link.body.y < enemies.body.y){
        enemies.body.velocity.y = enemies_speed * -1;
        }
    else{
        enemies.body.velocity.y = enemies_speed;
    }*/
}

/*Enemy die after getting hit and 
a 20% chance of PIRCING the enemy (since is a GHOST)*/
function killEnemy(arrow, enemies){  
    enemies.kill();
    if(game.rnd.integerInRange(1, 10) >= 8){}
    else{
        arrow.kill();
    }
}

//Player gets hit and Death.
function hitPlayer(){ 
    if (inmortality == false){
        hitpoints -= 1;
        inmortality = true;
    }
    else if (inmortality == true){
            game.time.events.add(Phaser.Timer.SECOND * 4);
            inmortality = false;
        }
    if (hitpoints <= 0){
            link.kill();
        }
    }