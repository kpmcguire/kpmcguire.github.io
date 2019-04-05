iY.GroupActivitiesTableView = Backbone.View.extend({

  initialize: function(opts) {
    this.options = opts;
    _.bindAll(this, 'render', 'update');
    iY.ReportDefaults.scopeToDates(this);

    $.extend($.fn.dataTableExt.oStdClasses, {
      "sWrapper": "dataTables_wrapper form-inline"
    });

    this.options.hours_types = this.options.hours_types || 'direct';
    this.options.level = this.options.level || 'basic';

    this.render();
  },

  render: function() {
    var view = this;
    var dataURL = iY.analyticsBaseURL + '/groups/' + this.options.group_id + '/activities/';
    var isPremium = (this.options.level == 'premium');

    var table = $(view.el).dataTable();
    table.fnDestroy();

    table.dataTable({
      sDom: "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-4'i><'col-md-8'p>>",
      sPaginationType: "bootstrap",
      bProcessing: true,
      bServerSide: true,
      sAjaxSource: dataURL,
      aoColumns: [
        null, /* Date */
        null, /* Person */
        null, /* Org */
        null, /* Event */
        null, /* Hours */
        { "bVisible":    false }, /* SLH */
        { "bVisible":    false }, /* PROBONO */
        null /* Comments */
      ],
      aaSorting : [[0, 'desc']],
      fnServerData: function(url, data, callback, settings) {
        data.push(
          { "name": "hours_types", "value": view.options.hours_types },
          { "name": "start", "value": moment(view.options.start_date).format('YYYY-M-D') },
          { "name": "end",   "value": moment(view.options.end_date).format('YYYY-M-D') }
        );

        settings.jqXHR = $.ajax({
          url: url,
          data: data,
          success: callback,
          cache: false,
          crossDomain: true,
          dataType: 'json',
          headers: {
            'X-USER': view.options.user_id,
            'X-TOKEN': view.options.token
          }
        });
      },
      fnDrawCallback: function() {
        var popoverContent = "<img src='" + iY.infoPopoverURL + "'></img>";
        this.$('.comment-popover').html(popoverContent).popover({ placement: 'left' });
        this.$('.hours-popover').popover();
      },
      bFilter: isPremium,
      bSort: isPremium,
      oLanguage: {
        sLengthMenu: "Show _MENU_ volunteer activities",
        sProcessing: "Processing your request...",
        sSearch: "Search for volunteer activities: ",
        sInfo: "Showing _START_ to _END_ of _TOTAL_ volunteer activities.",
        sInfoEmpty: "",
        sInfoFiltered: "Searching from _MAX_ total activities.",
        sZeroRecords: "No volunteer activities match these criteria."
      }
    });

  },

  update: function(event, data) {
    this.options.start_date = moment(data.start_date).toDate();
    this.options.end_date = moment(data.end_date).toDate();
    this.render();
  }

});
