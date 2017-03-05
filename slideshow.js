$(document).ready(function(){
    $.getJSON('https://kulmalm5.firebaseio.com/.json',function(res){
        $(window).unload(saveSettings);
        loadSettings();
        addArticle(res.articles);
    });
    //function that changes the article_index with +1 and calls for change article
    $('#next').click('click',function(e) {
        article_index ++;
        changeArticle("next");
    });
    //function that changes the article_index with -1 and calls for change article
    $('#previous').click('click',function(e) {
        article_index --;
        changeArticle("previous");
    });
});
