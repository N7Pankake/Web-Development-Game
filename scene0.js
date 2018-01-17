//Preloader

var scenes = {};

//Map Related
var centerX = 1216/2, centerY = 800/2 + 285, worldScale = 1;

//Player/GUI
var cursors, life, hitpoints=3, manaBar, mana = 0;

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
        game.load.spritesheet('bigGhost', 'Assets/Sprites/Enemy/Ghost.png', 30, 30);
        
        //Player/Camera Related
        game.load.spritesheet('LinkMovement', 'Assets/Sprites/ResizedLink/LinkMovement.png', 150, 150);
        
        //Weapons (Arrow/Bombs) related
        game.load.image('arrow', 'Assets/Sprites/GUI/miniArrow.png');
        game.load.image('fireball', 'Assets/Sprites/GUI/bigfire.png');
        game.load.image('bomb', 'Assets/Sprites/GUI/bombSprite.png');
        game.load.image('bombSash', 'Assets/Sprites/GUI/bombSash.png');
        game.load.image('BunchofArrows', 'Assets/Sprites/GUI/BunchofArrows.png');
        
        //Healing up
        game.load.image('Hearth', 'Assets/Sprites/GUI/Hearth.png');
        game.load.image('ManaPot', 'Assets/Sprites/GUI/ManaPotion.png');
        
        //Menu/Gui Related
        game.load.image('title', 'Assets/Sprites/GUI/MainMenu.png');
        game.load.image('instructions', 'Assets/Sprites/GUI/InstructionsTitle.png');
        game.load.image('button', 'Assets/Sprites/GUI/Boton.png');
        game.load.image('buttonFire', 'Assets/Sprites/GUI/Fire.png');
        game.load.image('buttonBomb', 'Assets/Sprites/GUI/Bomb.png');
        game.load.image('buttonArrow', 'Assets/Sprites/GUI/Arrow.png');
        
        game.load.spritesheet('lifeBar', 'Assets/Sprites/GUI/Hearths.png', 580 , 150);
        game.load.spritesheet('manaBar', 'Assets/Sprites/GUI/ManaBar.png', 102 , 5);
        
        game.load.image('buttonUP', 'Assets/Sprites/GUI/ArrowKeysUP.png');
        game.load.image('buttonDOWN', 'Assets/Sprites/GUI/ArrowKeysDOWN.png');
        game.load.image('buttonLEFT', 'Assets/Sprites/GUI/ArrowKeysLEFT.png');
        game.load.image('buttonRIGHT', 'Assets/Sprites/GUI/ArrowKeysRIGHT.png');
        game.load.image('buttonLDUP', 'Assets/Sprites/GUI/LeftDiagonalUp.png');
        game.load.image('buttonLDDOWN', 'Assets/Sprites/GUI/LeftDiagonalDown.png');
        game.load.image('buttonRDUP', 'Assets/Sprites/GUI/RightDiagonalUp.png');
        game.load.image('buttonRDDOWN', 'Assets/Sprites/GUI/RightDiagonalDown.png');
        game.load.image('buttonPAD', 'Assets/Sprites/GUI/PAD.png');
        game.load.image('GAMEOVER', 'Assets/Sprites/GUI/GameOver3.png');
        game.load.image('Shield', 'Assets/Sprites/GUI/ShieldedIcon.png');
        game.load.image('NoFireBall', 'Assets/Sprites/GUI/Nofire.png');
        
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