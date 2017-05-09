var menu = function(game){
    var coals;
    var soundToggle;
}
 
menu.prototype = {
    
  	create: function(){
        
        var background = game.add.sprite(0, 0, 'forest');
        background.height=game.height;
        background.width=game.width;
        
        var logo = game.add.sprite(200,50,'coallogo');
        logo.width = 400;
        logo.height = 150;
        
        
            
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
        
        
        
        //Creating the randomly floating coals of the menu
        coals = game.add.physicsGroup();
        var y = 200;
        for (var i = 0; i < 9; i++)
        {
        var coal = coals.create(game.world.randomX, y, 'coal');
        coal.width = 40;
        coal.height = 40;
        coal.body.velocity.x = game.rnd.between(100, 300);
        y += 40;
        }
        
        
        //Creating the "play" and "help" -buttons and their features.
		var playButton = this.game.add.button(game.width/2,360,"playButton",this.playTheGame,this);
        playButton.width = 180;
        playButton.height = 260;
		playButton.anchor.setTo(0.5,0.5);
        
        playButton.onInputOver.add(over, this);
        playButton.onInputOut.add(out, this);
        
        function over() {
            playButton.y = playButton.y - 20;
        }
        function out() {
            playButton.y = 360;
        }
        
        var helpButton = this.game.add.button(320,520,"helpbutton",this.goToHelp,this);
        helpButton.width = 170;
        helpButton.height = 70;
	},
    
    
    //Function to mute and unmute
    toggleSound: function() {		
      if (this.game.sound.mute) {
          this.game.sound.mute = false;
          this.soundToggle.frame = 0;
      } else {
          this.game.sound.mute = true;
          this.soundToggle.frame = 1;
      }
    },
    
    update: function() {
        
        //Makes the randomly floating coals go through the screen again.
        function checkPos (coal) {
            if (coal.x > 800)
            {
                coal.x = -100;
            }
        }
        coals.forEach(checkPos,this);
    },
    
	playTheGame: function(){
        menuMusic.mute = true;
		this.game.state.start("TheGame");
	},
    
    goToHelp: function() {
        //music.mute = true;
        this.game.state.start("Help");
    }
    
}