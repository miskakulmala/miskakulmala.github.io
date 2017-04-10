function enemy(x,y,r,speed,dir) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.speed = speed;
 this.dir = dir;
}

function direction(ang){
    this.ang = ang;
    this.x = Math.cos(ang);
    this.y = Math.sin(ang);
}

var width = window.innerWidth - 25;
var height = window.innerHeight - 25;
var eSize = 20;
var eSpeed = 1;
    

var dirs = ["N","NE","E","SE","S","SW","W","NW"]
var enemies = []; 

function drawEnemies(context) {
 console.log(enemies.length)
  for(i = 0; i < enemies.length; i++){
  var vihu = enemies[i];
  
  context.beginPath();
  context.fillStyle = 'green';
  context.arc(vihu.x,vihu.y,vihu.r,0,2*Math.PI);
  context.fill();
  context.closePath();  
  }

}



function moveEnemies() {
     for(i = 0; i < enemies.length; i++){
         var vihu = enemies[i];
         var oldX = vihu.x;
         var oldY = vihu.y;
         vihu.x = vihu.x + (vihu.dir.x * vihu.speed);
         vihu.y = vihu.y + (vihu.dir.y * vihu.speed);
         
         if(vihu.x < vihu.r){
             vihu.x = vihu.r;
             vihu.dir = new direction(Math.PI - (vihu.dir.ang % (2 * Math.PI)) );
         }
         if(vihu.x > width - vihu.r){
             vihu.x = width - vihu.r;
             vihu.dir = new direction(Math.PI - (vihu.dir.ang % (2 * Math.PI)) );
             
         }
         if(vihu.y < vihu.r){
             vihu.y = vihu.r;
             vihu.dir = new direction(-vihu.dir.ang);
         }
         if(vihu.y > height - vihu.r){
             vihu.y = height - vihu.r;
             vihu.dir = new direction(-vihu.dir.ang);
         }
         
         for(k = 0; k < enemies.length; k++){
            var distance = Math.sqrt(Math.pow((vihu.x-enemies[k].x),2) + Math.pow((vihu.y - enemies[k].y),2));
             if (!(vihu.x == enemies[k].x && vihu.y == enemies[k].y)){
                 
                  if(distance < 2 * vihu.r){
                 vihu.x = oldX;
                 vihu.y = oldY;
                 var angle = 0;
                 var en = enemies[k];
                      
                 if(vihu.x >= en.x && vihu.y <= en.y){
                     angle = Math.atan((vihu.y - en.y)/(vihu.x - en.x));      
                 } else if(vihu.x <= en.x && vihu.y <= en.y){
                     angle = Math.atan((vihu.y - en.y)/(vihu.x - en.x)) + Math.PI;
                 } else if(vihu.x >= en.x && vihu.y >= en.y){
                     angle = Math.atan((vihu.y - en.y)/(vihu.x - en.x));
                 } else if(vihu.x <= en.x && vihu.y >= en.y){
                     angle = Math.atan((vihu.y - en.y)/(vihu.x - en.x)) + Math.PI;
                 }
             
             vihu.dir = new direction(angle);
             en.dir = new direction(angle + Math.PI)
                      
                      
             }
           }
         }
         
         if(Math.sqrt(Math.pow((vihu.x-ukko.x),2) + Math.pow((vihu.y-ukko.y),2)) < ukko.r + vihu.r){
             vihu.x = oldX;
             vihu.y = oldY;
             var angle = 0;
             
                 if(vihu.x >= ukko.x && vihu.y <= ukko.y){
                     angle = Math.atan((vihu.y - ukko.y)/(vihu.x - ukko.x));      
                 } else if(vihu.x <= ukko.x && vihu.y <= ukko.y){
                     angle = Math.atan((vihu.y - ukko.y)/(vihu.x - ukko.x)) + Math.PI;
                 } else if(vihu.x >= ukko.x && vihu.y >= ukko.y){
                     angle = Math.atan((vihu.y - ukko.y)/(vihu.x - ukko.x));
                 } else if(vihu.x <= ukko.x && vihu.y >= ukko.y){
                     angle = Math.atan((vihu.y - ukko.y)/(vihu.x - ukko.x)) + Math.PI;
                 }
             
             vihu.dir = new direction(angle)
         }
         
     }
}

function getRandomInteger( min, max ){
    var difference = max - min;
    
    var number = parseInt(Math.round(Math.random() * difference + min));
    return number;
}

var canAdd = true;


function addEnemy() {
    
    if(canAdd){
    var newX = 0;
    var newY = 0;
    var counter = 0;
    
    var flag = false;
    while(flag === false && counter < 1000){
        newX = getRandomInteger(eSize, width - eSize);
        newY = getRandomInteger(eSize, height - eSize);
      
        flag = true;
        for(k = 0; k < enemies.length; k++){
            var distance = Math.sqrt(Math.pow((newX - enemies[k].x),2) + Math.pow((newY - enemies[k].y),2));
                if(distance < 2 * eSize){
                    flag = false;
                }  
        }
        var distance = Math.sqrt(Math.pow((newX - ukko.x),2) + Math.pow((newY - ukko.y),2));
        if(distance < eSize + ukko.r){
            flag = false;
        }
        counter = counter + 1;
        
        if(counter >= 1000) canAdd = false;
        
    }
    if(counter < 1000){   
     var dir = (parseFloat(getRandomInteger(0,360)) / 360) * 2* Math.PI;
     enemies.push(new enemy(newX, newY, eSize, eSpeed, new direction(dir)));
    }
}
}

function removeEnemy(clickX, clickY) {
     for(k = 0; k < enemies.length; k++){
        var distance = Math.sqrt(Math.pow((clickX - enemies[k].x),2) + Math.pow((clickY - enemies[k].y),2));
            if(distance < eSize){
                enemies.splice(k,1);
                canAdd = true;
                }  
     }
}
