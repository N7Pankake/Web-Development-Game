scenes.scene6 = function(){};
scenes.scene6.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#AA00FF';
        console.log('scene6');
        
        addChangeStateEventListeners();
    },
    update: function (){}
};