//Level 1

scenes.scene3 = function(){};

//Player stats
var link, vel = 250, inmortality;
//facing
var up, down, left, right;

//Game System
var waveNumber = 1;
var enemiesAlive = 0;
var enemies;
var enemyText; 
var waveNumberText; 
var enemyCreationCD;
var waveTimer;
var waveStarts;
var waveON;
var ghostSpeed = 50;

//Arrow
var arrow;
var fireRate = 300;
var nextArrow = 0;
var arrowsOwned = 5;
var arrowText;
var arrowGUI;
var bunchOfArrows;
var quiver;
var randomQuiver;

//Bombs
var bomb;
var bombRate = 100;
var nextBomb = 0;
var bombsOwned = 3;
var bombText;
var bombGUI;
var bunchOfBombs;
var bombSash;
var randomBomb;

//fireBall
var fireBall;
var nextFireBall = 0, fireBallRate = 5000;

//Health
var hearths;
var randomHearth;

//Mana
var manaRegen;
var manaPots;
var randomManaPot;
var manaText;

//Map/Level/GUI
var map; 
var fireButton, bombButton, arrowButton, upButton, downButton, leftButton,rightButton,padButton;
var fireButtonTouch, bombButtonTouch, arrowButtonTouch;

//Buffs
var buffs, shield, noFireball;
//Tiled Layers
var floor, water,walls;

//Object Tiled Layers
var rocks
var bushes1, bushes2, bushes3, bushes4;

//BUTTONS
var buttonL = false, buttonR = false, buttonU = false, buttonD = false;
var buttonLDU = false, buttonLDD = false, buttonRDU = false, buttonRDD = false;
var leftButton, rightButton, upButton, downButton;
var leftDUButton, leftDDbutton, rightDUButton, rightDDButton;

