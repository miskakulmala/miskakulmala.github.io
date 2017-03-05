var muuttuja = 1; 
var pause = false;

window.onload = function () { 
     display();
     next();
     switchSlide;
     saveContent();
};

function saveContent() {
    if ((localStorage.getItem('index')) === null || (localStorage.getItem('index')) < 2) {
        localStorage.setItem('index', 0);
        muuttuja = 0;
    } else {
        muuttuja = parseInt(localStorage.getItem('index'));
    }
}

 function display() {
    'use strict';
    $.getJSON("https://kulmalm5.firebaseio.com/uutiset.json", function (data) {
        $('#otsikko').html(data[muuttuja].otsikko); 
        $('#päivämäärä').html(data[muuttuja].päivämäärä);
        $('#sisältö').html(data[muuttuja].sisältö);
    });
};

function next() {
    'use strict';
    if (muuttuja < 2) {
        muuttuja += 1;
    } else {
        muuttuja = 0;
    }
    display();
};

function previous() {
    'use strict';
    if (muuttuja === 0) {
        muuttuja = 2;
    } else {
        muuttuja -= 1;
    }
    display();
};

function change(button_id) {
    'use strict';
     if (document.getElementById(button_id).textContent == "Pysäytä") {
        document.getElementById(button_id).textContent = "Jatka";
        } else {
        document.getElementById(button_id).textContent = "Pysäytä";
    }
}

var switchSlide= window.setInterval(function (){
    next();
}, 3000);


function stop() {
    'use strict';
    if (!pause) {
       window.clearInterval(switchSlide);
       pause = true;
    } else {
        switchSlide = setInterval(function() {
            next();
        }, 3000);
        pause = false;
    }
};





