iY.sortable = function (el, options) {

  var $el = $(el);

  return {
    disable: function () {
      $el.sortable('disable');
    },

    enable: function () {
      $el.sortable('enable');
    },

    initialize: function () {
      $el.sortable(options);
    }
  };

};
