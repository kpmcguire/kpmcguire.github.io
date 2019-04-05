$(function() {
  iY.TopBeneficiariesView = iY.Reports.AbstractReportView.extend({
    initialize: function(opts) {
      this.options = opts;
      _.bindAll(this, "render", "update");
      var view = this;

      iY.ReportDefaults.setupAjax(this);
      iY.ReportDefaults.scopeToDates(this);
      iY.ReportDefaults.leaderboardCount(this);

      this.render();
    },

    render: function() {
      var view = this;
      var data_url = iY.analyticsBaseURL + '/groups/' +
        view.options.group_id + '/beneficiaries/';

      var ajax = $.ajax({
        url: data_url,
        data: {
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D'),
          'count': view.options.count
        }
      });

      var renderRanking = function(response) {
        $(view.el).prev('h3').remove();
        $(view.el).before('<h3><span style="color: #0FC2EC;">Top Organizations</span><span style="color: #715DA8;"> Receiving Hours</span></h3>');

        if(response.groups.length > 0) {
          $(view.el).find('tbody').empty();
          var high = response.groups[0].hours;
          _.each(response.groups, function(group, index) {
            $(view.el).find('tbody').append(iY.BeneficiaryRankingItem(index + 1, group, group.hours / high));

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

  iY.BeneficiaryRankingItem = function(index, group, meter) {
    var meterPct = parseInt(meter * 100, 10);
    return iY.template('reports/beneficiary_ranking_item', {
      numberClasses: (index == 1 ? 'top-hour' : 'normal-hour'),
      index: index,
      meterPct: iY.ReportDefaults.generateMeter(meterPct),
      group: group
    });
  };
});
