scenes.scene1 = function(){};
scenes.scene1.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#FF0000';
        console.log('scene1');
        
        addChangeStateEventListeners();
    },
    update: function (){}
};