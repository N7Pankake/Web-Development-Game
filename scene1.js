//Main Menu

scenes.scene1 = function(){};
scenes.scene1.prototype = {
    create: function (){
       
        game.add.sprite(0,0, 'title');
        
        var text1 = "Play"
        var text2 = "Instructions"
        var text3 = "Highscores"
        
        sound = game.add.audio('pop');
        sound.addMarker('blep', 0, 0.1);
        
        var b1 = game.add.button(900,150, 'button', function() {
        changeState(null, 2);
        });
        
        var b2 = game.add.button(900,350, 'button', function() {
            changeState(null, 3);
        });
        
        var b3 = game.add.button(900,550, 'button', function() {
            changeState(null, 4);
        });
        
        
        b1.onInputDown.add(this.tint, b1);        
        b2.onInputDown.add(this.tint, b2);
        b3.onInputDown.add(this.tint, b3);
        
        b1.onInputUp.add(this.unTint, b1);
        b2.onInputUp.add(this.unTint, b2);
        b3.onInputUp.add(this.unTint, b3);
        
        game.add.text(975,240, text1);
        game.add.text(935,440, text2);
        game.add.text(935,640, text3);
             
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