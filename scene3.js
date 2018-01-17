//Instructions
scenes.scene3 = function(){};
scenes.scene3.prototype = {
    preload: function (){},
    create: function (){
        
        game.stage.backgroundColor = '#0E5135';
        var instructions = game.add.sprite(208,0, 'instructions');
        instructions.scale.setTo(0.75,0.75);
        
        sound = game.add.audio('pop');
        sound.addMarker('blep', 0, 0.1);
        
        //Movement buttons sprites
        var keyUp = game.add.sprite(300,250, 'buttonUP');
        keyUp.scale.setTo(0.25,0.25);
        var keyDown = game.add.sprite(300,320, 'buttonDOWN');
        keyDown.scale.setTo(0.25,0.25);
        var keyLeft = game.add.sprite(265,285, 'buttonLEFT');
        keyLeft.scale.setTo(0.25,0.25);
        var keyRight = game.add.sprite(335,285, 'buttonRIGHT');
        keyRight.scale.setTo(0.25,0.25);
        var keyLDD = game.add.sprite(265,320, 'buttonLDDOWN');
        keyLDD.scale.setTo(0.25,0.25);
        var keyLDU = game.add.sprite(265,250, 'buttonLDUP');
        keyLDU.scale.setTo(0.25,0.25);
        var keyRDD = game.add.sprite(335,320, 'buttonRDDOWN');
        keyRDD.scale.setTo(0.25,0.25);
        var keyRDU = game.add.sprite(335,250, 'buttonRDUP');
        keyRDU.scale.setTo(0.25,0.25);
        var keyPAD = game.add.sprite(300,285, 'buttonPAD');
        keyPAD.scale.setTo(0.25,0.25);
        
        //Attack buttons sprites
        var keyFire = game.add.sprite(280,400, 'buttonFire');
        keyFire.scale.setTo(0.25,0.25);
        var keyBomb = game.add.sprite(280,575, 'buttonBomb');
        keyBomb.scale.setTo(0.25,0.25);
        var keyArrow = game.add.sprite(280,690, 'buttonArrow');
        keyArrow.scale.setTo(0.25,0.25);
        
       
        var text1 = "Welcome to The Legend of Meldaz the undead trial instructions."
        var text2 = "Movement:"
        var text3 = "If you are playing from a computer you will be able \nto move with your Arrow Keys if not you can move with\nthe arrow buttons in display."
        var text4 = "Attacks:"
        var text5 = "FIREBALL (W): Will destroy everything on its path this includes\nANY consumable that enemies, rocks or bushes are supose\nto drop use it wisely because it can only be cast if you have 50%\nor higher mana with a cooldown of 5 seconds."
        var text6 = "BOMBS (Q): Bombs will destroy enemies with ease as soon as\n the enemy have contact with them, you can only have one \nhundred (100) bombs in the map at the same time."
        var text7 = "ARROWS (SpaceBar): Arrows will destroy enemies in one (1) \nshot, bushes in two(2) shots and rocks in (3) shots. "
        game.add.text(250,150, text1, {font: "", fill: "#DAA520", align: ""});
        game.add.text(250,190, text2, {font: "", fill: "#DAA520", align: ""});
        game.add.text(385,255, text3, {font: "", fill: "#DAA520", align: ""});
        game.add.text(250,365, text4, {font: "", fill: "#DAA520", align: ""});
        game.add.text(385,405, text5, {font: "", fill: "#DAA520", align: ""});
        game.add.text(385,560, text6, {font: "", fill: "#DAA520", align: ""});
        game.add.text(385,700, text7, {font: "", fill: "#DAA520", align: ""});
        
        var buttonText = "Main Menu"
        var b1 = game.add.button(25,375, 'button', function() {
            changeState(null, 1);
        });
        b1.scale.setTo(0.75,0.75);
        b1.onInputDown.add(this.tint, b1);  
        b1.onInputUp.add(this.unTint, b1);
        game.add.text(33,435, buttonText); 
        
    },
    update: function (){},
     
    tint: function() {
         this.tint = 0xbbbbbb;
         sound.play('blep');
      },
     unTint: function() {
         this.tint = 0xFFFFFF;
     }
};

