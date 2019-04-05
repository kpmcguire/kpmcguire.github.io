// backbone customizations
if (Backbone) {
  // attach security token required by RAILS to each request.
  Backbone.oldSync = Backbone.sync;
  Backbone.sync = function (method, model, options) {
    var newOptions = _.extend({
      beforeSend: function (xhr) {
        var token = $('meta[name="csrf-token"]').attr('content');
        if (token) {
          xhr.setRequestHeader('X-CSRF-Token', token);
        }
      }
    }, options);
    Backbone.oldSync(method, model, newOptions);
  };
}
;
