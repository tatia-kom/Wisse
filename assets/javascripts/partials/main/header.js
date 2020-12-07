$(document).ready(function () {

    $(window).scroll(function(e) {
        if ($(window).scrollTop() > $('.header__top').innerHeight()) {
            $('.header').addClass('header--scroll');
        }
        else {
            $('.header').removeClass('header--scroll');
        }
    });

    $('.header-menu__link--opening > a').mouseover(function(e) {
        $(this).parents('.header-menu__link').addClass('header-menu__link--active');
        $(this).next('.header-menu__submenu').addClass('header-menu__submenu--active');
    });

    $('.header-menu__link--opening').mouseleave(function(e) {
        $(this).find('.header-menu__submenu').removeClass('header-menu__submenu--active');
        $(this).removeClass('header-menu__link--active');
    });

});
