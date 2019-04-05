(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/user_activities/user_hours_row"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr>\n  <td style=\"vertical-align: middle; padding-left: 10px;\">\n    ";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n\n    <input type=\"hidden\"\n      name=\"users[][user_id]\"\n      value=\"";
  if (helper = helpers.user_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n      class=\"string required\"\n      required=\"required\" />\n\n    <input type=\"hidden\"\n      name=\"users[][loggable_id]\"\n      value=\"";
  if (helper = helpers.loggable_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.loggable_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n      class=\"user_loggable_id\"\n      class=\"string required\"\n      required=\"required\" />\n\n    <input type=\"hidden\"\n      name=\"users[][loggable_type]\"\n      value=\"";
  if (helper = helpers.loggable_type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.loggable_type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n      class=\"user_loggable_type\"\n      class=\"string required\"\n      required=\"required\" />\n\n    <input type=\"hidden\"\n      name=\"users[][comments]\"\n      value=\"";
  if (helper = helpers.comments) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.comments); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n      class=\"user_comments\" />\n\n    <input type=\"hidden\"\n      name=\"users[][service_learning]\"\n      value=\"";
  if (helper = helpers.service_learning) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.service_learning); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n      class=\"user_service_learning\" />\n\n    <input type=\"hidden\"\n      name=\"users[][pro_bono]\"\n      value=\"";
  if (helper = helpers.pro_bono) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.pro_bono); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n      class=\"user_pro_bono\" />\n  </td>\n\n  <td style=\"vertical-align: middle; padding-left: 10px;\" class=\"user_context\">";
  if (helper = helpers.user_context) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user_context); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n  <td style=\"text-align: center;vertical-align: middle;padding-top: 10px;\">\n    <div class=\"string input required\">\n      <input type=\"text\"\n        name=\"users[][hours]\"\n        value=\"";
  if (helper = helpers.hours) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.hours); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n        class=\"user_hours string required form-control\"\n        data-validate=\"true\"\n        required=\"required\" />\n    </div>\n  </td>\n  <td style=\"text-align: center;vertical-align: middle;padding-top: 10px;\">\n    <div class=\"string input required\">\n      <input type=\"text\"\n        name=\"users[][activity_date]\"\n        value=\"";
  if (helper = helpers.activity_date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.activity_date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n        class=\"user_date string required form-control\"\n        data-validate=\"true\"\n        required=\"required\" />\n    </div>\n  </td>\n  <td style=\"text-align: center;vertical-align: middle;padding-top: 10px;\">\n    <a href=\"#\" class=\"flaticon solid x-2 remove_user\" rel=\"tooltip\" title=\"Remove this user\"></a>\n  </td>\n</tr>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/user_activities/user_hours_row"];
}).call(this);
