
function player(x,y,r,speed) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
}


var width = window.innerWidth - 25;
var height = window.innerHeight - 25;

var ukko = new player(width / 2,height / 2,20,5); 

function drawPlayer(context) {
  var x = ukko.x;
  var y = ukko.y;
  context.beginPath();
  context.fillStyle = '#000000';
  context.arc(x,y,ukko.r,0,2*Math.PI);
  context.fill();
  context.closePath();
}

function movePlayer(dir) {
    var oldX = ukko.x;
    var oldY = ukko.y;
  switch (dir) {
    
    case "right":
      ukko.x += ukko.speed;
      if (ukko.x > width - ukko.r) {
        ukko.x = width - ukko.r;
      }
      break;
    case "left": 
      ukko.x -= ukko.speed;
      if (ukko.x < ukko.r) {
        ukko.x = ukko.r;
      }
      break;
    case "up":
      ukko.y -= ukko.speed;
      if (ukko.y < ukko.r) {
        ukko.y = ukko.r;
      }
      break;
    case "down":
      ukko.y += ukko.speed;
      if (ukko.y > height - ukko.r) {
        ukko.y = height - ukko.r;
      }
      break;
  }
    for(k = 0; k < enemies.length; k++){
        var distance = Math.sqrt(Math.pow((ukko.x - enemies[k].x),2) + Math.pow((ukko.y - enemies[k].y),2));
        if(distance < ukko.r + enemies[k].r){
            ukko.x = oldX;
            ukko.y = oldY;
        }
    }
  }


function changeSpeed(yas) {
    if (ukko.speed >= 5 || yas >= 0) {
    ukko.speed += yas;
    } 
}

function reset() {
    ukko.x = width / 2;
    ukko.y = height / 2;
    ukko.speed = 5;
}

