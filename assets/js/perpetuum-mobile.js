// Tooltip Init
$(function () {
  $("[data-toggle='tooltip']").tooltip();
});

// make all images responsive
$(function () {
  $("img").addClass("img-responsive");
});

// make all external links open in another window
$(function () {
  $(".external").attr('target', '_blank');
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
  var $introHeader = $("header.intro-header");
  
  if ($introHeader.length > 0){
    $introHeader.css('height', window.innerHeight);
    $introHeader.find('.overlay').css('height', window.innerHeight);
  
    if ($(window).width() > 800) {
      $introHeader.css('background-image', "url('" + $introHeader.data('url') +"')");
    }
  }
  
  $('.carousel').css('height', window.innerHeight);
  $('.carousel img').css('max-height', window.innerHeight);
  $('iframe.youtube').css('height', parseInt($('iframe.youtube').css('width'))*9/16);
  $('.videos-table').css('position', 'static');
});

$(window).on('resize', function () {
  var $introHeader = $("header.intro-header");
  
  if ($introHeader.length > 0) {
    $introHeader.css('height', window.innerHeight);
    $introHeader.find('.overlay').css('height', window.innerHeight);
  }
  
  $('.carousel').css('height', window.innerHeight);
  $('.carousel img').css('max-height', window.innerHeight);
  
  $('iframe.youtube').css('height', parseInt($('iframe.youtube').css('width'))*9/16);
});

$(document).ready(function (e) {
  // var $introHeader = $(".intro-header");
  //
  // var img = new Image();
  // img.src = $introHeader.data('url');
  
  $('.carousel').carousel();
  
  if ($('.featured-tabs').length > 0){
    var tabIds = ["#voznje", "#zanimljiva-mesta", "#setnje", "#putovanja", "#dete", "#etc"];
    $("a[href="+tabIds[Math.floor(Math.random()*tabIds.length)]+"]").click();
  }

  $(document).on('click', '#text img.pic', function (e) {
    if ($(window).width() > 800 && $(window).height() > 600) {
      $('a.fancybox-pic.size-2[href="/' + $(this).data('href') + '"]').click();
    }
    else{
      console.log($(this).data('href2'));
      $('a.fancybox-pic.size-1[href="/' + $(this).data('href').replace("/img/", "/thumbs/") + '"]').click();
    }
  });

  $(document).on('click', '#text .pm-youtube', function (e) {
    $('a.fancybox-video[data-id="' + $(this).data('id') + '"]').click();
  });

  $(document).on('click', '#item-etc', function (e) {
    $('#etc').toggleClass('hidden');
    $(this).blur();
    e.preventDefault();
    return false;
  });
  
  $(document).on('click', '.site-tag .prikazi-sve', function (e) {
    $(this).parent().parent().find('.site-tag').removeClass('hidden');
    $(this).parent().addClass('hidden');
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
  
  $(document).on('click', '.tag-cloud a, .authors-cloud a', function (e) {
    if(!$(this).hasClass('prikazi-sve')){
     if($(this).hasClass('active')){
        $('.tag-cloud a, .authors-cloud a').removeClass('active');
        $('.post-preview').show();
      }
      else{
        $('.tag-cloud a, .authors-cloud a').removeClass('active');
        $(this).addClass('active');
        $('.post-preview').hide();
        $('.post-preview[data-tags*='+$(this).data("tag")+']').show();
      }
      $([document.documentElement, document.body]).animate({
        scrollTop: $(".post-previews").offset().top
      }, 1000);
      $(this).blur();
    }
    e.preventDefault();
    return false;
  });
  
  $(document).on('click', '.menu .vrh', function (e) {
    $("html, body").animate({scrollTop:"0"},600);
    e.preventDefault();
    return false;
  });

  $(document).on('click', '.featured-tabs .nav-tabs a', function (e) {
    $(this).blur();
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