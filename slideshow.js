var muuttuja = 1;

$.getJSON("https://kulmalm5.firebaseio.com/.json", function (data) {
    console.log(data)
});

/* function display() {
    'use strict';
    $.getJSON("https://kulmalm5.firebaseio.com/.json", function (data) {
        $('#otsikko').html(data.uutiset[muuttuja].otsikko);
        $('#paivamaara').html(data.uutiset[muuttuja].paivamaara);
        $('#sisalto').html(data.uutiset[muuttuja].sisalto);
    });
}

function switchA() {
    'use strict';
    setInterval(function () {
        nextSlide();
    }, 3000);
}
    */