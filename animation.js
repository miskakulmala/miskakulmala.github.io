


$(document).ready(function() {
  var width = window.innerWidth - 25;
  var height = window.innerHeight - 25;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();


  var keysDown = {};
  
    
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
    
  window.addEventListener("keydown", function(e) {
     keysDown[e.keyCode] = true;
  }, false);
  
  window.addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
  });

  window.addEventListener("keydown",function(e){
      if([37,38,39,40].indexOf(e.keyCode)>-1){
          e.preventDefault();
      };
  });
  canvas.addEventListener("mousedown", function(e){
     removeEnemy(getMousePos(canvas,e).x, getMousePos(canvas,e).y);
     console.log("MOUSEX" + e.pageX)
      console.log("MOUSEy" + e.pageY)
  })
  
  

var render = function() {
  ctx.fillStyle = 'lightgray';
  ctx.fillRect(0,0,width,height);
  drawEnemies(ctx);
  drawPlayer(ctx);
};


var update = function(muutos) {
    if (38 in keysDown) {
       movePlayer("up");
    } 
    if (40 in keysDown) {
       movePlayer("down");
    }
    if (37 in keysDown) {
      movePlayer("left");
    }
    if (39 in keysDown) {
      movePlayer("right");
    }
    moveEnemies()
};

var main = function() {
  var now = Date.now();
  var muutos = now - then;

  update(muutos / 1000);
  render();
  then = now;
  requestAnimationFrame(main);
};
  
var then = Date.now();
main();
  
});