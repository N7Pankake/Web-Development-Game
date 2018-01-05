//Main Menu

scenes.scene1 = function(){};
scenes.scene1.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#FFFF00';
        
        addChangeStateEventListeners();
    },
    update: function (){}
};