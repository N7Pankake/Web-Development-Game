//Select Level

scenes.scene2 = function(){};
scenes.scene2.prototype = {
    create: function (){
       
        game.stage.backgroundColor = '#FFFF00';
        game.add.sprite(0,0, 'title');
        addChangeStateEventListeners();
        
        var text1 = "Main Menu"
        var text2 = "Level 1"
        var text3 = "Level 2"
        var text4 = "Level 3"
        var text5 = "Level 4"
        var text6 = "Level 5"
        
        sound = game.add.audio('pop');
        sound.addMarker('blep', 0, 0.1);
        var b1 = game.add.button(100,300, 'button', function() {
            changeState(null, 1);
        });
        
        var b2 = game.add.button(800,100, 'button', function() {
            changeState(null, 3);
        });
        
        var b3 = game.add.button(800,250, 'button', function() {
            changeState(null, 4);
        });
        
        var b4 = game.add.button(800,400, 'button', function() {
            changeState(null, 5);
        });
        
        var b5 = game.add.button(1005,100, 'button', function() {
            changeState(null, 6);
        });
        
        var b6 = game.add.button(1005,250, 'button', function() {
            changeState(null, 7);
        });
        
        
        
        
        b1.onInputDown.add(this.tint, b1);        
        b2.onInputDown.add(this.tint, b2);
        b3.onInputDown.add(this.tint, b3);
        b4.onInputDown.add(this.tint, b4);
        b5.onInputDown.add(this.tint, b5);
        b6.onInputDown.add(this.tint, b6);
        
        b1.onInputUp.add(this.unTint, b1);
        b2.onInputUp.add(this.unTint, b2);
        b3.onInputUp.add(this.tint, b3);
        b4.onInputUp.add(this.tint, b4);
        b5.onInputUp.add(this.tint, b5);
        b6.onInputUp.add(this.tint, b6);
        
        game.add.text(140,390, text1);
        game.add.text(860,190, text2);
        game.add.text(860,340, text3);
        game.add.text(860,490, text4);
        game.add.text(1065,190, text5);
        game.add.text(1065,340, text6);
        
      },
     tint: function() {
         this.tint = 0xbbbbbb;
         sound.play('blep');
      },
     unTint: function() {
         this.tint = 0xFFFFFF;
     }
};