scenes.scene3.prototype = {
    preload: function (){
        
        game.load.image('tiles', 'Assets/Sprites/Levels/zelda_01.png');
        music = game.add.audio('openWorld');
        music.addMarker('openWorld', 0, 16, true);
        music.play('openWorld', 0,1,true);
        game.scale.setGameSize(1216/2, 800/2);
        
            hitpoints = 3;
            inmortality = false;
            randomHearth = true;
            mana = 0;
            manaRegen = false;
            randomManaPot = true;
            arrowsOwned = 5;
            randomQuiver = true;
            bombsOwned = 3;
            randomBomb = true;
            waveNumber = 1;
            enemiesAlive = 0;
            ghostSpeed = 50;
            up = false;
            down = true;
            left = false;
            right = false;
            waveON = false;
            buttonL = false;
            buttonR = false;
            buttonU = false;
            buttonD = false;
            buttonLDU = false;
            buttonLDD = false;
            buttonRDU = false;
            buttonRDD = false;
            fireButtonTouch = false;
    },
    
    create: function (){
        //Game itself
        game.world.setBounds(0,0, 1216, 800);
        game.physics.startSystem(Phaser.Physics.ARCADE);
               
        //map
        map = game.add.tilemap('level_01');
        map.addTilesetImage('tiles');

        floor = map.createLayer('ground');
        walls = map.createLayer('walls');
        water = map.createLayer('water');
        
        map.setCollisionBetween(0, 100, true, 'walls');
        map.setCollisionBetween(0, 100, true, 'water');
        
        //Objects layer related
        //Rocks
        rocks = game.add.physicsGroup();
        map.createFromObjects('rocks',48,'Rocky', 0, true, false, rocks);
        rocks.forEach(function(rocks){
        rocks.body.immovable = true;});  
        
        //Bushes
        bushes = game.add.physicsGroup();
        map.createFromObjects('bushes', 'BUSHTOP', 'tBush', 0, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHBOT', 'bBush', 0, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHLEFT', 'lBush', 0, true, false , bushes);
        map.createFromObjects('bushes', 'BUSHRIGHT', 'rBush', 0, true, false , bushes);
        bushes.forEach(function(bushes){bushes.body.immovable = true;});  
         
        // Player
        link = game.add.sprite(608, 400, 'LinkMovement');
        link.scale.setTo(0.2, 0.2);
        link.anchor.setTo(0.5);
        link.animations.add('walkHorizontalRight', [6,7,8]);
        link.animations.add('walkHorizontalLeft', [9,10,11]);
        link.animations.add('walkVerticalDown', [0,1,2]);
        link.animations.add('walkVerticalUp', [3,4,5]);
        game.physics.enable(link);
        link.body.collideWorldBounds=true;
        
        //Health and Mana GUI
        life = game.add.sprite((game.camera.x), (game.camera.y), 'lifeBar');
        life.scale.setTo(0.15, 0.15);
        life.fixedToCamera = true;
        
        manaBar = game.add.sprite((game.camera.x), (game.camera.y+22), 'manaBar');
        manaBar.scale.setTo(1.5, 1.5);
        manaBar.fixedToCamera = true;
        
        //Arrows available
        arrowGUI = game.add.sprite((game.camera.x), (game.camera.y+30), 'BunchofArrows');
        arrowGUI.scale.setTo(1.15, 1.15);
        arrowGUI.fixedToCamera = true;
        arrowText = game.add.text((game.camera.x+30), (game.camera.y+30), "X "+arrowsOwned, {font: "", fill: "#DAA520", align: ""});
        arrowText.fixedToCamera = true;
        
        //Bombs available
        bombGUI = game.add.sprite((game.camera.x), (game.camera.y+60), 'bombSash');
        bombGUI.scale.setTo(1, 1);
        bombGUI.fixedToCamera = true;
        bombText = game.add.text((game.camera.x+30), (game.camera.y+60), "X "+bombsOwned, {font: "", fill: "#DAA520", align: ""});
        bombText.fixedToCamera = true;
        
        //BUFFS
        buffs = game.add.text((game.camera.x+400), (game.camera.y+0), "Buffs ON: ", {font: "", fill: "#DAA520", align: ""});
        buffs.fixedToCamera = true;
        
        //Inmortality
        shield = game.add.sprite((game.camera.x+535), (game.camera.y), 'Shield');
        shield.alpha = 0;
        shield.scale.setTo(0.2, 0.2);
        shield.fixedToCamera = true;
        
        //Fireball CD
        noFireBall = game.add.sprite((game.camera.x+575), (game.camera.y+7.5), 'NoFireBall');
        noFireBall.alpha = 0;
        noFireBall.scale.setTo(1,1);
        noFireBall.fixedToCamera = true;
        
        //Arrows and quivers
        arrow = game.add.group();
        arrow.enableBody = true;
        arrow.physicsBodyType = Phaser.Physics.ARCADE;
        arrow.createMultiple(30, 'arrow');
        arrow.setAll('anchor.x', 0.5);
        arrow.setAll('anchor.y', 1);
        arrow.setAll('outOfBoundsKill', true);
        arrow.setAll('checkWorldBounds', true);
        //Quivers
        quiver = game.add.group();
        quiver.enableBody = true;
        quiver.physicsBodyType = Phaser.Physics.ARCADE;
        //Random Quivers Spawn
        randomQuiverTimer = game.time.create(false);
        
        //Bombs and Sashs
        bomb = game.add.group();
        bomb.enableBody = true;
        bomb.physicsBodyType = Phaser.Physics.ARCADE;
        bomb.createMultiple(100, 'bomb');
        bomb.setAll('anchor.x', 0.5);
        bomb.setAll('anchor.y', 1);
        bomb.setAll('outOfBoundsKill', true);
        bomb.setAll('checkWorldBounds', true);
        //Bomb Sashs
        bombSash = game.add.group();
        bombSash.enableBody = true;
        bombSash.physicsBodyType = Phaser.Physics.ARCADE;
        //Random Bomb Sashs Spawn
        randomSashTimer = game.time.create(false);
        
        //Arrows and quivers
        fireBall = game.add.group();
        fireBall.enableBody = true;
        fireBall.physicsBodyType = Phaser.Physics.ARCADE;
        fireBall.createMultiple(2, 'fireball');
        fireBall.setAll('anchor.x', 0.5);
        fireBall.setAll('anchor.y', 1);
        fireBall.setAll('anchor.y', 1);
        fireBall.setAll('outOfBoundsKill', true);
        fireBall.setAll('checkWorldBounds', true);
        
        //Hearths
        hearths = game.add.group();
        hearths.enableBody = true;
        hearths.physicsBodyType = Phaser.Physics.ARCADE;
        //Random Hearth
        randomHearthTimer = game.time.create(false);
        
        //Hearths
        manaPots = game.add.group();
        manaPots.enableBody = true;
        manaPots.physicsBodyType = Phaser.Physics.ARCADE;
        //Random Hearth
        randomManaPotTimer = game.time.create(false);
        
        // Camera Related
        game.camera.height = 508;
        game.camera.width = 300;
        game.camera.setSize(608,400);
        game.camera.bounds = (null);
        game.camera.follow(link); //normal follow
        
        //Waves texts and timer
        waveTimer = game.add.text((game.camera.x+200), (game.camera.y+175), "Wave starts in: "+waveStarts, {font: "", fill: "#DAA520", align: ""});
        waveTimer.fixedToCamera = true;
        
        waveNumberText = game.add.text((game.camera.x +200), (game.camera.y), "Wave: "+waveNumber, {font: "", fill: "#DAA520", align: ""});
        waveNumberText.fixedToCamera = true;
        
        waveStarts = game.time.create(false);
        waveStarts.add(5000, function(){createEnemies()});
        var tween = game.add.tween(waveTimer).to({alpha: 0}, 1000, "Linear", true);
        tween.repeat (5,0);
        waveStarts.start();
        
        //Mana timer and text
        manaRegenTimer = game.time.create(false);
        manaRegenTimer.add(1000, function(){playerMana()});
        manaRegenTimer.start();
        
        manaText = game.add.text((game.camera.x+65 ), (game.camera.y+19), mana+"%", {font: "23", fill: "#DAA520", align: ""});
        manaText.fixedToCamera = true;
        
        //Enemy
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        
        //Fire Ball CD
        noFireBallTimer = game.time.create(false);
        
        ///Buttons/Keyboard
        //UP Key
        upButton = game.add.button(75,230, 'buttonUP', null, this, 0, 1, 0, 1);
        upButton.alpha = 0.25;
        upButton.scale.setTo(0.3,0.3);
        upButton.fixedToCamera = true;
        upButton.events.onInputOver.add(function(){buttonU=true; upButton.alpha = 1;});
        upButton.events.onInputOut.add(function(){buttonU=false; upButton.alpha = 0.25;});
        upButton.events.onInputDown.add(function(){buttonU=true; upButton.alpha = 1;});
        upButton.events.onInputUp.add(function(){buttonU=false; upButton.alpha = 0.25;});
        
        //DOWN key
        downButton = game.add.button(75,320, 'buttonDOWN', null, this, 0, 1, 0, 1);
        downButton.alpha = 0.25;
        downButton.scale.setTo(0.3,0.3);
        downButton.fixedToCamera = true;
        downButton.events.onInputOver.add(function(){buttonD=true; downButton.alpha = 1;});
        downButton.events.onInputOut.add(function(){buttonD=false; downButton.alpha = 0.25;});
        downButton.events.onInputDown.add(function(){buttonD=true; downButton.alpha = 1;});
        downButton.events.onInputUp.add(function(){buttonD=false; downButton.alpha = 0.25;});
        
        //LEFT KEY
        leftButton = game.add.button(30,275, 'buttonLEFT', null, this, 0, 1, 0, 1);
        leftButton.alpha = 0.25;
        leftButton.scale.setTo(0.3,0.3);
        leftButton.fixedToCamera = true;
        leftButton.events.onInputOver.add(function(){buttonL=true; leftButton.alpha = 1;});
        leftButton.events.onInputOut.add(function(){buttonL=false; leftButton.alpha = 0.25;});
        leftButton.events.onInputDown.add(function(){buttonL=true; leftButton.alpha = 1;});
        leftButton.events.onInputUp.add(function(){buttonL=false; leftButton.alpha = 0.25;});
        
        //LEFT Diagonal DOWN KEY
        leftDDButton = game.add.button(30,320, 'buttonLDDOWN', null, this, 0, 1, 0, 1);
        leftDDButton.alpha = 0.25;
        leftDDButton.scale.setTo(0.3,0.3);
        leftDDButton.fixedToCamera = true;
        leftDDButton.events.onInputOver.add(function(){buttonL=true; buttonLDD = true; leftDDButton.alpha = 1;});
        leftDDButton.events.onInputOut.add(function(){buttonL=false; buttonLDD = false; leftDDButton.alpha = 0.25;});
        leftDDButton.events.onInputDown.add(function(){buttonL=true; buttonLDD = true; leftDDButton.alpha = 1;});
        leftDDButton.events.onInputUp.add(function(){buttonL=false;  buttonLDD = false; leftDDButton.alpha = 0.25;});
        
        //LEFT Diagonal UP KEY
        leftDUButton = game.add.button(30,230, 'buttonLDUP', null, this, 0, 1, 0, 1);
        leftDUButton.alpha = 0.25;
        leftDUButton.scale.setTo(0.3,0.3);
        leftDUButton.fixedToCamera = true;
        leftDUButton.events.onInputOver.add(function(){buttonL=true; buttonLDU = true; leftDUButton.alpha = 1;});
        leftDUButton.events.onInputOut.add(function(){buttonL=false; buttonLDU = false; leftDUButton.alpha = 0.25;});
        leftDUButton.events.onInputDown.add(function(){buttonL=true; buttonLDU = true; leftDUButton.alpha = 1;});
        leftDUButton.events.onInputUp.add(function(){buttonL=false;  buttonLDU = false; leftDUButton.alpha = 0.25;});
        
        //RIGHTKEY
        rightButton = game.add.button(120,275, 'buttonRIGHT', null, this, 0, 1, 0, 1);
        rightButton.alpha = 0.25;
        rightButton.scale.setTo(0.3,0.3);
        rightButton.fixedToCamera = true;
        rightButton.events.onInputOver.add(function(){buttonR=true; rightButton.alpha = 1;});
        rightButton.events.onInputOut.add(function(){buttonR=false; rightButton.alpha = 0.25;});
        rightButton.events.onInputDown.add(function(){buttonR=true; rightButton.alpha = 1;});
        rightButton.events.onInputUp.add(function(){buttonR=false; rightButton.alpha = 0.25;});
        
        //RIGHT Diagonal DOWN KEY
        rightDDButton = game.add.button(120,320, 'buttonRDDOWN', null, this, 0, 1, 0, 1);
        rightDDButton.alpha = 0.25;
        rightDDButton.scale.setTo(0.3,0.3);
        rightDDButton.fixedToCamera = true;
        rightDDButton.events.onInputOver.add(function(){buttonR=true; buttonRDD = true; rightDDButton.alpha = 1;});
        rightDDButton.events.onInputOut.add(function(){buttonR=false; buttonRDD = false; rightDDButton.alpha = 0.25;});
        rightDDButton.events.onInputDown.add(function(){buttonR=true; buttonRDD = true; rightDDButton.alpha = 1;});
        rightDDButton.events.onInputUp.add(function(){buttonR=false;  buttonRDD = false; rightDDButton.alpha = 0.25;});
        
        //RIGHT Diagonal UP KEY
        rightDUButton = game.add.button(120,230, 'buttonRDUP', null, this, 0, 1, 0, 1);
        rightDUButton.alpha = 0.25;
        rightDUButton.scale.setTo(0.3,0.3);
        rightDUButton.fixedToCamera = true;
        rightDUButton.events.onInputOver.add(function(){buttonR=true; buttonRDU = true; rightDUButton.alpha = 1;});
        rightDUButton.events.onInputOut.add(function(){buttonR=false; buttonRDU = false; rightDUButton.alpha = 0.25});
        rightDUButton.events.onInputDown.add(function(){buttonR=true; buttonRDU = true; rightDUButton.alpha = 1});
        rightDUButton.events.onInputUp.add(function(){buttonR=false;  buttonRDU = false; rightDUButton.alpha = 0.25});
        
        //PAD this do nothing it just make it look better :D
        padButton = game.add.sprite(75,275, 'buttonPAD');
        padButton.alpha = 0.25;
        padButton.scale.setTo(0.3,0.3);
        padButton.fixedToCamera = true;
        
        //Fire Button
        fireButton = game.add.button(487.50,240, 'buttonFire', null, this, 0,1,0,1);
        fireButton.alpha = 0.5;
        fireButton.scale.setTo(0.20,0.20);
        fireButton.fixedToCamera = true;
        fireButton.events.onInputDown.add(function(){fireButtonTouch = true; fireButton.alpha = 1;});
        fireButton.events.onInputUp.add(function(){fireButtonTouch = false; fireButton.alpha = 0.5;});
        
        //Bomb Button
        bombButton = game.add.button(525,300, 'buttonBomb', null, this, 0,1,0,1);
        bombButton.alpha = 0.5;
        bombButton.scale.setTo(0.20,0.20);
        bombButton.fixedToCamera = true;
        bombButton.events.onInputDown.add(function(){bombButtonTouch = true; bombButton.alpha = 1;});
        bombButton.events.onInputUp.add(function(){bombButtonTouch = false; bombButton.alpha = 0.5;});
        
        //Arrow Button
        arrowButton = game.add.button(450,300, 'buttonArrow', null, this, 0,1,0,1);
        arrowButton.alpha = 0.5;
        arrowButton.scale.setTo(0.20,0.20);
        arrowButton.fixedToCamera = true;
        arrowButton.events.onInputDown.add(function(){arrowButtonTouch = true; arrowButton.alpha = 1;});
        arrowButton.events.onInputUp.add(function(){arrowButtonTouch = false; arrowButton.alpha = 0.5;});
        
        //Keyboard
        cursors = game.input.keyboard.createCursorKeys();
        arrowBUTTON = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        bombBUTTON = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        fireBallBUTTON = game.input.keyboard.addKey(Phaser.Keyboard.W);
    },
    
    
    update: function (){
        //mana = 100; //<- just for testing 
        //Collide with Walls, Water, Rocks, Bushes from TILED
        game.physics.arcade.collide(link, walls);
        game.physics.arcade.collide(link, water);
        game.physics.arcade.collide(link, rocks);
        game.physics.arcade.collide(link, bushes);
                
        //Arrows Collide with Rocks and Bushes TILED
        game.physics.arcade.collide(arrow, rocks, hitRock, null, this);
        game.physics.arcade.collide(arrow, bushes, hitBush, null, this);
        
        //FireBall collide with Rocks and Bushes TILED (if you destroy one of this objects with a fireball you don't get RNG consumables from it (Arrows and bombs))
        game.physics.arcade.overlap(fireBall, rocks, hitRockFireBall, null, this);
        game.physics.arcade.overlap(fireBall, bushes, hitBushFireBall, null, this);
        
        //Arrows, bombs Owned and ScoreUpdate
        arrowText.setText("x "+ arrowsOwned);
        bombText.setText("x "+ bombsOwned);
        manaText.setText(mana+"%");
        
        //Enemy vs Arrow 
        game.physics.arcade.overlap(arrow, enemies, killEnemyArrow, null, this);
        //enemy vs Bombs
        game.physics.arcade.overlap(bomb, enemies, killEnemyBomb, null, this);
        //enemy vs Fireball
        game.physics.arcade.overlap(fireBall, enemies, killEnemyFireBall, null, this);
        //Enemy vs Player 
        game.physics.arcade.overlap(link, enemies, hitPlayer, null, this);
        //Enemy vs Enemy
        game.physics.arcade.collide(enemies, enemies, null, null, this);
        //Player vs Objects/Consumables
        game.physics.arcade.overlap(link, quiver, arrowPack, null, this);
        game.physics.arcade.overlap(link, bombSash, bombPack, null, this);
        game.physics.arcade.overlap(link, hearths, hearthPack, null, this);
        game.physics.arcade.overlap(link, manaPots, manaPack, null, this);
        //Player Related
        playerHealth();
        playerMovement();
        
        if(manaRegen)
            {
              manaRegenTimer.add(1000, function(){playerMana()});
              manaRegenTimer.start();
              manaRegen = false;
            }
        
        //GameSystem
        waveTimer.setText("Wave "+waveNumber+" starts in: "+waveStarts.duration);
        waveNumberText.setText("Wave: "+waveNumber);
        
        //Random Objects system
        if(randomBomb === true && waveON === false){
            randomBomb = false;
            randomSashTimer.add(5000, function(){randomSashF()});
            randomSashTimer.start();
        }
        
        if(randomQuiver === true && waveON === false){
            randomQuiver = false;    
            randomQuiverTimer.add(4000, function(){randomQuiverF()});
            randomQuiverTimer.start();
        }
        
        if(randomHearth === true && waveON === false){
            randomHearth = false;    
            randomHearthTimer.add(10000, function(){randomHearthF()});
            randomHearthTimer.start();
        }
        
        if(randomManaPot === true && waveON === false){
            randomManaPot = false;    
            randomManaPotTimer.add(10000, function(){randomManaPotF()});
            randomManaPotTimer.start();
        }
        
        //Wave System
        if (waveON == true && enemiesAlive == 0)
            {
                waveNumber += 1;
                waveON = false;
                waveTimer.alpha = 1;
                waveStarts.add(20000, function(){createEnemies()});
                var tween = game.add.tween(waveTimer).to({alpha: 0}, 1000, "Linear", true);
                tween.repeat (20,0);
                waveStarts.start();
            }
        //Keyboard
        //Shoot arrow with Space bar
        if(arrowBUTTON.isDown){
            fire();
        }
        
        //Drop bomb with Q
        if(bombBUTTON.isDown){
            dropBomb();
        }
        
        //Drop bomb with Q
        if(fireBallBUTTON.isDown){
            gigaFIREBALL();
        }
        
        //Buttons/Phone
        if(fireButtonTouch)
            {
                gigaFIREBALL();
            }
        if(bombButtonTouch)
            {
                dropBomb();
            }
        if(arrowButtonTouch)
            {
                fire();
            }
        
        if ((buttonL == true) && (buttonLDD == false) && (buttonLDU == false)) {
                link.body.velocity.x = -vel;
                link.animations.play('walkHorizontalLeft', 9, true);
                up = false,down = false,left = true,right = false;
        }
        
        else if ((buttonL == true) && (buttonLDD == true)) {
                link.body.velocity.x = -vel;
                link.body.velocity.y = vel;
                up = false,down = false,left = true,right = false;
        }
        
        else if ((buttonL == true) && (buttonLDU == true)) {
                link.body.velocity.x = -vel;
                link.body.velocity.y = -vel;
                up = false,down = false,left = true,right = false;
        }
        
        else if((buttonR == true) && (buttonRDD == false) && (buttonRDU == false)){
                link.body.velocity.x = vel;
                link.animations.play('walkHorizontalRight', 9, true);
                up = false,down = false,left = false,right = true;  
        }
        
        else if ((buttonR == true) && (buttonRDD == true)) {
                link.body.velocity.x = vel;
                link.body.velocity.y = vel;
                up = false,down = false,left = true,right = false;
        }
        
        else if ((buttonR == true) && (buttonRDU == true)) {
                link.body.velocity.x = vel;
                link.body.velocity.y = -vel;
                up = false,down = false,left = true,right = false;
        }
        
        else if(buttonD){
                link.body.velocity.y = vel;
                link.animations.play('walkVerticalDown', 9, true);
                up = false,down = true,left = false,right = false; 
        }
        else if(buttonU){
                link.body.velocity.y = -vel;
                link.animations.play('walkVerticalUp', 9, true);
                up = true,down = false,left = false,right = false; 
        }
        else {
        }
             
        if (ghostSpeed >= vel)
            {
                ghostSpeed = 225;
            }
        //Enemies move towards the player
        enemies.forEach(function(enemy){game.physics.arcade.moveToObject(enemy,link, ghostSpeed);});
        
 }
};

