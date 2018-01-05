//Demo scene/Main logic 
var scenes = {};
var centerX = 1216/2, centerY = 800/2 + 285, link, speed=4;
scenes.scene0 = function(){};
scenes.scene0.prototype = {
    preload: function (){
        game.load.spritesheet('LinkSideMovement', 'Assets/Sprites/ResizedLink/LinkSideAnim.png', 150, 150);
        game.load.image('Background_01', 'Assets/Sprites/Backgrounds/Background_01.png');
    },
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000000';
        
        addChangeStateEventListeners();
        
        //game.world.setbounds(0,0, 1200, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background2 = game.add.sprite(0, 0, 'Background_01');
        
        link = game.add.sprite(centerX, centerY, 'LinkSideMovement');
        link.anchor.setTo(0.5, 0.5);
        game.physics.enable(link);
        link.body.collideWorldBounds = true;
        link.animations.add('walk', [0, 1, 2, 3, 4, 5, 6]);
        
        game.camera.follow(link);
        //game.camera.deadzone = new Phaser.Rectangle(centerX)
    },
    update: function (){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                link.scale.setTo(1,1);
                link.x += speed;
                link.animations.play('walk', 8, true);
            }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                link.scale.setTo(-1,1);
                link.x -= speed;
                link.animations.play('walk', 8, true);
            }
        else{
            link.animations.stop('walk');
            link.frame = 0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
            {
                link.y -= speed;
                if(link.y < 615)
                    {
                        link.y = 615;
                    }
            }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
            {
                link.y += speed;
            }
        
    }
};

function changeState(i, sceneNum){
    console.log('scene' + sceneNum);
    game.state.start('scene' + sceneNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
        addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0)
        addKeyCallback(Phaser.Keyboard.ONE, changeState, 1)
        addKeyCallback(Phaser.Keyboard.TWO, changeState, 2)
        addKeyCallback(Phaser.Keyboard.THREE, changeState, 3)
        addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4)
        addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5)
        addKeyCallback(Phaser.Keyboard.SIX, changeState, 6)
        addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7)
        addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8)
        addKeyCallback(Phaser.Keyboard.NINE, changeState, 9)
}