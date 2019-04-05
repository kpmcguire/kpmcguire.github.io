iY.searchFriends = function() {
  var userId = $('#user_id').val();
  $('#friends').load('/users/' + userId + '/friends', 'term=' + $('#search_friends').val() + '&recruits_only=' + $('#recruits_only').val());
};

iY.friendsFilterLinks = function() {
  var el = $(this);
  $('#recruits_only').val(el.data('filter'));
  iY.searchFriends();
  el.siblings().removeClass('active');
  el.addClass('active');
  return false;
};

iY.getDashboardRecommendations = function(userId) {
  $('.dashboard_recommendations').load('/users/' + userId + '/dashboard_recommendations');
};

iY.gabActions = function(postable_id, postable_type) {

  var addForm = function (el) {
    $('.poster-form').load('/posts/new?postable_id=' + postable_id + '&postable_type=' + postable_type + '&post_type=' + el.attr('id'), function() {
        $('body').trigger('gabform:loaded');
      }
    );
  };

  var animateGab = function (el) {
    if (el.attr('id') == 'post_reflection') {
      $('.poster-container').animate({height: '440px'}, 250);
    }
    else if (el.attr('id') == 'post_photo') {
      $('.poster-container').animate({height: '220px'}, 250);
    }
    else if (el.attr('id') == 'post_comment') {
      $('.poster-container').animate({height: '150px'}, 250);
    }
    $('.post-types').css('display', 'none');

    $('.poster-form').animate({opacity: '1'}, 250);
  };

  $('.new-post-container').click(function() {
    animateGab($(this));
    addForm($(this))
    $('.post-types').addClass('animated fadeOut');
  });

  $(document).on('click', '.cancel-post', function() {
    $('.poster-form').animate({opacity: '0'}, 250);
    $('.poster-container').animate({height: '0'}, 250);
    $('.post-types').removeClass('animated fadeOut').css('display', 'block');
    $('.poster-form').empty();
  });
};


