//Highscore
var ref, fbObj, hsText = [];

scenes.scene4 = function(){};
scenes.scene4.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#0E5135';
        
        var highscores = game.add.sprite(208,0, 'Highscores');
        highscores.scale.setTo(0.75,0.75);
        
        ref = new firebase.database().ref('/');;
        
        
        for(var i = 1; i < 11; i++){
                game.add.text(300,120+(i *60), i+'. ',{fontSize: '40px'}).anchor.setTo(1,0);
            }
        
        for (var i = 0; i < 10; i++){
            hsText[i] = game.add.text(300,120+((i+1)*90), hs[i],{fontSize: '40px'});
        }
        
        var updateHSText = this.updateHSText;
        ref.on('value', function(snapshot){
            fbObj = (snapshot.val().hs);
            updateHSText(fbObj);
        });
    },
    
    updateHSText: function (hs){
        for(var i = 1; i < 10; i++){
                hsText[i].text = hs[i];
            }
    }
};