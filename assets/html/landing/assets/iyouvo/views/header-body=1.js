function hideMenu() {
    $('.you-dropdown').removeClass('slideInDown').addClass('slideOutUp');
    $('.closer').remove();
  }

function showMenu() {
    $('.you-dropdown').addClass('slideInDown').removeClass('slideOutUp').css('display', 'block');
    $('.you-dropdown').parent().append("<div class='closer'" +
        "style='overflow: auto; position: fixed; top: 0;" +
        "right: 0; bottom: 0; left: 0; z-index: 1000;'></div"
    );
  }

$('body').on('click', '.closer, .navbar, .you-dropdown a:not(#nav_opps)', function(){
  hideMenu();
});

$('.you-toggle').on('click', function(event) {
  event.stopPropagation();
  if($('.you-dropdown').hasClass('slideInDown')) {
    hideMenu();
  } else {
    showMenu();
  }
});
