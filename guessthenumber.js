function getRandomInteger(min, max) {
    'use strict';
    return Math.floor((Math.random() * max) + min);
}

var randomNumber = getRandomInteger(0, 10);
var x = document.getElementById("button");

function compareNumbers(first, second) {
    'use strict';
    if (first === second) {
        return (true);
    } else {
        return (false);
    }
}

function guessTheNumber() {
    'use strict';
    var y = document.getElementById("number").value;
    if (y <= 10 && y > 0 && Number.isInteger(randomNumber)) {
        if (compareNumbers(randomNumber, y)) {
            window.alert("You guessed right!");
        } else {
            window.alert("You guessed wrong!");
        }
    } else {
        window.alert("Invalid input");
    }
  randomNumber = getRandomInteger(0, 10);  
}