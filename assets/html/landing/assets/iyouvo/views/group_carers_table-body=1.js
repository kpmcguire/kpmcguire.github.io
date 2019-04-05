iY.initGroupCarersTable = function(dataUrl) {

  var table = $('#followers-table');

  var initTooltips = function() {
    table.find('[rel=tooltip]').tooltip();
  };

  // Enables sorting by first name, last name, and email,
  // which are currently the second, third, and fourth columns.
  // - Jesse 2014-07-24
  var sortableColumns = _.map([0, 1, 1, 1, 0, 0, 0, 0], function(sortable) {
    return sortable ? null : { bSortable: false };
  });

  table.dataTable({
    aoColumns: sortableColumns,
    bProcessing: true,
    bServerSide: true,
    fnDrawCallback: initTooltips,
    sAjaxSource: dataUrl,
    sPaginationType: 'bootstrap'
  });

};
