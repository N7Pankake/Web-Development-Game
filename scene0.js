//Preloader
var scenes = {};
//Map Related
var centerX = 1216/2, centerY = 800/2 + 285, worldScale = 1;
//Player
var link, vel = 350, cursors, life,hitPoints = 2;
//Music
var music;


scenes.scene0 = function(){};
scenes.scene0.prototype = {
    preload: function (){
        //Map Related
        game.load.tilemap('level_01', 'Assets/Sprites/Levels/level_01.json' , null, Phaser.Tilemap.TILED_JSON);
        
        game.stage.backgroundColor = '#FF0000';
        game.world.setBounds(0,0, 1216, 800);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //Player/Camera Related
        game.load.spritesheet('LinkMovement', 'Assets/Sprites/ResizedLink/LinkMovement.png', 150, 150);
        game.camera.follow(link);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 200 , 0, 600,800)
        
        //Menu/Gui Related
        game.load.image('title', 'Assets/Sprites/GUI/MainMenu.png');
        game.load.image('button', 'Assets/Sprites/GUI/Boton.png');
        game.load.image('buttonFire', 'Assets/Sprites/GUI/Fire.png');
        game.load.image('buttonSword', 'Assets/Sprites/GUI/Sword.png');
        game.load.spritesheet('lifeBar', 'Assets/Sprites/GUI/Hearths.png', 580 , 150);
        
        game.load.atlas('Joystick', 'Assets/Sprites/GUI/Wheel.png','Assets/Sprites/GUI/Ball.png');
        
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
