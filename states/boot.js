var boot = function(game){};
  
boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/loading.gif"); 
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.game.state.start("Preload");
	}
}