var gameOver = function(game){
        var soundToggle;
}
 
gameOver.prototype = {
    create: function(){

        var background = game.add.sprite(0, 0, 'forest');
        background.height=game.height;
        background.width=game.width;
        
        menuMusic.mute = false;
                    
        //Adding the mute-button
        this.soundToggle = this.game.add.button(this.game.world.width - 70, 15, 'soundsprite', this.toggleSound, this);
        this.soundToggle.width = 50;
        this.soundToggle.height = 50;
    
        //Changing the correct frame of the mute-buttons spritesheet.
        if (this.game.sound.mute) {
            this.soundToggle.frame = 1;
        } else {
            this.soundToggle.frame = 0;
        }
        
        var style = {
            font: '34px Rajdhani',
            fill: '#000',
            align: 'center'
        };
        
        if (win) {
            var winsound = game.add.audio('winmusic');
            winsound.play()
            var endText = game.add.text(100, 220, "You won the game!\nNow Finland will stay warm,\njust like it should.", style);
        }
        else {
            var endText = game.add.text(120, 220, "You scored: " + score, style);
            var endTextPic = this.game.add.sprite(100,80,'gameover');
        }
        
        
        //Adding the play and help -buttons and their features.
		var playButton = this.game.add.button(game.width/2 + 200,320,"playAgainButton",this.playTheGame,this);
        playButton.width = 180;
        playButton.height = 300;
		playButton.anchor.setTo(0.5,0.5);
        
        playButton.onInputOver.add(over, this);
        playButton.onInputOut.add(out, this);
        
        function over() {
            playButton.y = playButton.y - 20;
        }
        function out() {
            playButton.y = 320;
        }
        
        var helpButton = this.game.add.button(320,520,"helpbutton",this.goToHelp,this);
        helpButton.width = 170;
        helpButton.height = 70;
	},
    
    toggleSound: function() {		
      if (this.game.sound.mute) {
          this.game.sound.mute = false;
          this.soundToggle.frame = 0;
      } else {
          this.game.sound.mute = true;
          this.soundToggle.frame = 1;
      }
    },
    
	playTheGame: function(){
        menuMusic.mute = true;
		this.game.state.start("TheGame");
	},
    
    goToHelp: function() {
        this.game.state.start("Help");
    }
}