//Level 1

scenes.scene3 = function(){};

//Player speed
var link, vel = 150; 
//facing
var up = false,down = false,left = false,right = false;

//Objects hit points
var rockHP = 3,BushHP = 2;

//Arrow
var arrow;
var fireRate = 500;
var nextArrow = 0;
var arrowsOwned = 10;
var arrowText;
//variable to create bunch of arrows
var sprite;

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
        
        //game.renderer.resize( 1216/2, 800/2); //<--- Giving me TOO MANY problems but still need it and love it <3
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
        rocks = game.add.physicsGroup();
        map.createFromObjects('rocks',48,'Rocky', 0, true, false, rocks);
        rocks.forEach(function(rocks){
        rocks.body.immovable = true;});  
        
        
        bushes = game.add.physicsGroup();
        map.createFromObjects('bushes', 'BUSHTOP', 'tBush', 0, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHBOT', 'bBush', 0, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHLEFT', 'lBush', 0, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHRIGHT', 'rBush', 0, true, false , bushes);
        bushes.forEach(function(bushes){bushes.body.immovable = true;});  
        
        // music.play('openWorld', 0,1,true);
        
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
        var arrowGUI = game.add.sprite((game.camera.x), (game.camera.y+30), 'BunchofArrows');
        arrowGUI.scale.setTo(1.15, 1.15);
        arrowGUI.fixedToCamera = true;
        arrowText = game.add.text((game.camera.x+30), (game.camera.y+30), "X "+arrowsOwned);
        arrowText.fixedToCamera = true;
        
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
        game.physics.arcade.overlap(arrow, rocks, hitRock, null, this);
        game.physics.arcade.overlap(arrow, bushes, hitBush, null, this);
        
        //Link/Player Collides with Sprite (Bunch of Arrows)
        game.physics.arcade.collide(sprite, map);
        game.physics.arcade.overlap(link, sprite, collectArrows, null, this);
       
        //Arrows Owned Update
        arrowText.setText("x "+ arrowsOwned);
        
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
        
        if(fireBUTTON.isDown){
            fire();
        }
        
    function hitRock(arrow, rocks){  
    rockHP -= 1;
        if (rockHP <= 0  )
            {
                rocks.kill();
                if(game.rnd.integerInRange(1, 10) >= 3)
                    {
                        sprite = game.add.sprite((rocks.x), (rocks.y), 'BunchofArrows');
                        sprite.enableBody = true;
                    }
                else{
                    //Do Nothing ~ just die in peace silly rock
                }
            }
    arrow.kill();
   }
        
    function hitBush(arrow, bushes){  
    bushes.kill();
    arrow.kill();
   }
 }
};

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
            else {
                //Don't shoot
            }
           
        }
    }
}

function collectArrows (link, sprite) {
    // Removes the star from the screen
    sprite.kill();
    arrowsOwned = arrowsOwned + game.rnd.integerInRange(2, 10);

}