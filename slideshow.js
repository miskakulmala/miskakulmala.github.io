window.onload = function () {
    $.getJSON("https://kulmalm5.firebaseio.com/.json", function (data) {
        console.log(data);
    });
}