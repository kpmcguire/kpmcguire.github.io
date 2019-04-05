(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/reports/members_stats"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"graph_section col-xs-5\" id=\"members_stats_graph\"></div>\n<div class=\"label_section col-xs-7\">\n  <div class=\"color-bar\" style=\"background-color: #8BC540 !important;\"></div>\n  <div class=\"active_members\" style=\"color: #8BC540 !important;\">\n    <div class=\"number\">";
  if (helper = helpers.active) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.active); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n    <div class=\"text\">active members</div>\n  </div>\n  <div class=\"color-bar\" style=\"background-color: #72983E !important;\"></div>\n    <div class=\"inactive_members\" style=\"color: #72983E !important;\">\n    <div class=\"number\">";
  if (helper = helpers.inactive) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.inactive); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n    <div class=\"text\">inactive members</div>\n  </div>\n  <div class=\"total_members\">\n    <icon class=\"sprite-chart-members\" style=\"margin-left: -15px !important;\"></icon>\n    <div class=\"number\" style=\"color: #C4DB79; margin-top: 3px;\">";
  if (helper = helpers.total) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n    <div class=\"text\" style=\"color: #72983E;\">total members</div>\n  </div>\n</div>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/reports/members_stats"];
}).call(this);
