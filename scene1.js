scenes.scene1 = function(){};
scenes.scene1.prototype = {
    preload: function (){
        game.load.tilemap('level_01', 'Assets/Sprites/Levels/level_01.json' , null, Phaser.Tilemap.TILED_JSON);
        game.load.image('zelda_01', 'Assets/Sprites/Levels/zelda_01.png');
        
    },
    create: function (){
        game.stage.backgroundColor = '#FF0000';
        addChangeStateEventListeners();
        
        var map = game.add.tilemap('level_01');
        map.addTilesetImage('zelda_01');
        
        var level1 = map.createLayer('groundlayer');
    },
    update: function (){}
};