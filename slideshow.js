var muuttuja = 1;

window.onload = function () {
    'use strict';
    $.getJSON("https://kulmalm5.firebaseio.com/.json", function (data) {
    console.log(data);
});
};

function display() {
    'use strict';
    $.getJSON("https://kulmalm5.firebaseio.com/.json", function (data) {
        $('#otsikko').html(data.uutiset[index].otsikko);
        $('#paivamaara').html(data.uutiset[index].paivamaara);
        $('#sisalto').html(data.uutiset[index].sisalto);
    });
}

function switchA() {
    'use strict';
    setInterval(function () {
        nextSlide();
    }, 3000);
}
    