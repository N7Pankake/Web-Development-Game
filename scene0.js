//Menu
var scenes = {};
var centerX = 1200/2, centerY = 800/2 + 285, link, speed=4;
scenes.scene0 = function(){};
scenes.scene0.prototype = {
    preload: function (){
        game.load.image('LinkR', 'Assets/Sprites/ResizedLink/LinkRight.png');
        game.load.image('Background2', 'Assets/Sprites/Backgrounds/Background2.png');
    },
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000000';
        console.log('scene0');
        addChangeStateEventListeners();
        
        //game.world.setbounds(0,0, 1200, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background2 = game.add.sprite(0, 0, 'Background2');
        
        link = game.add.sprite(centerX, centerY, 'LinkR');
        link.anchor.setTo(0.5, 0.5);
        game.physics.enable(link);
        link.body.collideWorldBounds = true;
        
        game.camera.follow(link);
        //game.camera.deadzone = new Phaser.Rectangle(centerX)
    },
    update: function (){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                link.scale.setTo(1,1);
                link.x += speed;
            }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                link.scale.setTo(-1,1);
                link.x -= speed;
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