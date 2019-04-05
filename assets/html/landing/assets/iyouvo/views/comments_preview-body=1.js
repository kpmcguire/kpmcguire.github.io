$(function() {

  iY = iY || {};
  iY.Comments = iY.Comments || {};

  var options = {
    success: function(data) {
      var output = this.target.find('.liveurl');

      output.find('.inner').data({'preview-link': data.url});
      output.find('.title').text(data.title);
      output.find('.description').text(data.description);
      output.find('.url').html('<a href="' + data.url + '" rel="nofollow">' + data.url + '</a>');
      output.find('.image').empty();

      var that = this;
      output.find('.close').one('click', function() {
        that.target.trigger('liveurl:clear');
      });

      output.show('fast');

      if (data.video !== null) {
        var ratioW = data.video.width / 450;
        data.video.width  = 450;
        data.video.height = data.video.height / ratioW;

        // hack, replace http with https
        data.video.file = data.video.file.replace(/^http:\/\//i, 'https://');

        var video =
          '<object width="' + data.video.width  + '" height="' + data.video.height  + '">' +
          '<param name="movie"' +
          'value="' + data.video.file  + '"></param>' +
          '<param name="allowScriptAccess" value="always"></param>' +
          '<embed src="' + data.video.file  + '"' +
          'type="application/x-shockwave-flash"' +
          'allowscriptaccess="always"' +
          'width="' + data.video.width  + '" height="' + data.video.height  + '"></embed>' +
          '</object>';

        output.find('.video').html(video).show();
        output.parent().addClass('video');

      } else {
        var inner = output.find('.inner');
        inner.unbind('click');
        inner.on('click', function() {
          var link = $(this).data('preview-link');
          window.open(link, '_blank');
        });
      }
    },
    imageProxy: function(src) {
      return iY.Embedly.proxyImageURL(src);
    },
    encodingSafe: true,
    multipleImages: false,
    defaultProtocol: 'https://'
  };

  iY.Comments.newPostPreview = function(params) {
    var withOptions = $.extend({}, options, {
      target: params.target,
      template:
        '<div class="liveurl-loader"></div>' +
        '<div class="liveurl">' +
          '<div class="close" title="Close"></div>' +
          '<div class="inner">' +
            '<div class="image"></div>' +
            '<div class="details">' +
              '<div class="info">' +
                '<div class="title"> </div>' +
                '<div class="description"> </div> ' +
              '</div>' +
              '<div class="video"></div>' +
            '</div>' +
          '</div>' +
        '</div>'
    });
    params.text.liveUrl(withOptions);
  };

  iY.Comments.showLinkPreview = function(params) {
    var withOptions = $.extend({}, options, {
      target: params.target,
      template:
        '<div class="liveurl-loader"></div>' +
        '<div class="liveurl">' +
          '<div class="inner">' +
            '<div class="image"></div>' +
            '<div class="details">' +
              '<div class="info">' +
                '<div class="title"> </div>' +
                '<div class="description"> </div> ' +
              '</div>' +
              '<div class="video"></div>' +
            '</div>' +
          '</div>' +
        '</div>'
    });
    params.text.processUrl(withOptions);
  };
});
