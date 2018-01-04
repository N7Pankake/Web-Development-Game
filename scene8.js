scenes.scene8 = function(){};
scenes.scene8.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#808080';
        console.log('scene8');
        
        addChangeStateEventListeners();
    },
    update: function (){}
};