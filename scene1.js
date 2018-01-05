scenes.scene1 = function(){};
scenes.scene1.prototype = {
    preload: function (){},
    create: function (){
        game.load.tilemap('Level1', 'Assets/Sprites/TileMaps/Level1.json' , null, Phaser.Tilemap.TILED_JSON);
        
        addChangeStateEventListeners();
    },
    update: function (){}
};