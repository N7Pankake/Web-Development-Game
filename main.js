var game = new Phaser.Game(1216, 800, Phaser.AUTO);
game.state.add('scene0', scenes.scene0);
game.state.add('scene1', scenes.scene1);
game.state.add('scene2', scenes.scene2);
game.state.add('scene3', scenes.scene3);
game.state.add('scene4', scenes.scene4);
game.state.add('scene5', scenes.scene5);
game.state.add('scene6', scenes.scene6);
game.state.start('scene0')