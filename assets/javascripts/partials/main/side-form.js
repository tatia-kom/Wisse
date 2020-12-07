$(document).ready(function () {
    $('.side-form-button').click(function(e) {
        e.preventDefault();
        $('.side-form').addClass('side-form--active');
    });

    $('.side-form__close').click(function(e) {
        e.preventDefault();
        $('.side-form').removeClass('side-form--active');
    });

    $('.side-form__input').focusout(function(e) {
        if ($(this).val() != '') {
            $(this).addClass('side-form__input--filled');
        }
        else {
            $(this).removeClass('side-form__input--filled');
        }
    });
});