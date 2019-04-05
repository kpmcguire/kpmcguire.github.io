(function($) {
  $(function() {
    $(document).trigger("application:ready");
  });

  if (Modernizr.touch) {
    var $body = jQuery('body');

    $(document).on('focus', 'input', function(e) {
      $body.addClass('fixfixed');
    });

    $(document).on('blur', 'input', function(e) {
      $body.removeClass('fixfixed');
    });
  }

  $(document).bind("application:ready", function () {

    iY.isTouchDevice = ('ontouchstart' in window);

    $('.selectpicker').selectpicker({
      style: 'btn-default btn-sm flaticon solid eye-1',
      size: 4
    });

    $('.dropdown-menu').find('form').click(function (e) {
      e.stopPropagation();
    });

    // setup flash
    $('.flash, .flash_landing, .flash_wizard').flash();

    // init autocomplete
    $('.autocomplete').each(function(index, element) {
      iY.autocomplete(element);
    });

    //popovers
    $('[rel=popover]').popover();

    //tooltips
    $('[rel=tooltip], .btn').tooltip();

    iY.initDatePickers();

    // init modal
    iYouVo.redisplayModal();

    // prevent requesting friend more than once
    if ($('#add-friend-btn').size()) {
      var addFriendFlag = false;
      $('#add-friend-btn').bind('click', function (e) {
        if (addFriendFlag) {
          return false;
        }
        addFriendFlag = true;
      });
    }

    if ($('.fb_share_opp').size() > 0) {
      $('.fb_share_opp').click(function () {
        iYouVo.fb.shareOppToWall($(this));
        return false;
      });
    }

    //init address postal change reset
    if ($('#address_form_fields').size()) {
      iYouVo.address_postal_reset($('input[id$=postal_code]'));
    }

    var confirmFriendFlag = false;
    $('#confirm-friend, .confirm-friend-btn').on('click', function (e) {
      if (confirmFriendFlag) {
        return false;
      }
      confirmFriendFlag = true;
    });

    if ($('#add_tag_form').size()) {
      $('#add_tag_form').bind('ajax:success', iY.addTagCallback);
    }

    if ($('#user_tags').size()) {
      $('#user_tags .tag a').click(iY.removeTag);
    }

    if ($('a#hours_ranking_show_more').size()) {
      $('a#hours_ranking_show_more').click(function() {
        $('#hours_ranking tr.hidden_row').fadeToggle().toggleClass('hidden');
        $(this).html($(this).html() === "See More" ? "See Fewer" : "See More");
        return false;
      });
    }

    if ($('.pagination').size() || $('#pagination_container').size() || $('#inbox_pagination').size()) {
      $('body').on('click', '.pagination li.disabled a', function() {
        return false;
      });
    }

    if ($('form#new_picture').size()) {
      $('form#new_picture').on('submit', function() {
        $(this).find('input[type=submit]').attr('disabled', 'disabled');
        $(this).find('#indicator').removeClass('hidden');
      });
    }

    // add 'data: { disable: 'text' }' to any '.disable-with' for double-click prevention
    $('.disable-with').each(function() {
      $(this).on('click', function() {
        $(this).text($(this).data('disable') || $(this).text()).addClass('disabled');
      });
    });

    // share current page to facebook via share dialog (popup window)
    $('.facebook-share').click(function() {
      window.open('https://www.facebook.com/sharer/sharer.php?s=100' +
        '&p[url]=' + encodeURIComponent(location.href) +
        '&p[title]=' + encodeURIComponent(document.title),
        'facebook-share-dialog', 'width=626,height=436');

      return false;
    });

    $(document).trigger('walkthrough:start');

  });

  $('.btn.cancel-post').on('click', function() {
    console.log('Click');
    $('.poster-form').removeClass('animate fadeIn');
  });

  $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });

})(jQuery);
