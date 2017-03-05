var muuttuja = 0; 

 function display() {
    'use strict';
    $.getJSON("https://kulmalm5.firebaseio.com/uutiset.json", function (data) {
        $('#otsikko').html(data[muuttuja].otsikko); 
        $('#päivämäärä').html(data[muuttuja].päivämäärä);
        $('#sisältö').html(data[muuttuja].sisältö);
    });
};

function nextSlide() {
    'use strict';
    if (muuttuja < 2) {
        muuttuja += 1;
    } else {
        muuttuja = 0;
    }
    display();
};

function switch() {
    'use strict';
    setInterval(function () {
        nextSlide();
    }, 3500);
};

window.onload = function () { 
    'use strict';
     display();
     nextSlide();
     switch();
};

