iY.GroupImpactView = Backbone.View.extend({

  initialize: function(opts) {
    this.options = opts;
    _.bindAll(this, 'render');
    iY.ReportDefaults.setupAjax(this);
    var view = this;

    this.options.hours_type = this.options.hours_type || 'indirect';

    this.members_data_url = iY.analyticsBaseURL + '/groups/' +
      this.options.group_id + '/members';
    this.hours_data_url = iY.analyticsBaseURL + '/groups/' +
      this.options.group_id + '/hours';

    this.ajaxOptions = {
      'hours_types': view.options.hours_types,
      'active': true
    };

    this.render();
  },

  render: function() {
    var view = this,
        $el = $(view.el);

    var membersAjax = $.ajax({
      url: view.members_data_url,
      data: view.ajaxOptions
    });

    var hoursAjax = $.ajax({
      url: view.hours_data_url,
      data: view.ajaxOptions
    });

    var renderValues = function(hours, members) {
      var totalHours = parseInt(hours[0].content.total, 10) || 0;
      var totalMembers = parseInt(members[0].total, 10);

      $el.html(iY.impactStatsTemplate(totalMembers, totalHours));
    }

    $el.empty().html($('.loading-indicator').html());
    $.when(hoursAjax, membersAjax).then(renderValues).fail(function() {
      iY.ReportDefaults.handleAjaxErrorFor(view);
    });
  }

});

iY.impactStatsTemplate = function(members, hours) {
  return iY.template('reports/impact_stats', {
    members: members,
    totalHours: (Math.round(10 * hours) / 10).toFixed(0),
    totalValue: Math.round(hours * iY.hourlyMonetaryValue)
  });
};
