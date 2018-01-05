//Preloader
var scenes = {};
var centerX = 1216/2, centerY = 800/2 + 285, link, speed=4;
scenes.scene0 = function(){};
scenes.scene0.prototype = {
    preload: function (){
        game.load.tilemap('level_01', 'Assets/Sprites/Levels/level_01.json' , null, Phaser.Tilemap.TILED_JSON);
        game.load.image('zelda_01', 'Assets/Sprites/Levels/zelda_01.png');
        game.load.spritesheet('LinkMovement', 'Assets/Sprites/ResizedLink/LinkMovement.png', 150, 150);
    },
    create: function (){
        game.stage.backgroundColor = '#FF0000';
        addChangeStateEventListeners();
        game.world.setBounds(0,0, 1216, 800);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        game.camera.follow(link);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 200 , 0, 600,800)
    },
    update: function (){}
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