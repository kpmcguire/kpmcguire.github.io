(function($) {
  $(document).bind('application:ready', function() {
    $('.comment-faces').each(function() {
      iY.Faces.initializeCommentFaces($(this));
    });

    $('.reflection-faces').each(function() {
      iY.Faces.initializeReflectionFaces($(this));
    });
  });

  iY = iY || {};
  iY.Faces = iY.Faces || {};

  var updateFaceNumbers = function($post, res) {
    if (parseInt(res.likes, 10) > 0) {
      $post.find('.face-number.happy').first().text("(" + res.likes + ")").removeClass('hidden');
    }
    else {
      $post.find('.face-number.happy').first().addClass('hidden');
    }
  };

  var updateFaceLinks = function($post, res) {
    var likeMethod = (res.liked === true) ? 'DELETE' : 'POST';
    $post.find('.face-link.happy').data('method', likeMethod);
  };

  var updateFaceViews = function($post, res) {

    var $happyH2 = $post.find('.face-modal.happy h2');
    if (parseInt(res.likes, 10) > 1) {
      $happyH2.text(res.likes + ' people are loving this');
    } else {
      $happyH2.text(res.likes + ' person is loving this');
    }

    $post.find('.face-link.happy').first().removeClass().addClass(res.happyClass + ' face-link happy');
    $post.find('.happyicon').first().removeClass().addClass(res.happyIcon + ' happyicon');
  };

  var updateFaceIcons = function($post, res) {
    updateFaceNumbers($post, res);
    updateFaceLinks($post, res);
    updateFaceViews($post, res);
  };

  var onCommentFaceChange = function(evt, xhr) {
    var $post = $(this).closest('.comment');
    var res = $.parseJSON(xhr.responseText);
    updateFaceIcons($post, res);
  };

  var onReflectionFaceChange = function(evt, xhr) {
    var $post =  $(this).closest('.reflection');
    var res = $.parseJSON(xhr.responseText);
    updateFaceIcons($post, res);
  };

  var initCommentFaceModals = function($post) {
    var postID = $post.data('id');

    $post.find('.face-number.happy').on('click', function() {
      $.ajax({
        url: '/comments/' + postID + '/faces/?vote=liked',
        success: function(data) {
          $post.find('.face-modal.happy .modal-body').html(data);
        }
      });
    });
  };

  var initReflectionFaceModals = function($post) {
    var postID = $post.data('id');

    $post.find('.face-number.happy').on('click', function() {
      $.ajax({
        url: '/reflections/' + postID + '/faces/?vote=liked',
        success: function(data) {
          $post.find('.face-modal.happy .modal-body').html(data);
        }
      });
    });
  };

  iY.Faces.initializeCommentFaces = function($post) {
    $post.find('.face-container').tooltip();
    $post.on('ajax:complete', '.face-link[data-object=Comment]', onCommentFaceChange);
    initCommentFaceModals($post);
  };

  iY.Faces.initializeReflectionFaces = function($post) {
    $post.find('.face-container').tooltip();
    $post.on('ajax:complete', '.face-link[data-object=Reflection]', onReflectionFaceChange);
    initReflectionFaceModals($post);
  };

})($);
