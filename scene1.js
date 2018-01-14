//Main Menu

scenes.scene1 = function(){};
scenes.scene1.prototype = {
    create: function (){
       
        game.add.sprite(0,0, 'title');
        
        var text1 = "Play"
        var text2 = "Levels"
        
        sound = game.add.audio('pop');
        sound.addMarker('blep', 0, 0.1);
        
        var b1 = game.add.button(900,300, 'button', function() {
            hitpoints = 3;
            arrowsOwned = 30;
            score = 0;
            changeState(null, 3);
        });
        
        var b2 = game.add.button(900,500, 'button', function() {
            changeState(null, 2);
        });
        
        
        b1.onInputDown.add(this.tint, b1);        
        b2.onInputDown.add(this.tint, b2);
        
        b1.onInputUp.add(this.unTint, b1);
        b2.onInputUp.add(this.unTint, b2);
        
        game.add.text(975,390, text1);
        game.add.text(965,590, text2);
             
      },
    update: function (){
    },
     tint: function() {
         this.tint = 0xbbbbbb;
         sound.play('blep');
      },
     unTint: function() {
         this.tint = 0xFFFFFF;
     }
};