iY.flashMessage = function(type, message, opts) {
  var defaultOpts = {
    message: message,
    top: $(document).scrollTop()
  };
  var mergedOpts = _.extend(defaultOpts, opts);
  $.event.trigger('flash:' + type, mergedOpts);
};

iY.flashError = function(msg, opts) { iY.flashMessage('warning', msg, opts); };
iY.flashNotice = function(msg, opts) { iY.flashMessage('info', msg, opts); };