//Player Movement and facing
function playerMovement(){
        if(cursors.up.isDown){
              link.body.velocity.y = -vel;
              link.animations.play('walkVerticalUp', 9, true);
              up = true,down = false,left = false,right = false;
            }
        
        else if(cursors.down.isDown){
              link.body.velocity.y = vel;
              link.animations.play('walkVerticalDown', 9, true);
              up = false,down = true,left = false,right = false;
            }
        
        else{
              link.body.velocity.y = 0;
              link.animations.stop('walkVerticalUp');
              link.animations.stop('walkVerticalDown');
        }
        
        if(cursors.left.isDown){
              link.body.velocity.x = -vel;
              link.animations.play('walkHorizontalLeft', 9, true);
              up = false,down = false,left = true,right = false;
            }
        
        else if(cursors.right.isDown){
              link.body.velocity.x = vel;
              link.animations.play('walkHorizontalRight', 9, true);
              up = false,down = false,left = false,right = true;
            }
        
        else{
              link.body.velocity.x = 0;
              link.animations.stop('walkHorizontalRight');
              link.animations.stop('walkHorizontalLeft');
        }
}

//Fire function changes direction depending on which direction the player is facing
function fire (){
    if (game.time.now > nextArrow)
    {
        nextArrow = game.time.now + fireRate;
        var bullet = arrow.getFirstExists(false);

        if(bullet){
            if(arrowsOwned >= 1)
                {
                if(up == true && down == false && right == false && left ==false ){
                bullet.rotation = 0;
                bullet.reset(link.x, link.y - 15);
                bullet.body.velocity.y = -400;
                bulletTime = game.time.now + 500;
                arrowsOwned -= 1;
            }
                if(up == false && down == true && right == false && left ==false){
                bullet.rotation = -135;
                bullet.reset(link.x, link.y + 15);
                bullet.body.velocity.y = +400;
                bulletTime = game.time.now + 500;
                arrowsOwned -= 1;
            }
                if(up == false && down == false && right == true && left == false){
                bullet.rotation = 1.5;
                bullet.reset(link.x + 15, link.y);
                bullet.body.velocity.x = +400;
                bulletTime = game.time.now + 500;
                arrowsOwned -= 1;
            }
                if(up == false && down == false && right == false && left == true){
                bullet.rotation = -1.5;
                bullet.reset(link.x - 15, link.y);
                bullet.body.velocity.x = -400;
                bulletTime = game.time.now + 500;
                arrowsOwned -= 1;
            }
          }
        }
    }
}

