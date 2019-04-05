(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/tasks/assign"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form accept-charset=\"UTF-8\" action=\"/user_assignments\" class=\"simple_form user_assignment nomargin form-horizontal\" id=\"new_user_assignment\" method=\"post\">\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-4 col-lg-6\">\n      <h4>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n      <p class=\"ggray\">Assign Volunteers</p>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n        <input name=\"utf8\" type=\"hidden\" value=\"&#x2713;\" />\n        <div class=\"form-group\">\n          <label for=\"participant\" class=\"control-label col-sm-3\">Name</label>\n          <div class=\"col-sm-9\">\n            <input class=\"string autocomplete ui-autocomplete-input form-control\"\n              data-start=\"3\"\n              data-url=\"/users/search.json\"\n              id=\"participant\" name=\"participant\" placeholder= \"Full Name\"\n              type=\"text\" autocomplete=\"off\"\n              role=\"textbox\"\n              aria-autocomplete=\"list\"\n              aria-haspopup=\"true\" />\n            </div>\n        </div>\n        <input class=\"hidden\" id=\"user_assignment_user_id\" name=\"user_assignment[user_id]\" type=\"hidden\" value=\"\">\n        <input class=\"hidden\" id=\"user_assignment_task_id\" name=\"user_assignment[task_id]\" type=\"hidden\" value=\"";
  if (helper = helpers.task_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n    </div>\n    <div class=\"col-sm-6\">\n      <div class=\"form-group\">\n        <label for=\"user_email\" class=\"control-label col-sm-2\">Email</label>\n        <div class=\"col-sm-10\">\n          <input class=\"form-control\" id=\"user_email\" name = \"user[name]\" placeholder=\"Email\" type=\"text\">\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-6 col-md-8 col-lg-6 col-sm-offset-6 col-md-offset-4 col-lg-offset-6\">\n      <input id=\"user_assignment_button\" class=\"btn btn-join pull-right\" name=\"commit\" type=\"button\" value=\"Add Volunteer\">\n      <div id=\"user_assignment_close\" class=\"btn pull-right margin-right\">Close</div>\n    </div>\n  </div>\n</form>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/tasks/assign"];
}).call(this);
