$(function() {
  iY.HoursBreakdownView = iY.Reports.AbstractReportView.extend({
    initialize: function(opts) {
      this.options = opts;
      _.bindAll(this, "render", "update");

      iY.ReportDefaults.setupAjax(this);
      iY.ReportDefaults.scopeToDates(this);

      this.render();
    },

    render: function() {
      var view = this;
      var data_url = iY.analyticsBaseURL + '/groups/' +
        view.options.group_id + '/members/hours_breakdown';

      var ajax = $.ajax({
        url: data_url,
        data: {
          'start': moment(view.options.start_date).format('YYYY-M-D'),
          'end': moment(view.options.end_date).format('YYYY-M-D')
        }
      });

      var renderTypes = function(response) {
        $(view.el).prev('h3').remove();
        $(view.el).before(iY.Reports.hoursBreakdownTypeHtml);

        if(response.hasOwnProperty('membership_types') && response.membership_types.length > 0) {
          $(view.el).find('tbody').empty();
          var high = response.membership_types[0].hours;
          _.each(response.membership_types, function(membership_type, index) {
            $(view.el)
              .find('tbody')
              .append(iY.hoursBreakdownItem(index + 1, membership_type, membership_type.hours / high));
          }, view);
        } else {
          $(view.el).find('tbody').html('<tr><td style="padding: 100px; text-align: center;" colspan="5">There are no results to display right now.</td></tr>');
        }
        $(document).trigger('document:resize');
      };

      $(view.el).find('tbody').html($('.loading-indicator').html());
      $.when(ajax)
        .then(renderTypes)
        .fail(function() {
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

  iY.hoursBreakdownItem = function(index, membership_type, meter) {
    var meterPct = parseInt(meter * 100, 10);
    var html = '<tr><td class="ranking-number"><div class="circle">' + index + '</div></td>';
    html += '<td><%= membership_type %></td>';
    html += iY.ReportDefaults.generateMeter(meterPct);
    html += '<td class="numbers"><strong class="' + (index == 1 ? ' top-hour' : ' normal-hour') + '" ><%= hours %></strong></td></tr>';
    return _.template(html, membership_type);
  };
});