function dropBomb(){
    if (game.time.now > nextBomb){
        nextBomb = game.time.now + bombRate;
        var bombastic = bomb.getFirstExists(false);
    if(bombastic)
        {  if(bombsOwned>=1){
            bombastic.reset(link.x, link.y);
            bombsOwned -= 1;
          }
        }
    }     
}

function gigaFIREBALL(){
    fireButton.alpha = 1;
    if (game.time.now > nextFireBall){
        nextFireBall = game.time.now + fireBallRate;
        var ultraFireBall = fireBall.getFirstExists(false);
    if(ultraFireBall)
        {  
            if(mana >= 50)
                {
                if(up == true && down == false && right == false && left ==false ){
                ultraFireBall.rotation = -135;
                ultraFireBall.reset(link.x, link.y - 15);
                ultraFireBall.body.velocity.y = -750;
                mana -= 50;
                noFireBall.alpha = 1;
                noFireBallTimer.add(5000, function(){NoFireBall()});
                noFireBallTimer.start();
            }
                if(up == false && down == true && right == false && left ==false){
                ultraFireBall.rotation = 0;
                ultraFireBall.reset(link.x, link.y + 15);
                ultraFireBall.body.velocity.y = +750;
                mana -= 50;
                noFireBall.alpha = 1;
                noFireBallTimer.add(5000, function(){NoFireBall()});
                noFireBallTimer.start();
            }
                if(up == false && down == false && right == true && left == false){
                ultraFireBall.rotation = -1.5;
                ultraFireBall.reset(link.x + 15, link.y);
                ultraFireBall.body.velocity.x = +750;
                mana -= 50;
                noFireBall.alpha = 1;
                noFireBallTimer.add(5000, function(){NoFireBall()});
                noFireBallTimer.start();
            }
                if(up == false && down == false && right == false && left == true){
                ultraFireBall.rotation = 1.5;
                ultraFireBall.reset(link.x - 15, link.y);
                ultraFireBall.body.velocity.x = -750;
                mana -= 50;
                noFireBall.alpha = 1;
                noFireBallTimer.add(5000, function(){NoFireBall()});
                noFireBallTimer.start();
            }
          }
        }
    }     
}

