//GAME OVER
scenes.scene6 = function(){};
scenes.scene6.prototype = {
    preload: function (){},
    create: function (){
        game.add.image(0, 0, 'GAMEOVER');
var text1 = "Restart"
        var text2 = "Main Menu"
        
        sound = game.add.audio('pop');
        sound.addMarker('blep', 0, 0.1);
        
        var b1 = game.add.button(900,300, 'button', function() {
            changeState(null, 5);
        });
        
        var b2 = game.add.button(900,500, 'button', function() {
            changeState(null, 1);
        });
        
        
        b1.onInputDown.add(this.tint, b1);        
        b2.onInputDown.add(this.tint, b2);
        
        b1.onInputUp.add(this.unTint, b1);
        b2.onInputUp.add(this.unTint, b2);
        
        game.add.text(955,390, text1);
        game.add.text(935,590, text2);
             
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
}