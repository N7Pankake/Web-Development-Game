scenes.scene2 = function(){};
scenes.scene2.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#FFFF00';
        console.log('scene2');
        
        addChangeStateEventListeners();
    },
    update: function (){}
};