$(function() {

  iY = iY || {};

  iY.recruitsInfoPopover = function(el) {
    el.popover({
      title: "Invites",
      content: iY.Monetary.recruitsInfoPopoverText,
      trigger: "hover"
    });
  };

  iY.friendsInfoPopover = function(el) {
    el.popover({
      title: "Friends",
      content: iY.Monetary.friendsInfoPopoverText,
      trigger: "hover"
    });
  };

  iY.volunteersInfoPopover = function(el) {
    el.popover({
      title: "Volunteers",
      content: iY.Monetary.volunteersInfoPopoverText,
      trigger: "hover"
    });
  };

});
