$(document).ready(function () {
    $('.header-search__input').focus(function(e) {
        $('.header-search-autocomplete').slideDown();
    });

    $('.header-search__input').focusout(function(e) {
        $('.header-search-autocomplete').slideUp();
    });

    $('.header-search-autocomplete__close').click(function(e) {
        $('.header-search-autocomplete').slideUp();
    });
});