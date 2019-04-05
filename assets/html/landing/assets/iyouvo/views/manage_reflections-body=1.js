iY.deleteReflection = function() {
  var view = $(this).closest('.reflection-container')
  var userConfirmation = window.confirm("Are you sure you want to delete your reflection?");

  if(userConfirmation){
    $.ajax({
      url: '/reflections/'+view.data('reflection-id'),
      type: 'DELETE',
      success: function() {
        $(document).trigger('flash:info', {
          message: 'Your reflection was successfully deleted.',
          top: $(document).scrollTop()
        });
        view.remove();
      }
    });
  }
}

iY.validateReflection = function() {
  var body = $.trim($(this).find('textarea').val());
  var title = $.trim($(this).find('input[name="reflection[title]"]').val());

  if (body === '' || title === '') {
    $(document).trigger('flash:warning', {
      message: "Please enter both a title and a reflection.",
      top: $(document).scrollTop()
    });
    return false;
  }
};
