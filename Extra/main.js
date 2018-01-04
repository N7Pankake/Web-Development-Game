/*var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var background;
var backgroundController;

var player;

var cursors;

var mainState = {
    preLoad:function(){
    
        game.load.image('background' , "assets/Background.png");
        game.load.image('player' , "assets/Link.png");
},
     create:function(){
         background = game.add.tileSprite(0,0,800,600, 'Background');
         backgroundController = 5;
         
         player = game.add.sprite(game.world.centerX,game.world.centerY + 200, 'player');
         game.physics.enable(player,Phaser.Physics.ARCADE);
    
         cursors = game.input.keyboard.createCursorKeys();
     },
     update:function(){
         
         player.body.velocity.x = 0;
         
         background.titlePosition.y += backgroundController;
         
         if(cursors.left.isDown){
             player.body.velocity.x = -350;
         }
         
         if(cursors.right.isDown){
             player.body.velocity.x = 350;
         }
         
         if(cursors.up.isDown){
             player.body.velocity.y = -350;
         }
         
         if(cursors.down.isDown){
             player.body.velocity.y = 350;
         }
}

}

game.state.add('mainState', mainState);
game.state.start('mainState');*/