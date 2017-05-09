var help = function(game){}
 
help.prototype = {
    
  	create: function(){
        
        var helpText;
        var style = {
            font: '22px Rajdhani',
            fill: '#000',
            align: 'left'
        };
        
        var background = game.add.sprite(0, 0, 'forest');
        background.height=game.height;
        background.width=game.width;
        
        var logo = game.add.sprite(250,50,'coallogo');
        logo.width = 300;
        logo.height = 120;
        
        var text = 'Save Finland from the cold winter!\n\nTry to collect 50 points by collecting coal and diamonds.\nDiamonds are harder to catch,\n but will give you more points.\n\nBeware of the peat, they will reduce your energy.\nBe quick, the peat becomes faster and faster!\n Controls:';
        
        helpText = game.add.text(120,180,text,style);
        
        
        
        var pic1 = game.add.sprite(620,250, 'coal');
            pic1.width = 80;
            pic1.height = 80;
        var pic2 = game.add.sprite(710,245,'diamond');
            pic2.width = 90;
            pic2.height = 90;
        var pic3 = game.add.sprite(660,350,'peat');
            pic3.width = 100;
            pic3.height = 100;
        var pic4 = game.add.sprite(120,450,'keys');
            pic4.width = 160;
            pic4.height = 120;
        
        
        var backButton = this.game.add.button(320,520,"backbutton",this.goToMenu,this);
        backButton.width = 170;
        backButton.height = 70;
        
        
	},
	goToMenu: function(){
        if (played) {
		this.game.state.start("GameOver");
        } else {
            this.game.state.start("GameTitle");
        }
	},
    
}