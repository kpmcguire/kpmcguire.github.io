$(document).bind("application:ready", function() {

  if ($('.wall_container').size()) {

    $('.wall_container').on('submit', 'form.comment, form.new_comment, form.reply_gab_post', function() {
      var pictureInput = $(this).find('#comment_picture');
      if (pictureInput.length != 1) { throw "Expected exactly one picture file input"; }
      var fileChosen = pictureInput.val() ? true : false;
      var hasComment = $.trim($(this).find('textarea').val()) !== '';
      var cancelComment = $('.cancel-comment').on('click');

      if (hasComment || fileChosen || cancelComment) {
        $(this).find("input[type='submit']").attr('disabled', 'disabled');
        var reply = $(this).parents().find('.reply_content');
        reply.toggleClass('fadeInDown').addClass('fadeOutUp');
        reply.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).css('display', 'none');
        });
      } else {
        $(document).trigger('flash:warning', { message: "Please enter a comment or a picture.", top: $(document).scrollTop() });
        return false;
      }
    });

    $('.wall_container').on('submit', 'form.new_reflection', function() {
      var body = $.trim($(this).find('textarea').val());
      var title = $.trim($(this).find('input[name="reflection[title]"]').val());

      if (body !== '' && title !== '') {
        $(this).find("input[type='submit']").attr('disabled', 'disabled');
      } else {
        $(document).trigger('flash:warning', { message: "Please enter both a title and a reflection.", top: $(document).scrollTop() });
        return false;
      }
    });

    $('.wall_container').on('ajax:success', '#new_comment', function (evt, xhr) {
      var newPost = $(xhr);
      newPost.find('.comment-faces').each(function() {
        iY.Faces.initializeCommentFaces($(this));
      });
      $('#wall_posts').prepend(newPost);
      $('#post_creation_preview').trigger('liveurl:clear');
      iY.createLinkPreview(newPost);

      $(this).find('input, textarea').removeAttr('disabled');

      if (typeof twttr !='undefined') { twttr.widgets.load(); }

      $('.poster-form').animate({opacity: '0'}, 250);
      $('.poster-container').animate({height: '0'}, 250);
      $('.post-types').removeClass('animated fadeOut').css('display', 'block');
      $('.poster-form').empty();

      iY.hideTheStartConvoImage();
    });

    var resetReflectionForm = function (form) {
      form.find('input, textarea').removeAttr('disabled');
      form.find('input[name="reflection[title]"]').val('');
      window.Bootsy.areas.reflection_body.clear();
    };

    $('.wall_container').on('ajax:success', '#new_reflection', function (evt, xhr) {
      resetReflectionForm($(this));
      $(this).parent().hide();

      var post = xhr;

      if (!post.draft) {
        var publishedPost = $(post.html)
        publishedPost.find('.reflection-faces').each(function() {
          iY.Faces.initializeReflectionFaces($(this));
        });

        $('#wall_posts').prepend(publishedPost);

        iY.hideTheStartConvoImage();
      }

      if (typeof twttr !='undefined') { twttr.widgets.load(); }

      $('.poster-form').animate({opacity: '0'}, 250);
      $('.poster-container').animate({height: '0'}, 250);
      $('.post-types').removeClass('animated fadeOut').css('display', 'block');
      $('.poster-form').empty();

      iY.redirectOnReflectionCreate(post, false);
    });

    /* TODO: Why do we have to use `ajax:complete`?  Why doesn't
    `ajax:success` fire, even when the HTTP response status is
    `200`? -Jared 2014-04-24 */
    $('.wall_container').on('ajax:complete', '#new_photo_comment', function (event, xhr, statusMessage) {
      var newPost = $(xhr.responseText);
      $('#wall_posts').prepend(newPost);

      newPost.find('.comment-faces').each(function() {
        iY.Faces.initializeCommentFaces($(this));
      });

      $(this).find('input, textarea').removeAttr('disabled');
      iY.cleanImageSelection();
      $(this).find('#comment_picture').attr('name', 'comment[picture]');  // quick fix for bootstrap issue where name attribute loses its field (no ="")

      if (typeof twttr !='undefined') { twttr.widgets.load(); }

      $('.poster-form').animate({opacity: '0'}, 250);
      $('.poster-container').animate({height: '0'}, 250);
      $('.post-types').removeClass('animated fadeOut').css('display', 'block');
      $('.poster-form').empty();

      iY.hideTheStartConvoImage();
    });

    $('.wall_container').on('ajax:complete', '.reply_gab_post', function (evt, xhr) {
      iY.initReplyGabPost($(this), xhr);
    });

    $('.wall_container').on('click', 'a.reply', function (e) {
      $(this).parent().find('.reply_content').toggleClass('fadeInDown').removeClass('fadeOutUp').css('display', 'block');
      e.stopPropagation();
      e.preventDefault();
    });

    $('.wall_container').on('click', '.cancel-comment', function (e) {
      var replyContent = $(this).parents('.post-container').find('.reply_content');
      if (replyContent.length != 1) { throw "Expected exactly one reply_content element"; }
      replyContent.toggleClass('fadeOutUp').removeClass('fadeInDown');
      replyContent.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).css('display', 'none');
      });
    });

    $('.wall_container').on('focus', '.gab_body_child, .gab_comment_body', function (e) {
      $(this).parent().parent().find('.gab_comment_controls').removeClass('hidden');
      e.stopPropagation();
      e.preventDefault();
    });

    $('body').on("gabform:loaded", function () {
      window.Bootsy.init();
    });

    $('.wall_container').on('ajax:success', 'div.comment a.comment-delete', function() {
      $(this).closest("div.comment").fadeOut(iYouVo.hideAnimationTime);
    });

    $('.wall_container').on('click', '.fb_share_on_wall', function() {
      iYouVo.fb.initShareButton($(this));
    });
  }
});

