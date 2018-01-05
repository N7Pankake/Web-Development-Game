scenes.scene1 = function(){};

var cursors;
var vel = 500;
var level1;

scenes.scene1.prototype = {
    preload: function (){
        game.load.tilemap('level_01', 'Assets/Sprites/Levels/level_01.json' , null, Phaser.Tilemap.TILED_JSON);
        game.load.image('zelda_01', 'Assets/Sprites/Levels/zelda_01.png');
        game.load.spritesheet('LinkSideMovement', 'Assets/Sprites/ResizedLink/LinkSideAnim.png', 150, 150);
        
    },
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#FF0000';
        addChangeStateEventListeners();
        
        var map = game.add.tilemap('level_01');
        map.addTilesetImage('zelda_01');
        
        level1 = map.createLayer('groundlayer');
        
        map.setCollisionBetween(29, 50, true, 'groundlayer');
        map.setCollisionBetween(52, 67, true, 'groundlayer');
        
        link = game.add.sprite((centerX-50), (centerY-300), 'LinkSideMovement');
        link.scale.setTo(0.25, 0.25);
        game.physics.enable(link);
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function (){
        
        game.physics.arcade.collide(link, level1);
        
        if(cursors.up.isDown){
                link.body.velocity.y = -vel;
            }
        
        else if(cursors.down.isDown){
                link.body.velocity.y = vel;
            }
        
        else{
            link.body.velocity.y = 0;
        }
        
        if(cursors.left.isDown){
                link.body.velocity.x = -vel;
            }
        
        else if(cursors.right.isDown){
                link.body.velocity.x = vel;
            }
        
        else{
            link.body.velocity.x = 0;
        }
    }
};