scenes.scene4 = function(){};
scenes.scene4.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#00FFFF';
        console.log('scene4');
        
        addChangeStateEventListeners();
    },
    update: function (){}
};