$(function() {
  iY.TopSubgroupsHoursView = iY.Reports.AbstractReportView.extend({
    initialize: function(opts) {
      this.options = opts;
      _.bindAll(this, "render", "update");
      var view = this;

      view.options.count      = view.options.count      || 5;
      view.options.start_date = view.options.start_date || moment().subtract('days', 30);
      view.options.end_date   = view.options.end_date   || moment();
      view.options.start_date = moment(view.options.start_date).toDate();
      view.options.end_date   = moment(view.options.end_date).toDate();

      iY.ReportDefaults.setupAjax(this);
      iY.ReportDefaults.scopeToDates(this);

      this.render();
    },

    render: function() {
      var view = this;
      var data_url = iY.analyticsBaseURL + '/groups/' +
        (view.options.parent_id || view.options.group_id) + '/subgroups/top_hours/' + view.options.count;

      var ajax = $.ajax({
        url: data_url,
        data: {
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D'),
          'parent_id': view.options.parent_id
        }
      });

      var renderRanking = function(response) {
        $(view.el).prev('h3').remove();
        $(view.el).before(iY.Reports.topSubgroupsHoursRankingHtml);

        if(response.hasOwnProperty('subgroups') && response.subgroups.length > 0) {
          $(view.el).find('tbody').empty();
          var high = response.subgroups[0].hours;
          _.each(response.subgroups, function(group, index) {
            $(view.el).find('tbody').append(iY.SubgroupRankingItem(index + 1, group, group.hours / high, view.options.group_id));

          }, view);
        } else {
          $(view.el).find('tbody').html('<tr><td style="padding: 100px; text-align: center;" colspan="5">There are no results to display right now.</td></tr>');
        }
        $(document).trigger('document:resize');
      };

      $(view.el).find('tbody').html($('.loading-indicator').html());
      $.when(ajax)
        .then(renderRanking)
        .fail(function(){
          iY.ReportDefaults.handleAjaxErrorFor(view);
        });
      return this;
    },

    update: function(event, data) {
      this.options.start_date = moment(data.start_date).toDate();
      this.options.end_date = moment(data.end_date).toDate();
      this.render();
    }
  });


  iY.SubgroupRankingItem = function(index, subgroup, meter, group_id) {
    var meterPct = parseInt(meter * 100, 10);

    return iY.template('reports/subgroup_ranking_item', {
      rankingClasses: 'circle'+ (group_id == subgroup.id ? " highlighted" : ""),
      ggreenClasses: (index == 1 ? 'top-member': 'normal-member'),
      numberClasses: (index == 1 ? 'top-hour' : 'normal-hour'),
      index: index,
      meterPct: iY.ReportDefaults.generateMeter(meterPct),
      subgroup: subgroup
    });
  };
});
