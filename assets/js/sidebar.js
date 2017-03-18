var gMap = undefined;

$(document).ready(function (e) {

  $("#videos .fancybox-video").attr('rel', 'gallery1').fancybox({padding: 0});
  $("#gallery .fancybox-pic.size-2").attr('rel', 'gallery2').fancybox({padding: 0});
  $("#gallery .fancybox-pic.size-1").attr('rel', 'gallery3').fancybox({padding: 0});

  $(document).on('click', '#affix-sidebar a', function (e) {

    if ($(this).attr('id') == 'sidebar-pics') {
//      $.fancybox.open(ppt_gallery, {padding: 0});
      if ($(window).width() > 800) {
        $("#gallery .fancybox-pic.size-2").first().click();
      }
      else {
        $("#gallery .fancybox-pic.size-1").first().click();
      }
    }
    else if ($(this).attr('id') == 'sidebar-stats') {
      $.fancybox.open(ppt_stats_gallery, {padding: 0});
    }
    else if ($(this).attr('id') == 'sidebar-vids') {
      $("#videos .fancybox-video").first().click();
    }
    else {
      $("a#showGoogleMap").click();
    }

    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  $(window).scroll(function () {
    if (window.scrollY > window.innerHeight - 50) {
      $("#affix-sidebar-labels").delay(3200).fadeOut(300);
    }
  });

});