//Select difficulty

scenes.scene2 = function(){};
var easy,normal,hard;
scenes.scene2.prototype = {
    create: function (){
       
        game.add.sprite(0,0, 'title');
        
        var text1 = "Main Menu"
        var text2 = "Easy"
        var text3 = "Normal"
        var text4 = "Hard"
        
        
        
        sound = game.add.audio('pop');
        sound.addMarker('blep', 0, 0.1);
        var b1 = game.add.button(100,300, 'button', function() {
            changeState(null, 1);
        });
        
        var b2 = game.add.button(950,200, 'button', function() {
            easy = true;
            ghostSpeed = 25;
            changeState(null, 5);
        });
        
        var b3 = game.add.button(950,350, 'button', function() {
            normal = true;
            ghostSpeed = 50;
            changeState(null, 5);
        });
        
        var b4 = game.add.button(950,500, 'button', function() {
            ghostSpeed = 75;
            hard = true;
            changeState(null, 5);
        });
        
        
        
        
        b1.onInputDown.add(this.tint, b1);        
        b2.onInputDown.add(this.tint, b2);
        b3.onInputDown.add(this.tint, b3);
        b4.onInputDown.add(this.tint, b4);
        
        b1.onInputUp.add(this.unTint, b1);
        b2.onInputUp.add(this.unTint, b2);
        b3.onInputUp.add(this.tint, b3);
        b4.onInputUp.add(this.tint, b4);
        
        game.add.text(140,390, text1);
        game.add.text(1020,290, text2);
        game.add.text(1010,440, text3);
        game.add.text(1020,590, text4);
        
      },
     tint: function() {
         this.tint = 0xbbbbbb;
         sound.play('blep');
      },
     unTint: function() {
         this.tint = 0xFFFFFF;
     }
};