function NoFireBall(){
    noFireBall.alpha = 0;
}

//Destroy rock after 3 hits and chance of receiving 1-3 arrows afterwards
function hitRock(arrow, rocks){  
    rocks.Hitpoints -= 1;
        if (rocks.Hitpoints <= 0  )
            {
                rocks.kill();
                if(game.rnd.integerInRange(1, 100) >= 80){
                     bunchOfArrows = game.add.sprite(rocks.x, rocks.y,'BunchofArrows');
                     quiver.add(bunchOfArrows)
                    }
                else{
                bunchOfBombs = game.add.sprite(rocks.x,rocks.y,'bombSash');
                bombSash.add(bunchOfBombs);
            }
            }
    arrow.kill();
   }

function hitRockFireBall(fireBall, rocks){  
    rocks.Hitpoints -= 3;
        if (rocks.Hitpoints <= 0){
              rocks.kill();
            }
   }

function hitBushFireBall(fireBall, bushes){  
    bushes.Hitpoints -= 2;
        if(bushes.Hitpoints <= 0){
            bushes.kill();
        }
   }

//Destroy rock after 3 hits and chance of receiving 1-2 arrows afterwards
function hitBush(arrow, bushes){  
       bushes.Hitpoints -= 1;
        if(bushes.Hitpoints <= 0){
            bushes.kill();
            if(game.rnd.integerInRange(1, 100) >= 20){
               bunchOfArrows = game.add.sprite(bushes.x, bushes.y,'BunchofArrows');
               quiver.add(bunchOfArrows);
              }
            else{
                bunchOfBombs = game.add.sprite(bushes.x,bushes.y,'bombSash');
                bombSash.add(bunchOfBombs);
            }
        }
    arrow.kill();
   }

