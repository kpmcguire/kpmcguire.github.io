(function($) {
  $(document).bind("application:ready", function() {

    $('#new_message_button').bind('click', function() {
      $('#new_message_page').removeClass('hidden');
      $('#message_detail_page').addClass('hidden');
      return false;
    });

    $('#new_message').bind('submit', function() {
      var messageSubject = $('#message_subject').val();
      var messageBody = $('#message_body').val();
      var confirmMessageSuffix = ", are you sure you want to send this message?";
      var confirmMessage = null;

      if (!messageBody) {
        var errorMessage = "Message body was empty, please enter a message.";
        window.alert(errorMessage);
        return false;
      }

      if (!messageSubject) {
        confirmMessage = "Subject was empty" + confirmMessageSuffix;
      }

      var doSend = (confirmMessage ? window.confirm(confirmMessage) : true);
      if (doSend) {
        $('#message_submit').attr('disabled', 'disabled').val('Sending...');
      }
      return doSend;
    });

    $('#inbox_nav .btn').on('click', function() {
      $('#current_view').val($(this).data('filter'));
      iYouVo.refreshMessages();
    });

    $("#inbox_nav .btn").click(function(){
      $("#inbox_nav .btn").removeClass("active");
      $(this).addClass("active");
    });

    $('#delete_messages_btn').on('click', function() {
      var count = $('.message_checkbox input:checked').size();
      var msg = '';
      if (count > 0) {
        msg = 'Are you sure you want to delete ' + (count === 1 ? 'this message?' : 'these ' + count + ' messages?');
        if (window.confirm(msg)) {
          $(document).trigger('messages:bulkDelete');
          iYouVo.refreshMessages();
        }
      }
    });

    $('#restore_messages_btn').on('click', function() {
      var count = $('.message_checkbox input:checked').size();
      var msg = '';
      if (count > 0) {
        msg = 'Move ' + (count === 1 ? 'this message' : 'these ' + count + ' messages') + ' to your inbox?';
        if (window.confirm(msg)) {
          $(document).trigger('messages:bulkRestore');
        }
      }
    });

    iYouVo.messageSearch($('#message_search_term'));
  });

  iYouVo.refreshMessages = function() {
    var view = $('#current_view').val();
    var term = $('#message_search_term').val();
    $('#indicator').removeClass('hidden');
    $.getScript('/messages/search?filter=' + view + '&term=' + term);
  };

  iYouVo.messageSearch = function(element) {
    var search = $(element);

    if (search.length > 0) {
      var scheduleSearch = (function(){
        var timer = 0;
        return function(callback, ms){
          $('#message_detail_page').fadeOut();
          clearTimeout(timer);
          timer = setTimeout(callback, ms);
        };
      })();

      search.keyup(function() {
        scheduleSearch(iYouVo.refreshMessages, 300);
      });

      // prevent the enter key from submitting the form
      search.closest('form').submit(function(e) {
        e.preventDefault();
      });
    }
  };

})(jQuery);
