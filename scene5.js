scenes.scene5 = function(){};
scenes.scene5.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#000FFF';
        console.log('scene5');
        
        addChangeStateEventListeners();
    },
    update: function (){}
};