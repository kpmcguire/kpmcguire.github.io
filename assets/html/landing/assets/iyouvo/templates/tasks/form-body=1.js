(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/tasks/form"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form class=\"form-horizontal\">\n  <div class=\"form-group\">\n    <label class=\"control-label col-sm-2\" for=\"task_name\">Name</label>\n    <div class=\"col-sm-10\">\n      <input id=\"task_name\" name=\"name\" class=\"form-control\" type=\"text\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n      <div class=\"form-group\">\n        <label class=\"control-label col-sm-4\" for=\"task_start_time\">Start Date/Time</label>\n        <div class=\"col-sm-8\">\n          <input id=\"task_start_time\" class=\"form-control\" name=\"start_time\" type=\"text\" value=\"";
  if (helper = helpers.start_time) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.start_time); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" readonly=\"true\" />\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-6\">\n      <div class=\"form-group\">\n        <label class=\"control-label col-sm-4\" for=\"task_end_time\">End Date/Time</label>\n        <div class=\"col-sm-8\">\n          <input id=\"task_end_time\" class=\"form-control\" name=\"end_time\" type=\"text\" value=\"";
  if (helper = helpers.end_time) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.end_time); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" readonly=\"true\" />\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"form-group\">\n        <label class=\"control-label col-sm-6 hidden-xs hidden-lg\" for=\"task_volunteers_needed\"># of Vols.</label>\n        <label class=\"control-label col-sm-6 visible-xs visible-lg\" for=\"task_volunteers_needed\">Number of Volunteers Needed</label>\n        <div class=\"col-sm-6\">\n          <input id=\"task_volunteers_needed\" class=\"form-control\" name=\"volunteers_needed\" type=\"text\" value=\"";
  if (helper = helpers.volunteers_needed) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.volunteers_needed); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-8\">\n      <div class=\"form-group\">\n        <label class=\"control-label col-sm-3\" for=\"task_description\">Description</label>\n        <div class=\"col-sm-9\">\n          <textarea id=\"task_description\" class=\"form-control\" name=\"description\" rows=\"3\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-12 btn-toolbar\">\n      <div class=\"btn btn-primary save-task pull-right margin-bottom\">Save</div>\n      <div class=\"btn btn-delete cancel pull-right margin-bottom\">Cancel</div>\n    </div>\n  </div>\n</form>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/tasks/form"];
}).call(this);
