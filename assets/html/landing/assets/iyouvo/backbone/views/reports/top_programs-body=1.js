$(function() {
  iY.TopProgramsView = iY.Reports.AbstractReportView.extend({
    initialize: function(opts) {
      this.options = opts;
      _.bindAll(this, "render", "update", "setDataURL");

      iY.ReportDefaults.setupAjax(this);
      iY.ReportDefaults.scopeToDates(this);
      iY.ReportDefaults.leaderboardCount(this);

      this.setDataURL();
      this.render();
    },

    setDataURL: function() {
      this.data_url = iY.analyticsBaseURL + '/groups/' +
        this.options.group_id + '/programs/top_hours/' + this.options.count;
    },

    render: function() {
      var view = this;

      var ajax = $.ajax({
        url: this.data_url,
        data: {
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D')
        }
      });

      var renderRanking = function(response) {
        $(view.el).prev('h3').remove();
        $(view.el).before(iY.Reports.topProgramsRankingHtml);

        if(response.hasOwnProperty('opps') && response.opps.length > 0) {
          $(view.el).find('tbody').empty();
          var high = response.opps[0].hours;
          _.each(response.opps, function(program, index) {
            $(view.el).append(iY.ProgramRankingItem(index + 1, program, program.hours / high));
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

  iY.TopBeneficiaryProgramsView = iY.TopProgramsView.extend({
    setDataURL: function() {
      this.data_url = iY.analyticsBaseURL + '/groups/' +
        this.options.group_id + '/beneficiaries/programs/' + this.options.count;
    }
  });

  iY.ProgramRankingItem = function(index, program, meter) {
    var meterPct = parseInt(meter * 100, 10);
    var group = '';
    if(typeof program.group !== 'undefined') {
      group = ' at ' + program.group;
    }

    return iY.template('reports/program_ranking_item', {
      numberClasses: (index == 1 ? 'top-hour' : 'normal-hour'),
      index: index,
      meterPct: iY.ReportDefaults.generateMeter(meterPct),
      group: group,
      program: program
    });
  };
});
