(function ($) {
  iY = iY || {};
  iY.Members = iY.Members || {};

  var fnServerDataCallback = function(memberType){
    return function(url, data, callback, settings) {
      data.push({name: 'member_type', value: memberType});
      settings.jqXHR = $.ajax({
        url: url,
        data: data,
        success: callback,
        cache: false,
        dataType: 'json'
      });
    };
  };

  // Jasmine Test: spec/javascripts/iyouvo/backbone/views/manage_members/datatable_spec.js
  var dataTableOptions = {
    sPaginationType: "bootstrap",
    bProcessing: true,
    bServerSide: true,
    sDom: "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>"
  };

  /*
   WARNING: The following places in the codebase are tightly
   coupled by Connaissance of Position:
   1. ManageMembersDatatable#data
   2. ManageMembersDatatable#sort_column
   3. manage_members/_manage_members_datatable.html.slim
   4. getColumnSortingFor() in manage_members/datatable_view.js
   5. containerFixture in manage_members/datatable_spec.js
   6. spec/datatables/manage_members_datatable_spec.rb
   */
  var getColumnSortingFor = function(isSchool) {
    'use strict';
    var sortableConfig = [null, {"bSortable": false}, null, null, null];
    if (isSchool) {
      sortableConfig.push(null);
    }
    sortableConfig.push({"bSortable": false}); // Address column
    sortableConfig.push(null);
    sortableConfig.push({"bSortable": false}); // Actions column
    return sortableConfig;
  };

  iY.Members.DatatableView = Backbone.View.extend({

    events: {
      'change #member_type': 'userSelection',
      'change .select_privacy': 'selectPrivacy',
      'change .select_role': 'selectRole'
    },

    render: function(memberType){
      dataTableOptions.sAjaxSource = this.model.dataURL;
      dataTableOptions.aoColumns = getColumnSortingFor(this.model.isSchool);
      dataTableOptions.fnServerData = fnServerDataCallback(memberType);

      var table = iY.Members.DatatableDOMWrapper.createTable(this.$el);
      var tableWrapper = iY.Members.DatatableDOMWrapper.tableWrapper(this.$el);
      tableWrapper.empty().html(table);
      table.dataTable(dataTableOptions);
    },

    userSelection: function(event){
      var memberType = event.currentTarget.value;
      this.render(memberType);
    },

    selectPrivacy: function(event){
      var target = $(event.currentTarget);
      $.get($(target).data('url') + '?privacy=' + $(target).val(), function(data) {
        $(document).trigger('flash:info', { message: data, top: $(document).scrollTop() });
      });
    },

    selectRole: function(event){
      var target = $(event.currentTarget);
      $.get(target.data('url') + '?role=' + $(target).val(), function(data) {
        $(document).trigger('flash:info', { message: data, top: $(document).scrollTop() });
      });
    }
  });

  iY.Members.DatatableDOMWrapper = {
    createTable: function(container){
      return container.find('.template_wrapper .table').clone();
    },

    tableWrapper: function(container){
      return container.find('.manage_members_wrapper .table_wrapper');
    }
  };
})(jQuery);
