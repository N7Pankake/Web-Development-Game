scenes.scene1 = function(){};

var cursors;
var vel = 350;
var level1;

scenes.scene1.prototype = {
    preload: function (){},
    
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#FF0000';
        addChangeStateEventListeners();
        
        var map = game.add.tilemap('level_01');
        map.addTilesetImage('zelda_01');
        
        level1 = map.createLayer('groundlayer');
        
        map.setCollisionBetween(29, 50, true, 'groundlayer');
        map.setCollisionBetween(52, 67, true, 'groundlayer');
        
        link = game.add.sprite((centerX-50), (centerY-300), 'LinkMovement');
        link.scale.setTo(0.25, 0.25);
        link.animations.add('walkHorizontalRight', [6,7,8]);
        link.animations.add('walkHorizontalLeft', [9,10,11]);
        link.animations.add('walkVerticalDown', [0,1,2]);
        link.animations.add('walkVerticalUp', [3,4,5]);
        game.physics.enable(link);
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function (){
        
        game.physics.arcade.collide(link, level1);
        
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
    }
};