// listen for image uploads and verify they are image files
$(document).on('change', '.verify-image', function () {
  var inputFile = this;
  var allowedExtension = ["jpg", "jpeg", "gif", "png", "bmp"];

  var extName;
  var maxFileSize = 10485760; // 10 megabytes
  var submit = $(inputFile).closest('form').find(':submit');
  var buttonText = ($(inputFile).parents('.child-reply-form').length > 0) ? 'Reply' : 'Post';
  var sizeExceeded = false;
  var extError = false;

  $.each(inputFile.files, function() {
    if (this.size && maxFileSize && this.size > parseInt(maxFileSize, 10)) { sizeExceeded = true }
    extName = this.name.split('.').pop().toLowerCase();
    if ($.inArray(extName, allowedExtension) == -1) { extError = true }
  })
  if (extError) {
    submit.siblings('.upload-message').text('Image is not valid, please try another image');
    if (!$(submit).hasClass('dis-disable')) submit.attr({ disabled: 'disabled' });
  } else if (sizeExceeded) {
    submit.siblings('.upload-message').text('Image too large, please try another image');
    if (!$(submit).hasClass('dis-disable')) submit.attr({ disabled: 'disabled' });
  } else {
    submit.data('tooltip', false).removeAttr('disabled title').val(buttonText);
  }
});

iY.cleanImageSelection = function() {
  var preview = $('#photo-upload.uploader img');
  var newPreview = preview.clone();
  newPreview.attr('src','');
  preview.replaceWith(newPreview);
};

iY.hideTheStartConvoImage = function() {
  $('#start-convo').addClass('hidden');
};

iY.initReplyGabPost = function(el, xhr) {
  var replyPost = $(xhr.responseText);
  el.closest(".child-comment-container").children().last().after(replyPost);

  replyPost.find('.comment-faces').each(function() {
    iY.Faces.initializeCommentFaces($(this));
  });
};

iY.wallParams = function(cid, rid, count, postable_type, postable_id) {
  var postParams =  {startComment:cid,
    startReflection:rid,
    count:count || 10}

  var postableParams = (postable_type!==undefined && postable_id!==undefined) ?
    { postable_type:postable_type,
      postable_id:postable_id } : {}

  return $.extend(postParams, postableParams);
};

