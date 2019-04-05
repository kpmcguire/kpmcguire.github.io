$(function() {

  iY = iY || {};
  iY.Reports = iY.Reports || {};
  iY.Reports.AbstractReportView = Backbone.View.extend({
    events: {
      'click .reload': 'reload'
    },
    reload: function() {
      this.render();
    }
  });

});
