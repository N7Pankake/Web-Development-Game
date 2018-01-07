//Level 1

scenes.scene3 = function(){};

vel = 350;
var rocks, bushes, map,result;

scenes.scene3.prototype = {
    preload: function (){
        music = game.add.audio('openWorld');
        music.addMarker('openWorld', 0, 16, true);
        
    },
    
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#FF0000';
        addChangeStateEventListeners();
        
        map = game.add.tilemap('level_01');
        map.addTilesetImage('tiles');
        
        var floor = map.createLayer('ground');
        walls = map.createLayer('walls');
        water = map.createLayer('water');
        
        map.setCollisionBetween(0, 100, true, 'walls');
        map.setCollisionBetween(0, 100, true, 'water');
        
        
       // music.play('openWorld', 0,1,true);
        
        link = game.add.sprite((centerX-50), (centerY-300), 'LinkMovement');
        link.scale.setTo(0.25, 0.25);
        link.animations.add('walkHorizontalRight', [6,7,8]);
        link.animations.add('walkHorizontalLeft', [9,10,11]);
        link.animations.add('walkVerticalDown', [0,1,2]);
        link.animations.add('walkVerticalUp', [3,4,5]);
        game.physics.enable(link);
        link.body.collideWorldBounds=true;
        
        life = game.add.sprite((centerX-600), (centerY-675), 'lifeBar');
        life.scale.setTo(0.25, 0.25);
        life.animations.add('fullHP', [0]);
        life.animations.add('twoHP', [1]);
        life.animations.add('oneHP', [2]);
        life.animations.add('Dead', [3]);
        
        //this.createRocks();
        //this.createBushes();
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    
    update: function (){
        
        game.physics.arcade.collide(link, walls);
        game.physics.arcade.collide(link, water);
        
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
    
   drawHealthBar: function(){
       if (hitPoints == 3)
            {
                life.animation.play('fullHP');
            }
        else if
            (hitPoints == 2)
            {
                life.animation.play('twoHP');
            }
        else if
            (hitPoints == 1)
            {
                life.animation.play('oneHP');
            }
        else if
            (hitPoints == 0)
            {
                life.animation.play('Dead');
            }
   } 
       
};