function arrowPack(link, arrows){
        arrows.kill();
        arrowsOwned = arrowsOwned + game.rnd.integerInRange(2, 5);
}

function bombPack(link, bombs){
        bombs.kill();
        bombsOwned = bombsOwned + game.rnd.integerInRange(2, 4);
}

function hearthPack(link, hearth){
        if (hitpoints == 3)
            {
                hearth.kill();
            }
    else {
           hitpoints += 1;
           hearth.kill();}
}

function manaPack(link, manaPot){
        if (mana >= 100)
            {
                manaPot.kill();
            }
    else {
           mana += 10;
           manaPot.kill();}
}

function randomQuiverF(){
    var randX, randY;
    randX = Math.floor(Math.random()*1216+1);
    randY = Math.floor(Math.random()*800+1);
    
    if((randX >= 64 && randX <= 1120) && (randY >= 96 && randY <= 736))
    {
       bunchOfArrows = game.add.sprite(randX,randY,'BunchofArrows');
       quiver.add(bunchOfArrows);
    }
     randomQuiver = true;
}

function randomSashF(){
    var randX, randY;
    randX = Math.floor(Math.random()*1216+1);
    randY = Math.floor(Math.random()*800+1);
    
    if((randX >= 64 && randX <= 1120) && (randY >= 96 && randY <= 736))
    {
       bunchOfBombs = game.add.sprite(randX,randY,'bombSash');
       bombSash.add(bunchOfBombs);
    }
     randomBomb = true;
}

