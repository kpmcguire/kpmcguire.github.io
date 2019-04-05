/*jshint maxlen:1000 */


$(function() {
  iY = iY || {};

  iY.Email = iY.Email || {};
  iY.Email.inviteAddEmailHtml = '<label></label><input type="email" name="emails[]" placeholder="email address" class="form-control"/><div class="invite-email-error"></div>';

  iY.Members = iY.Members || {};
  iY.Members.statusInfoPopoverText = "The Status column lets you know if someone is an active member of GiveGab. If they are, then their profile photo and \"GiveGabber\" will appear in this column. If they are not, then \"reinvite\" appears in this column. Clicking \"reinvite\" will send out another invitation to join GiveGab.";
  iY.Members.privacyInfoPopoverText = "The Privacy setting allows you to hide certain members of your organization. All members of your organization will be able to view a member set to \"visible\". If you only want a member visible to administrators of your organization, you should choose \"hidden\". We suggest you keep it set to \"visible\", unless a member specifically asked for increased privacy.";
  iY.Members.privacyGroupInfoPopoverText = "The Privacy setting allows you to hide certain members of your group. All members of your group will be able to view a member set to \"visible\". If you only want a member visible to administrators of your group, you should choose \"hidden\". We suggest you keep it set to \"visible\", unless a member specifically asked for increased privacy.";

  iY.Monetary = iY.Monetary || {};
  iY.Monetary.recruitsInfoPopoverText = "These are the members you invited to the site and the impact they have had since joining. Inviting your friends to GiveGab will help build a larger community of volunteers, which will have a bigger impact on the world around you!";
  iY.Monetary.friendsInfoPopoverText = "This is the total of all your friends. Maybe you took part in these opportunities, maybe not. If not, we suggest you do. Volunteering with your friends can make the experience more fun and rewarding!";
  iY.Monetary.volunteersInfoPopoverText = "This is the total impact for all of the volunteers you manage. This includes your nonprofit and all of the other nonprofits your volunteers belong to. See what kind of impact the people you manage have on the world!";

  iY.GroupOverallStats = iY.GroupOverallStats || {};
  iY.GroupOverallStats.fullReportSectionTemplate = _.template('<div class="col-md-12"><div class="full_reports_section"><div class="text padding-left-x" style="color: #8BC540;"><%= active %></div><%= words %> logged hours to <div class="text" style="color: #00B1A4; margin-left: 3px;"><%= uniqueOpps %></div>.</div></div>');

  iY.RecAttrs = iY.RecAttrs || {};
  iY.RecAttrs.recAttrPopoverTitleTemplate = _.template('<div class="pull-left margin-right-x"><img src="<%= image_url %>" width="35" height="35" /></div><div style="margin-top: 10px;"><%= name %></div><div class="clear"></div>');
  iY.RecAttrs.touchDeviceMessageText = "Look at you with your fancy touch screen device, you're a tech wiz! You'll need to tap an icon twice in order to select it.";

  iY.Wizard = iY.Wizard || {};
  iY.Wizard.invalidEmailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

  iY.Reports = iY.Reports || {};
  iY.Reports.topSubgroupsHoursRankingHtml = '<h3><span style="color: #0FC2EC;">Top Groups</span><span style="color: #ccc; font-weight: 300;"> by </span><span style="color: #715DA8;">Volunteered Hours</span></h3>';
  iY.Reports.hoursBreakdownTypeHtml = '<h3><span style="color: #0FC2EC;">Top Groups</span><span style="color: #ccc; font-weight: 300;"> by </span><span style="color: #715DA8;">Volunteered Hours</span></h3>';
  iY.Reports.groupTotalHoursHtml = '<div style="padding: 100px 0; text-align: center;background-color: #fafafa;">There is not enough hours information to build a graph. Please try a larger date range, or log some hours for your members.</div>';
  iY.Reports.topVolunteersRankingHtml = '<h3 class="ggreen">Top Volunteers<span style="color: #ccc; font-weight: 300;"> by </span><span class="gpurple">Volunteered Hours</span></h3>';
  iY.Reports.topProgramsRankingHtml = '<h3><span style=\"color: #08cabb;\">Top Opportunities</span><span style=\"color: #ccc; font-weight: 300;\"> by </span><span style=\"color: #715DA8;\">Volunteered Hours</span></h3>';
  iY.Reports.topClassYearsRankingHtml = '<h3 class="ggreen">Top Classes<span style="color: #ccc; font-weight: 300;"> by </span><span class="gpurple">Volunteered Hours</span></h3>';

  iY.Reports.Defaults = iY.Reports.Defaults || {};
  iY.Reports.Defaults.ajaxErrorHandlerHtml = '<tr><td style="padding: 100px; text-align: center;" colspan="7">Looks like we\'re not able to provide you with this data right now. Please try again later, or let us know using the \'Support\' tab. <button class="as-link reload">Reload</button></td></tr>';
  iY.Reports.Defaults.chatAjaxErrorHandlerHtml = '<div>Looks like we\'re not able to provide you with this data right now. Please try again later, or let us know using the \'Support\' tab. <button class="as-link reload">Reload</button></div>';

});
