$(document).ready(function() {

  $(document).on('click', '.tabs__item', function() {
    $(".tabs__item").removeClass("tabs__item--active").eq($(this).index()).addClass("tabs__item--active");
    var index = $(this).index();
    $(".tabs__content .info__text").hide().eq(index).fadeIn()
  })

  $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle(200);
  });

  $('.main-header__link').on('click', function() {
    if ($(window).width() <= 1023) {
      $('.line-burger').removeClass('line-active');
      $('.main-header__list').slideUp(200);
    }
  })

  $(window).resize(function() {
    if (window.innerWidth > 1023) {
      $('.main-header__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    }
  })

  if ($('#fullpage').length > 0) {
    $('#fullpage').fullpage({
      anchors: ['main', 'report', 'factory', 'leasing', 'garant', 'credit', 'contacts'],
      licenseKey: 'YOUR_KEY_HERE',
      paddingTop: '60px',
      responsiveWidth: 1024,
      onLeave: function(index, nextIndex, direction) {
        let menuItems = $('.main-header__list').find("a");

        menuItems.removeClass('main-header__link--active').filter("[data-section='" + nextIndex.anchor + "']").addClass('main-header__link--active');
        if (nextIndex.anchor == 'factory' || nextIndex.anchor == 'credit' || nextIndex.anchor == 'garant' || nextIndex.anchor == 'leasing') {
          menuItems.removeClass('main-header__link--active').filter("[data-section='" + 'factory' + "']").addClass('main-header__link--active')
        }
      }
    })
  }

})


$(document).on('click', '.info__btn', function() {
  fullpage_api.moveSectionDown();
})

$(document).on('click', '.main-header__link, .info__link, .btn-request', function() {
  scrollToSection($(this));
});

function scrollToSection(elem) {
  let sectionIndex = elem.attr('data-section');
  if (sectionIndex) {
    if (window.innerWidth > 1023) {
      fullpage_api.moveTo(sectionIndex);
    } else {
      let coordsScroll = 0;
      coordsScroll = $(`[data-anchor="${sectionIndex}"]`).offset().top - $('.main-header').outerHeight();
      $('html, body').animate({
        scrollTop: coordsScroll
      }, 800);
      return false;
    }
  }
}