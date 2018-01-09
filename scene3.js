//Level 1

scenes.scene3 = function(){};

//Player speed
var link, vel = 150;

//Map/Level
var map;

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
        //game.renderer.resize( 1216/2, 800/2);
        
    },
    
    create: function (){
        
        //Game itself
        
        game.world.setBounds(0,0, 1216, 800);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        map = game.add.tilemap('level_01');
        map.addTilesetImage('tiles');
        
        floor = map.createLayer('ground');
        walls = map.createLayer('walls');
        water = map.createLayer('water');
        
        map.setCollisionBetween(0, 100, true, 'walls');
        map.setCollisionBetween(0, 100, true, 'water');
        
        //Objects layer related
        rocks = game.add.physicsGroup();
        map.createFromObjects('rocks','ROCK','tiles', 48, true, false, rocks);
        rocks.forEach(function(rocks){rocks.body.immovable = true;});  
        
        bushes = game.add.physicsGroup();
        map.createFromObjects('bushes', 'BUSHTOP', 'tiles', 37, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHBOT', 'tiles', 35, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHLEFT', 'tiles', 36, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHRIGHT', 'tiles', 34, true, false , bushes);
        bushes.forEach(function(bushes){bushes.body.immovable = true;});  
        
        
       // music.play('openWorld', 0,1,true);
        
        // Player
        link = game.add.sprite(centerX, centerY, 'LinkMovement');
        link.scale.setTo(0.25, 0.25);
        link.anchor.setTo(0.5);
        link.animations.add('walkHorizontalRight', [6,7,8]);
        link.animations.add('walkHorizontalLeft', [9,10,11]);
        link.animations.add('walkVerticalDown', [0,1,2]);
        link.animations.add('walkVerticalUp', [3,4,5]);
        game.physics.enable(link);
        link.body.collideWorldBounds=true;
        
        //Life bar
        life = game.add.sprite((centerX-600), (centerY-675), 'lifeBar');
        life.scale.setTo(0.15, 0.15);
        life.animations.add('fullHP', [0]);
        life.animations.add('twoHP', [1]);
        life.animations.add('oneHP', [2]);
        life.animations.add('Dead', [3]);
        
        cursors = game.input.keyboard.createCursorKeys();
        
        var b1 = game.add.button(900,300, 'buttonFire', function() {fire();});
        b1.scale.setTo(0.25,0.25);
        
        // Camera Related
        game.camera.follow(link, Phaser.Camera.FOLLOW_PLATFORMER);
        game.camera.bounds = (null);
        
    },
    
    update: function (){
        
        
        
        game.physics.arcade.collide(link, walls);
        game.physics.arcade.collide(link, water);
        game.physics.arcade.collide(link, rocks);
        game.physics.arcade.collide(link, bushes);
        
        if(cursors.up.isDown){
              link.body.velocity.y = -vel;
              link.animations.play('walkVerticalUp', 9, true);
            }
        
        else if(cursors.down.isDown){
              link.body.velocity.y = vel;
              link.animations.play('walkVerticalDown', 9, true);
            }
        
        else{
              link.body.velocity.y = 0;
              link.animations.stop('walkVerticalUp');
              link.animations.stop('walkVerticalDown');
        }
        
        if(cursors.left.isDown){
              link.body.velocity.x = -vel;
              link.animations.play('walkHorizontalLeft', 9, true);
            }
        
        else if(cursors.right.isDown){
              link.body.velocity.x = vel;
              link.animations.play('walkHorizontalRight', 9, true);
            }
        
        else{
              link.body.velocity.x = 0;
              link.animations.stop('walkHorizontalRight');
              link.animations.stop('walkHorizontalLeft');
        }
        
        
    },
    
    fire: function(){
        console.log('firing')
        var bullet = bullets.getFirstDead();
        bullet.reset(link.x, link.y);
    },
    
   drawHealthBar: function(){
       if (hitPoints === 3)
            {
                life.animation.play('fullHP');
            }
        else if
            (hitPoints === 2)
            {
                life.animation.play('twoHP');
            }
        else if
            (hitPoints === 1)
            {
                life.animation.play('oneHP');
            }
        else if
            (hitPoints === 0)
            {
                life.animation.play('Dead');
            }
   }
};