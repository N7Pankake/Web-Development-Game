//Preloader

var scenes = {};

//Map Related
var centerX = 1216/2, centerY = 800/2 + 285, worldScale = 1;

//Player/GUI
var cursors, life, hitpoints=3;

//Music
var music;

scenes.scene0 = function(){};
scenes.scene0.prototype = {
    preload: function (){
        //Map Related
        game.world.setBounds(0,0, 1216, 800);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.background = '#FF0000';
        game.load.tilemap('level_01', 'Assets/Sprites/Levels/level_01.json' , null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Rocky', 'Assets/Sprites/Objects/Rock.png');
        game.load.image('tBush', 'Assets/Sprites/Objects/topBush.png');
        game.load.image('bBush', 'Assets/Sprites/Objects/downBush.png');
        game.load.image('lBush', 'Assets/Sprites/Objects/leftBush.png');
        game.load.image('rBush', 'Assets/Sprites/Objects/rightBush.png');
        
        //Player/Camera Related
        game.load.spritesheet('LinkMovement', 'Assets/Sprites/ResizedLink/LinkMovement.png', 150, 150);
        
        //Arrow related
        game.load.image('arrow', 'Assets/Sprites/GUI/miniArrow.png');
        game.load.image('BunchofArrows', 'Assets/Sprites/GUI/BunchofArrows.png');
        
        //Menu/Gui Related
        game.load.image('title', 'Assets/Sprites/GUI/MainMenu.png');
        game.load.image('button', 'Assets/Sprites/GUI/Boton.png');
        game.load.image('buttonFire', 'Assets/Sprites/GUI/Fire.png');
        game.load.image('buttonSword', 'Assets/Sprites/GUI/Sword.png');
        game.load.image('buttonArrow', 'Assets/Sprites/GUI/Arrow.png');
        game.load.spritesheet('lifeBar', 'Assets/Sprites/GUI/Hearths.png', 580 , 150);
        game.load.spritesheet('joystick', 'Assets/Sprites/GUI/Joystick.png' ,320,320);
        
        //Audio/Music Related
        game.load.audio('pop','Assets/Sounds/Blip_Select.wav');
        game.load.audio('openWorld','Assets/Sounds/Open_World.wav');
        
    },
    create: function (){
        this.state.start('scene1');
    },
    update: function (){
    }
};

function changeState(i, sceneNum){
    console.log('scene' + sceneNum);
    game.state.start('scene' + sceneNum);
}