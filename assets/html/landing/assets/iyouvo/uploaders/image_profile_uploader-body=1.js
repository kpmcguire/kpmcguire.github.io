(function($) {

  var CroppingModal = function(options, uploader) {
    $.extend(this, options.modal);
    var img = this.find(options.cropping.area);

    this.show = function() {
      this.modal('show');
    };
    this.hide = function() {
      this.modal('hide');
    };

    this.setCroppingArea = function(croppingArea) {
      this.find('.cropping-container').html(croppingArea);
      croppingArea.initJcrop();
    };

    this.getCroppingImage = function() {
      return img;
    };

    this.find('button.apply').on('click', function() {
      uploader.crop();
    });
    this.find('.rotate-right').on('click', function() {
      uploader.rotateRight();
    });
    this.find('.rotate-left').on('click', function() {
      uploader.rotateLeft();
    });
  };

  var CroppingArea = function(options, image, img) {
    $.extend(this, img);
    var jcrop_api;

    var SetDimension = function() {
      var maxWidth = 500;
      var maxHeight = 350;
      var width = image.width;
      var height = image.height;

      if (width > maxWidth) {
        width = maxWidth;
        height = (maxWidth / image.width) * image.height;
      }
      if (height > maxHeight) {
        height = maxHeight;
        width = (maxHeight / image.height) * image.width;
      }

      this.width(width).height(height);
      this.attr('width', width);
      this.attr('height', height);
      this.parent().width(width)
    };

    this.getImageProperties = function() {
      return image;
    };

    this.src = function(src) {
      this.attr('src', src);
    };

    this.getSelection = function() {
      var selection = jcrop_api.tellSelect();
      return {
        x: (image.width  / this.width())  * selection.x,
        y: (image.height / this.height()) * selection.y,
        w: (image.width  / this.width())  * selection.w,
        h: (image.height / this.height()) * selection.h
      };
    };

    this.initJcrop = function() {
      var jCropOptions = options.jCropOptions;
      if(jCropOptions.setToImageSize) {
        jCropOptions.setSelect = [0, 0, this.width(), this.height()]
      } else if(image.width < jCropOptions.setSelect[2] ||
                image.height < jCropOptions.setSelect[3]) {
        if(image.width < image.height) {
          jCropOptions.setSelect = [0, 0, image.width, image.width];
          jCropOptions.minSize = [image.width, image.width];
        } else {
          jCropOptions.setSelect = [0, 0, image.height, image.height];
          jCropOptions.minSize = [image.height, image.height];
        }
      }
      this.Jcrop(jCropOptions, function() {
        jcrop_api = this;
      });
    };

    this.url = options.url;

    SetDimension.apply(this);
    this.src(image.src);
  };

  var CroppingUploader = function($imageUploader, options) {
    $.extend(this, $imageUploader);
    var that = this;

    var $input = this.find('input.image-uploader');
    var inputHiddenName = $input.attr('name') + '_filename';
    var inputHidden = $input.closest('form').find('input[name=' + inputHiddenName + ']')
    if(inputHidden.length === 0) {
      inputHidden = $('<input type="hidden" name="' + inputHiddenName + '"/>');
      $input.after(inputHidden);
    }

    var modal = iY.ImageProfileUploader.CroppingModal(options, this);
    var croppingArea, result;

    this.url = function() {
      var params = '?image_locator=' + $input.attr('name');
      params += '&prefix=' + $input.attr('name');
      return options.upload.url + params;
    };

    this.rotate = function(rotationDegree) {
      $.ajax({
        type: 'POST',
        url: options.rotate.url,
        data: {
          rotationDegree: rotationDegree,
          filename: result.filename
        },
        success: function(response) {
          response.width = croppingArea.getImageProperties().height;
          response.height = croppingArea.getImageProperties().width;
          var img = modal.getCroppingImage().clone();
          croppingArea = iY.ImageProfileUploader.CroppingArea(options.cropping, response, img);
          modal.setCroppingArea(croppingArea);
        }
      });
    };

    this.rotateLeft = function() {
      this.rotate(-90);
    };

    this.rotateRight = function() {
      this.rotate(90);
    };

    this.crop = function() {
      $.ajax({
        type: 'POST',
        url: croppingArea.url,
        data: {
          croppingSelection: croppingArea.getSelection(),
          filename: result.filename
        },
        success: function(response) {
          that.find(options.thumb).attr('src', response);
          inputHidden.val(result.filename);
          $imageUploader.trigger('change:image');
          modal.hide();
        }
      });
    };

    this.done = function(data) {
      result = data.result;
      var img = modal.getCroppingImage().clone();
      croppingArea = iY.ImageProfileUploader.CroppingArea(options.cropping, data.result, img);
      modal.setCroppingArea(croppingArea);
      modal.show();
    };
  };

  iY = iY || {};
  iY.ImageProfileUploader = iY.ImageProfileUploader || {};
  iY.ImageProfileUploader.CroppingArea = function(cropping, image, img) {
    return new CroppingArea(cropping, image, img);
  };
  iY.ImageProfileUploader.CroppingModal = function(modal, uploader) {
    return new CroppingModal(modal, uploader);
  };
  iY.ImageProfileUploader.CroppingUploader = function($input, options) {
    return new CroppingUploader($input, options);
  };

  var defaultOptions = {
    upload: { url: '/image_manager/upload' },
    rotate: { url: '/image_manager/rotate' },
    cropping: {
      url: '/image_manager/crop',
      area: 'img.cropping-area'
    },
    modal: $('.image-uploader.modal'),
    thumb: 'img.image-uploader',
    keySupport: 'false'
  };

  $.fn.cropping = function(opt) {
    var options = $.extend(true, {}, defaultOptions, opt);
    var uploader = iY.ImageProfileUploader.CroppingUploader($(this), options);
    $(this).fileupload({
      dataType: 'json',
      url: uploader.url(),
      done: function(event, data) {
        uploader.done(data);
      }
    });
  };

}(jQuery));
