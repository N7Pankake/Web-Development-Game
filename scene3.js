scenes.scene3 = function(){};
scenes.scene3.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#00FF00';
        console.log('scene3');
        
        addChangeStateEventListeners();
    },
    update: function (){}
};