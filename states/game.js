var score;
var scoreText;
var soundToggle;
var timer;

var health;
var hlth;
var win;

var theGame = function() {
   

    var player;
    var coals;
    var blobs;
    var diamonds;

    var music;
    var coalSound;
    var loseSound;
    var diamondSound;
    var slap;

};

theGame.prototype = {


create: function() {
    var style = {
        font: '34px Rajdhani',
        fill: '#000',
        align: 'center'
    };

    played = true;
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    score = 0;
    health = 200;
    
    //Prevent scrolling while playing
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
                                       Phaser.Keyboard.DOWN,
                                       Phaser.Keyboard.LEFT,
                                       Phaser.Keyboard.RIGHT
                                      ]);
    
    
    //Calls the method moveDiamond every 5 seconds to create new diamonds.
    this.timer=this.game.time.events.loop(5000,this.moveDiamond,this);
    
    
    //Creates a piece of coal to a random location.
    function createCoals() {
        var coal = coals.create((game.width-40)*Math.random(),((game.height-120)*Math.random())+60, 'coal');
        coal.width = 40;
        coal.height = 40;
    } 
    
    //Creates peat to a random location and with a random velocity.
    function createBlobs(y) {
        var blob = blobs.create((game.width-25) * Math.random() + 25, y * Math.random(), 'peat');
        blob.width = 50;
        blob.height = 50;
        blob.checkWorldBounds = true;
        blob.body.velocity.x = 50 + Math.random() * 50;
        blob.body.velocity.y = 50 + Math.random() * 50;
        game.physics.enable(blob, Phaser.Physics.ARCADE);
        blob.body.collideWorldBounds = true;
        blob.body.bounce.setTo(1, 1);  
    }
    
    
    var background = game.add.sprite(0, 0, 'forest');
    background.height=game.height;
    background.width=game.width;  
    
    scoreText = game.add.text(350, 16, 'SCORE: 0', style);
    
    game.physics.setBoundsToWorld();

    music = game.add.audio('backgroundmusic');
    coalSound = game.add.audio('coal');
    loseSound = game.add.audio('sad');
    diamondSound = game.add.audio('diamondSound');
    slap = game.add.audio('slap');
    music.loopFull();
    
    hlth = game.add.sprite(20, 20, 'healthbar');
    hlth.frame = 0;


    player = game.add.sprite(game.width/2, game.height/2, 'playersprite');
    player.frame = 1;
    player.anchor.setTo(0.5, 0.5);
    player.width = 45;
    player.height = 60;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    
    
    
    //Adding groups for the different objects in the game.
    coals = game.add.group();
    coals.enableBody = true;
    coals.physicsBodyType = Phaser.Physics.ARCADE;

    blobs = game.add.group();
    blobs.enableBody = true;
    blobs.physicsBodyType = Phaser.Physics.ARCADE;
    
    diamonds = game.add.group();
    diamonds.enableBody = true;
    diamonds.physicsBodyType = Phaser.Physics.ARCADE;
    
    
    
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
    

    //Creating 4 pieces of coal and peat
    for (var y = 0; y < 4; y++)
    {
        createCoals();
        createBlobs(y);
    }
      

},

//A function to mute and unmute the sounds of the game.   
toggleSound: function() {		
      if (this.game.sound.mute) {
          this.game.sound.mute = false;
          this.soundToggle.frame = 0;
      } else {
          this.game.sound.mute = true;
          this.soundToggle.frame = 1;
      }
 },
   
//Creates a new diamond to a random location and deletes it after 2 seconds.  
moveDiamond: function() {
    var diamond = diamonds.create(20+(game.width-40)*Math.random(),((game.height-110)*Math.random())+60, 'diamond');
    
        diamond.width = 40;
        diamond.height = 40;
        diamond.checkWorldBounds = true
        setTimeout(function(){ 
            diamonds.removeAll(); 
        }, 2000)
},
    
    
update: function() {

    //Making the peat gradually faster
    blobs.forEach(function(item) {
        item.body.velocity.x = 1.0006*item.body.velocity.x;
        item.body.velocity.y = 1.0006*item.body.velocity.y;
    });
    
    //Creates a new piece of coal to a random location
    function newCoal() {
        var coal = coals.create((game.width-40)*Math.random(), 60 + Math.random() * (game.height - 120), 'coal');
        coal.width = 40;
        coal.height = 40;
        coal.checkWorldBounds = true;
    }
    
    /* When colliding with a diamond, this method deletes it,
        adds to the score, and ends the game if the score is enough. */
    function diamondCollision(player, diamond) {
        diamonds.remove(diamond);
        diamondSound.play();
        score += 5;
        scoreText.text = 'SCORE: ' + score;
        if (score >= 50) {
            music.mute = true;
            win = true;
            this.game.state.start("GameOver");
        }
    }
    
    /*When colliding with a piece of coal, this method deletes it and calls
        newCoal to create a new coal, adds to the score and ends the game if the score is enough.*/
    function coalCollision(player, coal) {
        coals.remove(coal);
        newCoal();  
        coalSound.play();
        score += 1;
        scoreText.text = 'SCORE: ' + score;
        if (score >= 50) {
            music.mute = true;
            win = true;
            this.game.state.start("GameOver");
        }
    }

    /*When colliding with peat, this method reduces the health of the player, displays the correct frame of the healthbar's spritesheet and         ends the game, if the player's health has reached zero.*/
    function blobCollision() {
        health -= 2;
        if (health != 0) {
            slap.play();
        }
        if (health == 0) {
            win = false;
            this.game.state.start("GameOver");
            loseSound.play();
            music.mute = true;
        } else if (health >= 160) {
            hlth.frame = 1;
        } else if (health >= 120) {
            hlth.frame = 2; 
        } else if (health >= 80) {
            hlth.frame = 3; 
        } else if (health >= 40) {
            hlth.frame = 4; 
        }    
    }
       
    //Check collisions with other objects in the game, and call the according methods
    game.physics.arcade.overlap(player, coals, coalCollision, null, this);
    game.physics.arcade.overlap(player, blobs, blobCollision, null, this);
    game.physics.arcade.overlap(player, diamonds, diamondCollision, null, this);
    
    
    //Moving the player and displaying the correct frames of the players spritesheet
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        player.x -= 4;
        player.frame = 9;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        player.x += 4;
        player.frame = 4;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        player.y -= 4;
        player.frame = 12;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        player.y += 4;
        player.frame = 2;
    }
    

},


};

