$(document).ready(function () {

  $(".wrapper .tab").click(function () {
    $(".wrapper .tab").removeClass("active").eq($(this).index()).addClass("active");
    $(".tab_item").hide().eq($(this).index()).fadeIn();
    $(".tab_item_slider").slick('refresh');
  }).eq(0).addClass("active");

});
