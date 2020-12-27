$(document).ready(function () {

    $(window).scroll(function(e) {
        if ($(window).scrollTop() > $('.header__top').innerHeight()) {
            $('.header').addClass('header--scroll');
        }
        else {
            $('.header').removeClass('header--scroll');
        }
    });

    if ($(window).width() > 767) {

        $('.header-menu__link--opening > a').mouseover(function (e) {
            $(this).parents('.header-menu__link').addClass('header-menu__link--active');
            $(this).next('.header-menu__submenu').addClass('header-menu__submenu--active');
        });

        $('.header-menu__link--opening').mouseleave(function (e) {
            $(this).find('.header-menu__submenu').removeClass('header-menu__submenu--active');
            $(this).removeClass('header-menu__link--active');
        });
    }
    else {
        $('.header-menu__link--opening > a').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).parents('.header-menu__link').addClass('header-menu__link--active');
            $(this).next('.header-menu__submenu').addClass('header-menu__submenu--active');
        });

        $('body').click(function() {
            $('.header-menu__link').removeClass('header-menu__link--active');
            $('.header-menu__submenu').removeClass('header-menu__submenu--active');
        });

        $('.header__burger').click(function(e) {
            e.preventDefault();
            $(this).toggleClass('header__burger--active');
            $('.header-menu').slideToggle();
        });
    }

});
