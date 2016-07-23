var gMap = undefined;

$(document).ready(function (e) {

  $("#videos .fancybox-video").attr('rel', 'gallery1').fancybox({padding: 0});
  $("#gallery .fancybox-pic").attr('rel', 'gallery2').fancybox({padding: 0});

  $(document).on('click', '#affix-sidebar a', function (e) {

    if ($(this).attr('id') == 'sidebar-pics') {
//      $.fancybox.open(ppt_gallery, {padding: 0});
      $("#gallery .fancybox-pic").first().click();
    }
    else if ($(this).attr('id') == 'sidebar-stats') {
      $.fancybox.open(ppt_stats_gallery, {padding: 0});
    }
    else if ($(this).attr('id') == 'sidebar-vids') {
      $("#videos .fancybox-video").first().click();
    }
    else {
      if ($(this).parent().hasClass('active')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      $('#affix-sidebar li').removeClass('active');
      $(this).parent().addClass('active');
      $('.content').hide();
      $($(this).attr('href')).show();

      if ($(this).attr('id') == 'sidebar-map') {
        var $map = $('#map');
        $map.show();
        $map.css('height', window.innerHeight);
        $map.css('width', '100%');
        if (gMap == undefined) {
          gMap = new Map();
          gMap.initializeMap($map.data('track'));
        }
      }

      window.scrollTo(0, window.innerHeight);
      $('.ppt-navbar').removeClass('is-visible');
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