var played = false;

var preload = function(game){
    var menuMusic;
}
 
preload.prototype = {
	preload: function(){
        //Images
        this.game.load.image('forest','assets/background.jpg');
		this.game.load.image('coal', 'assets/smallcoal.gif');
        this.game.load.image('peat','assets/peat.png');
        this.game.load.image('diamond', 'assets/diamond.png');
        this.game.load.image('keys','assets/keys.png');
         
        //Text-images
        this.game.load.image('coallogo','assets/coallogo.png');
        this.game.load.image('gameover','assets/gameover.png');
        
        //Button images
        this.game.load.image('playButton','assets/playbutton.png')
        this.game.load.image('playAgainButton','assets/playagainbutton.png')
        this.game.load.image('helpbutton','assets/helpbutton.png');
        this.game.load.image('backbutton','assets/backbutton.png');
        
        //Spritesheets
        this.game.load.spritesheet('soundsprite','assets/soundpic.png',2000,2000)
        this.game.load.spritesheet('playersprite','assets/SpriteSheet.png',460,600);
        this.game.load.spritesheet('healthbar', 'assets/healthbar.png',204,30);
        
        //Music and sound effects
        this.game.load.audio('backgroundmusic', 'assets/pelimusa.mp3');
        this.game.load.audio('coal','assets/voittosound.mp3');
        this.game.load.audio('sad', 'assets/sadmusic.mp3');
        this.game.load.audio('slap', 'assets/slap_cutted.mp3');
        this.game.load.audio('diamondSound', 'assets/diamond.mp3');
        this.game.load.audio('menumusic','assets/valikkomusa.ogg');
        this.game.load.audio('winmusic', 'assets/applause.mp3');
        
        //Font
        this.game.load.script('font.rajdhani','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        
	},
  	create: function(){
		this.game.state.start("GameTitle");

        menuMusic = game.add.audio('menumusic');
        menuMusic.loopFull();
	}
}