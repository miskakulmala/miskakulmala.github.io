window.onload = function () {
    'use strict';
    $.getJSON("https://kulmalm5.firebaseio.com/.json", function (data) {
    console.log(data);
});
};
    