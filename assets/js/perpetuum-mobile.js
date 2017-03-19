// Tooltip Init
$(function () {
  $("[data-toggle='tooltip']").tooltip();
});

// make all images responsive
$(function () {
  $("img").addClass("img-responsive");
});

// responsive tables
$(document).ready(function () {
  $("table").wrap("<div class='table-responsive'></div>");
  $("table").addClass("table");
});

// responsive embed videos
$(document).ready(function () {
  $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
  $('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
  $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
  $('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});


// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function ($) {
  var MQL = 1170;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('.ppt-navbar').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function () {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('.ppt-navbar').hasClass('is-fixed')) {
            $('.ppt-navbar').addClass('is-visible');
          } else {
            $('.ppt-navbar').removeClass('is-visible is-fixed');
          }
        } else {
          //if scrolling down...
          $('.ppt-navbar').removeClass('is-visible');
          if (currentTop > headerHeight && !$('.ppt-navbar').hasClass('is-fixed')) $('.ppt-navbar').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }
});

$(window).on('load', function () {
  $('header.intro-header').css('height', window.innerHeight);
  $('header.intro-header .overlay').css('height', window.innerHeight);
});

$(window).on('resize', function () {
  $('header.intro-header').css('height', window.innerHeight);
  $('header.intro-header .overlay').css('height', window.innerHeight);
});

$(document).ready(function (e) {
  $(document).on('click', '#text img.pic', function (e) {
    if ($(window).width() > 800 && $(window).height() > 600) {
      $('a.fancybox-pic.size-2[href="/' + $(this).data('href') + '"]').click();
    }
    else{
      console.log($(this).data('href2'));
      $('a.fancybox-pic.size-1[href="/' + $(this).data('href').replace("/img/", "/thumbs/") + '"]').click();
    }
  });

  $(document).on('click', '#text img.video', function (e) {
    $('a.fancybox-video[data-id="' + $(this).data('id') + '"]').click();
  });

  if ($("a#showGoogleMap")) {
    $("a#showGoogleMap").fancybox({
      'href': '#map',
      'titleShow': false,
      'transitionIn': 'elastic',
      'transitionOut': 'elastic'
    });
  }
});