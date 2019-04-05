$(function() {
  iY.TopClassYearsView = iY.Reports.AbstractReportView.extend({
    initialize: function(opts) {
      this.options = opts;
      _.bindAll(this, "render", "update");

      iY.ReportDefaults.setupAjax(this);
      iY.ReportDefaults.scopeToDates(this);
      iY.ReportDefaults.leaderboardCount(this);

      this.render();
    },

    render: function() {
      var view = this;
      var data_url = iY.analyticsBaseURL + '/groups/' +
          view.options.group_id + '/members/top_classes/' + view.options.count;

      var ajax = $.ajax({
        url: data_url,
        data: {
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D')
        }
      });

      var renderRanking = function(response) {
        $(view.el).prev('h3').remove();
        $(view.el).before(iY.Reports.topClassYearsRankingHtml);

        if(response.hasOwnProperty('class_years') && response.class_years.length > 0) {
          $(view.el).find('tbody').empty();
          var high = response.class_years[0].hours;
          _.each(response.class_years, function(class_year, index) {
            $(view.el).find('tbody').append(iY.classYearRankingItem(index + 1, class_year, class_year.hours / high));
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

  iY.classYearRankingItem = function(index, class_year, meter) {
    var meterPct = parseInt(meter * 100, 10);
    var html = '<tr><td class="ranking-number"><div class="circle">' + index + '</div></td>';
    if(class_year.year !== null) {
      html += '<td class="class-year-ranking"><span style="color: #000;">Class of <%= year %></span></td>';
    } else {
      html += '<td class="class-year-ranking">All other students</td>';
    }
    html += iY.ReportDefaults.generateMeter(meterPct);
    html += '<td class="numbers"><strong class="' + (index == 1 ? ' top-hour' : ' normal-hour') + '" ><%= hours %></strong></td></tr>';
    return _.template(html, class_year);
  };
});
