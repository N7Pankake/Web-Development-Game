scenes.scene1 = function(){};
scenes.scene1.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#FF0000';
        
        addChangeStateEventListeners();
    },
    update: function (){}
};