function randomHearthF(){
    var randX, randY;
    randX = Math.floor(Math.random()*1216+1);
    randY = Math.floor(Math.random()*800+1);
    
    if((randX >= 64 && randX <= 1120) && (randY >= 96 && randY <= 736))
    {
       bunchOfHearths = game.add.sprite(randX,randY,'Hearth');
       hearths.add(bunchOfHearths);
    }
     randomHearth = true;
}

function randomManaPotF(){
    var randX, randY;
    randX = Math.floor(Math.random()*1216+1);
    randY = Math.floor(Math.random()*800+1);
    
    if((randX >= 64 && randX <= 1120) && (randY >= 96 && randY <= 736))
    {
       bunchOfManaPots = game.add.sprite(randX,randY,'ManaPot');
       manaPots.add(bunchOfManaPots);
    }
     randomManaPot = true;
}

function killEnemyArrow(arrow, enemies){  
    enemies.kill();
    enemiesAlive -= 1;
    if(game.rnd.integerInRange(1, 10) >= 3 ){
               bunchOfArrows = game.add.sprite(enemies.x, enemies.y,'BunchofArrows');
               quiver.add(bunchOfArrows);
               arrow.kill();}
    else {
        bunchOfBombs = game.add.sprite(enemies.x, enemies.y,'bombSash');
        bombSash.add(bunchOfBombs);}
}


function killEnemyBomb(bomb, enemies){  
    enemies.kill();
    enemiesAlive -= 1;
    bomb.kill();
}

function killEnemyFireBall (fireBall, enemies)
{   enemies.kill();
    enemiesAlive -= 1;
}

function notInmortal() {
    shield.alpha = 0;
    link.tint = 0xFFFFFF;
    inmortality = false;
}


function createEnemies(){
    waveTimer.alpha = 0;
    ghostSpeed = ghostSpeed * waveNumber;
    for(var i = 1; i <= waveNumber; i++)
        {  enemies.create(game.rnd.integerInRange(0, 64),game.rnd.integerInRange(288, 416),'bigGhost');
           enemies.create(game.rnd.integerInRange(384, 512),game.rnd.integerInRange(0, 32),'bigGhost');
           enemies.create(game.rnd.integerInRange(1152, 1184),game.rnd.integerInRange(288, 416),'bigGhost');
           enemies.create(game.rnd.integerInRange(512, 640),game.rnd.integerInRange(736, 768),'bigGhost');
           enemiesAlive += 4;
         }
    enemies.callAll('animations.add', 'animations', 'flap', [0,1,2,3,4,5], 16, true);
    enemies.callAll('play', null, 'flap');
    
            waveON = true;
}

//Player gets hit and Death.
function hitPlayer(){ 
    if (inmortality === false){
        inmortality = true;
        shield.alpha = 1;
        hitpoints -= 1;
    }
    else if (inmortality === true){
           var timer;
           timer = Phaser.Timer.SECOND * 2;
           game.time.events.add(timer, notInmortal,this);
           var tween = game.add.tween(link).to({tint: 0xff0000}, 150, "Linear", true);
           tween.repeat (10,0);
        }
    if (hitpoints <= 0){
        link.kill();
        music.pause();
        arrowsOwned = 5;
        waveNumber = 1;
        enemiesAlive = 0;
        changeState(null, 8);
        game.scale.setGameSize(1216, 800);
        }
    }

/*Health GUI and Mana for player works with an INT variable */
function playerHealth(){
    if (hitpoints === 3){
            life.frame = 0;
            }
        else if (hitpoints === 2){
            life.frame = 1;
            }
        else if (hitpoints === 1){
            life.frame = 2;
            }
        else  if (hitpoints === 0){
            life.frame = 3;
            }
}

