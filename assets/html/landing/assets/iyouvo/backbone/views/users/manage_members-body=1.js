iY.statusInfoPopover = function(el) {
  el.popover({
    title: "Status",
    content: iY.Members.statusInfoPopoverText
  });
};

iY.privacyInfoPopover = function(el) {
  el.popover({
    title: "Privacy",
    content: iY.Members.privacyInfoPopoverText
  });
};

iY.privacyGroupInfoPopover = function(el) {
  el.popover({
    title: "Privacy",
    content: iY.Members.privacyGroupInfoPopoverText
  });
};

iY.addMemberCallback = function(data) {
  $.event.trigger('flash:warning', { message: data.message, top: $(document).scrollTop() });

  $('body').trigger('ga:importSingleMember' );

  if (data.user_row !== null) {
    $(data.user_row).css('opacity', 0).prependTo('#manage_contacts_table tbody').animate({opacity: 1});
    $('#no_pending_invites').hide();

    $('#add_member_form input[type=text]').val(''); //clear add members form if successfully added
  }

  $('#existing_member_id').val('');
};