iY.loadWall = function(wallParams) {
  iY.loadGabPosts(wallParams);

  if ($('.load_more_gab').size()) {
    $('.load_more_gab').on('click', function() {
      var cid = $('#last_checked_comment_id').val();
      var rid = $('#last_checked_reflection_id').val();
      iY.loadGabPosts( $.extend(wallParams, {startComment:cid, startReflection:rid}) );
    });
  }
};

iY.wallPath = function(wallParams){
  return '/posts?' + decodeURIComponent($.param(wallParams));
};

iY.loadGabPosts = function(wallParams) {
  if (wallParams.startComment <= 1 && wallParams.startReflection <= 1 ) return false;

  $('#gab-spinner').show();

  $.getJSON(iY.wallPath(wallParams), function(data) {
    if (data.length < wallParams.count) {
      $('.load_more_gab').hide();
      $('#gab-spinner').hide();
    }

    if (data.length > 0) {
      var newPosts = [];
      var lastCommentId = 0
      var lastReflectionId = 0

      $.each(data, function(i,c) {
        var post = $(c.html);
        post.hide().appendTo('#wall_posts');
        newPosts.push(post);

        if (post.find('.comment-faces')!==null) {
          post.find('.comment-faces').each(function() {
            iY.Faces.initializeCommentFaces($(this));
          });
        }
        if (post.find('.reflection-faces')!==null) {
          post.find('.reflection-faces').each(function() {
            iY.Faces.initializeReflectionFaces($(this));
          });
        }

        if (c.id !== null && c.type == 'Comment') lastCommentId = c.id;
        if (c.id !== null && c.type == 'Reflection') lastReflectionId = c.id;
      });

      if (lastCommentId > 0) $('#last_checked_comment_id').val(lastCommentId);
      if (lastReflectionId > 0) $('#last_checked_reflection_id').val(lastReflectionId);

      $('#gab-spinner').hide();

      $.each(newPosts, function(index) {
        $(this).delay(380*index).fadeIn(400, function () {
          $(".comments-container").css("height","auto");
        });
        iY.createLinkPreview(newPosts[index]);
      });

      if (typeof twttr !='undefined') { twttr.widgets.load(); }
    }
  });
};

iY.createLinkPreview = function(comment) {
  var link = comment.find('.comment-new a');
  if(link.length > 0) {
    var preview = $('<div class="preview"></div>');
    preview.insertAfter(link);

    iY.Comments.showLinkPreview({
      text: link,
      target: preview
    });
  }
};

iY.showReflectionShareLinks = function(title, url, redirect, redirect_url) {
  var modal = $('.reflection-social-share-modal')
  var attrs = {
    user: iY.currentUser.first_name + ' ' + iY.currentUser.last_name,
    url: url,
    share_name: title
  };

  // setup close button
  if (redirect) {
    modal.find('.close-btn').on('click', function() {
      window.location.href = redirect_url;
    });
  }

  // setup modal body
  modal.find('.modal-body').html(iY.template('reflexions/social_share_links', attrs));

  // initialize share buttons
  var fb = modal.find('.facebook-share-button');
  fb.on('click', function(e) {
    e.preventDefault();
    iY.fb.shareParticipatingCallback($(this));
  });

  if (typeof twttr !='undefined') { twttr.widgets.load(); }

  modal.modal('show');
};

iY.redirectOnReflectionCreate = function(newPost, redirectOnPublish) {
  var flashMessage;
  var redirect_url = newPost.url

  if (newPost.draft) {
    flashMessage = "Your Reflection was successfully created. Don't forget to go back and publish it when you've finished!";
    $(document).trigger('flash:info', { message: flashMessage, top: $(document).scrollTop() });
    window.location.href = redirect_url;
  } else {
    flashMessage = 'Your reflection was successfully published.';
    $(document).trigger('flash:info', { message: flashMessage, top: $(document).scrollTop() });

//  If social options are enabled on JS side.
//  The backend only puts on the page specific JS for facebook when it's enabled,
//  which includes defining iY.currentUserIY
    if (typeof iY.currentUseriY !='undefined') {
      showReflectionShareLinks( newPost.title,
        document.location.protocol + '//' + document.location.hostname,
        redirectOnPublish,
        redirect_url
      );
    }
  }
}
;