function playerMana(){
    manaRegen = true;
    if (mana >= 100)
        {
            
        }
    else {
        mana += 1;
    }
    
    if (mana === 0){
            manaBar.frame = 0;
            }
        else if (mana === 1){
            manaBar.frame = 1;
            }
        else if (mana === 2){
            manaBar.frame = 2;
            }
        else if (mana === 3){
            manaBar.frame = 3;
            }
        else if (mana === 4){
            manaBar.frame = 4;
            }
        else if (mana === 5){
            manaBar.frame = 5;
            }
        else if (mana === 6){
            manaBar.frame = 6;
            }
        else if (mana === 7){
            manaBar.frame = 7;
            }
        else if (mana === 8){
            manaBar.frame = 8;
            }
        else if (mana === 9){
            manaBar.frame = 9;
            }
        else if (mana === 10){
            manaBar.frame = 10;
            }
        else if (mana === 11){
            manaBar.frame = 11;
            }
        else if (mana === 12){
            manaBar.frame = 12;
            }
        else if (mana === 13){
            manaBar.frame = 13;
            }
        else if (mana === 14){
            manaBar.frame = 14;
            }
        else if (mana === 15){
            manaBar.frame = 15;
            }
        else if (mana === 16){
            manaBar.frame = 16;
            }
        else if (mana === 17){
            manaBar.frame = 17;
            }
        else if (mana === 18){
            manaBar.frame = 18;
            }
        else if (mana === 19){
            manaBar.frame = 19;
            }
        else if (mana === 20){
            manaBar.frame = 20;
            }
        else if (mana === 21){
            manaBar.frame = 21;
            }
        else if (mana === 22){
            manaBar.frame = 22;
            }
        else if (mana === 23){
            manaBar.frame = 23;
            }
        else if (mana === 24){
            manaBar.frame = 24;
            }
        else if (mana === 25){
            manaBar.frame = 25;
            }
        else if (mana === 26){
            manaBar.frame = 26;
            }
        else if (mana === 27){
            manaBar.frame = 27;
            }
        else if (mana === 28){
            manaBar.frame = 28;
            }
        else if (mana === 29){
            manaBar.frame = 29;
            }
        else if (mana === 30){
            manaBar.frame = 30;
            }
        else if (mana === 31){
            manaBar.frame = 31;
            }
        else if (mana === 32){
            manaBar.frame = 32;
            }
        else if (mana === 33){
            manaBar.frame = 33;
            }
        else if (mana === 34){
            manaBar.frame = 34;
            }
        else if (mana === 35){
            manaBar.frame = 35;
            }
        else if (mana === 36){
            manaBar.frame = 36;
            }
        else if (mana === 37){
            manaBar.frame = 37;
            }
        else if (mana === 38){
            manaBar.frame = 38;
            }
        else if (mana === 39){
            manaBar.frame = 39;
            }
        else if (mana === 40){
            manaBar.frame = 40;
            }
        else if (mana === 41){
            manaBar.frame = 41;
            }
        else if (mana === 42){
            manaBar.frame = 42;
            }
        else if (mana === 43){
            manaBar.frame = 43;
            }
        else if (mana === 44){
            manaBar.frame = 44;
            }
        else if (mana === 45){
            manaBar.frame = 45;
            }
        else if (mana === 46){
            manaBar.frame = 46;
            }
        else if (mana === 47){
            manaBar.frame = 47;
            }
        else if (mana === 48){
            manaBar.frame = 48;
            }
        else if (mana === 49){
            manaBar.frame = 49;
            }
        else if (mana === 50){
            manaBar.frame = 50;
            }
        else if (mana === 51){
            manaBar.frame = 51;
            }
        else if (mana === 52){
            manaBar.frame = 52;
            }
        else if (mana === 53){
            manaBar.frame = 53;
            }
        else if (mana === 54){
            manaBar.frame = 54;
            }
        else if (mana === 55){
            manaBar.frame = 55;
            }
        else if (mana === 56){
            manaBar.frame = 56;
            }
        else if (mana === 57){
            manaBar.frame = 57;
            }
        else if (mana === 58){
            manaBar.frame = 58;
            }
        else if (mana === 59){
            manaBar.frame = 59;
            }
        else if (mana === 60){
            manaBar.frame = 60;
            }
        else if (mana === 61){
            manaBar.frame = 61;
            }
        else if (mana === 62){
            manaBar.frame = 62;
            }
        else if (mana === 63){
            manaBar.frame = 63;
            }
        else if (mana === 64){
            manaBar.frame = 64;
            }
        else if (mana === 65){
            manaBar.frame = 65;
            }
        else if (mana === 66){
            manaBar.frame = 66;
            }
        else if (mana === 67){
            manaBar.frame = 67;
            }
        else if (mana === 68){
            manaBar.frame = 68;
            }
        else if (mana === 69){
            manaBar.frame = 69;
            }
        else if (mana === 70){
            manaBar.frame = 70;
            }
        else if (mana === 71){
            manaBar.frame = 71;
            }
        else if (mana === 72){
            manaBar.frame = 72;
            }
        else if (mana === 73){
            manaBar.frame = 73;
            }
        else if (mana === 74){
            manaBar.frame = 74;
            }
        else if (mana === 75){
            manaBar.frame = 75;
            }
        else if (mana === 76){
            manaBar.frame = 76;
            }
        else if (mana === 77){
            manaBar.frame = 77;
            }
        else if (mana === 78){
            manaBar.frame = 78;
            }
        else if (mana === 79){
            manaBar.frame = 79;
            }
        else if (mana === 80){
            manaBar.frame = 80;
            }
        else if (mana === 81){
            manaBar.frame = 81;
            }
        else if (mana === 82){
            manaBar.frame = 82;
            }
        else if (mana === 83){
            manaBar.frame = 83;
            }
        else if (mana === 84){
            manaBar.frame = 84;
            }
        else if (mana === 85){
            manaBar.frame = 85;
            }
        else if (mana === 86){
            manaBar.frame = 86;
            }
        else if (mana === 87){
            manaBar.frame = 87;
            }
        else if (mana === 88){
            manaBar.frame = 88;
            }
        else if (mana === 89){
            manaBar.frame = 89;
            }
        else if (mana === 90){
            manaBar.frame = 90;
            }
        else if (mana === 91){
            manaBar.frame = 91;
            }
        else if (mana === 92){
            manaBar.frame = 92;
            }
        else if (mana === 93){
            manaBar.frame = 93;
            }
        else if (mana === 94){
            manaBar.frame = 94;
            }
        else if (mana === 95){
            manaBar.frame = 95;
            }
        else if (mana === 96){
            manaBar.frame = 96;
            }
        else if (mana === 97){
            manaBar.frame = 97;
            }
        else if (mana === 98){
            manaBar.frame = 98;
            }
        else if (mana === 99){
            manaBar.frame = 99;
            }
        else if (mana >= 100){
            manaBar.frame = 100;
            }
}