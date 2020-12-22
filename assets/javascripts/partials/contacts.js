$(document).ready(function () {
    $('.contacts-form__input').change(function(e) {
        if ($(this).val() != '') {
            $(this).addClass('contacts-form__input--filled');
        }
        else {
            $(this).removeClass('contacts-form__input--filled');
        }
    });

    $('.contacts-form__textarea').change(function(e) {
        if ($(this).val() != '') {
            $(this).addClass('contacts-form__textarea--filled');
        }
        else {
            $(this).removeClass('contacts-form__textarea--filled');
        }
    });
});