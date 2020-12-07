$(document).ready(function () {

    $('.tab-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true
    });

    $('.tab-slider .slick-active .tab-slider__cover').addClass('tab-slider__cover--visible');
    $('.tab-slider .slick-active .tab-slider__text').addClass('tab-slider__text--visible');

    $('.tab-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.tab-slider .slick-active .tab-slider__cover').addClass('tab-slider__cover--visible');
        $('.tab-slider .tab-slider__text').removeClass('tab-slider__text--hide tab-slider__text--visible');
        $('.tab-slider .slick-active .tab-slider__text').addClass('tab-slider__text--visible');
    });

    $('.tab-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.tab-slider .slick-active .tab-slider__text').addClass('tab-slider__text--hide');
        $('.tab-slider .slick-active .tab-slider__cover').removeClass('tab-slider__cover--visible');
    });

});

