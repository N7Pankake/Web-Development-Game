//Level 2
scenes.scene4 = function(){};
scenes.scene4.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#00FFFF';
        
      
       var fireButton = game.add.button(487.50,240, 'buttonFire', function() {
            changeState(null, 1);
        });
        fireButton.alpha = 0.5;
        fireButton.scale.setTo(0.20,0.20);
        fireButton.fixedToCamera = true;
        
       var swordButton = game.add.button(525,300, 'buttonSword', function() {
            changeState(null, 1);
        });
        swordButton.alpha = 0.5;
        swordButton.scale.setTo(0.20,0.20);
        swordButton.fixedToCamera = true;
        
      var  arrowButton = game.add.button(450,300, 'buttonArrow', function() {
            changeState(null, 1);
        });
        arrowButton.alpha = 0.5;
        arrowButton.scale.setTo(0.20,0.20);
        arrowButton.fixedToCamera = true;
        
        
        fireButton.onInputDown.add(this.tint, fireButton);        
        swordButton.onInputDown.add(this.tint, swordButton);
        arrowButton.onInputDown.add(this.tint, arrowButton);
        
        fireButton.onInputUp.add(this.unTint, fireButton);
        swordButton.onInputUp.add(this.unTint, swordButton);
        arrowButton.onInputDown.add(this.tint, arrowButton);
        
    },
    tint: function() {
         this.tint = 0xbbbbbb;
         sound.play('blep');
      },
     unTint: function() {
         this.tint = 0xFFFFFF;
     },
    update: function (){}
};