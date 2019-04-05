(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/reports/impact_stats"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"total_members\" style=\"display: block\">\n  <icon class=\"sprite-chart-members\"></icon>\n  <div class=\"number\">";
  if (helper = helpers.members) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.members); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n  <div class=\"text\"> total members</div>\n</div>\n<div class=\"total_hours\" style=\"display: block;\">\n  <icon class=\"sprite-chart-hours\"></icon>\n  <div class=\"number\">";
  if (helper = helpers.totalHours) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.totalHours); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n  <div class=\"text\"> total hours</div>\n</div>\n<div class=\"total_value\" style=\"display: block\">\n  <icon class=\"sprite-chart-value\"></icon>\n  <div class=\"number\">$";
  if (helper = helpers.totalValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.totalValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n  <div class=\"text\"> value of total hours</div>\n</div>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/reports/impact_stats"];
}).call(this);
