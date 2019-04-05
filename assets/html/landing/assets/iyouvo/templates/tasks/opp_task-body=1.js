(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/tasks/opp_task"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n              <a href=\"/messages/new?to_task_id=";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Email Volunteers ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.participants)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</a>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n              <a href=\"#\" class=\"disabled\">Email Volunteers (0)</a>\n            ";
  }

  buffer += "<div class=\"row\">\n    <div class=\"col-xs-7\">\n        <h4>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n        <p class=\"ggray\">Volunteers ( "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.participants)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " / ";
  if (helper = helpers.volunteers_needed) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.volunteers_needed); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " )</p>\n    </div>\n    <div class=\"col-xs-5\">\n        <div class=\"pull-right\">\n          <button role=\"button\" data-toggle=\"dropdown\" type=\"button\" data-target=\"#\" class=\"btn dropdown-toggle\">\n            Actions <b class=\"caret\"></b>\n          </button>\n          <ul class=\"dropdown-menu\" role=\"menu\">\n            <li>\n                <a class=\"volunteers\">Assign Volunteers</a>\n            </li>\n            <li>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.participants), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </li>\n            <li>\n                <a class=\"edit\">Edit</a>\n            </li>\n            <li>\n                <a class=\"copy\">Copy</a>\n            </li>\n            <li>\n                <a class=\"delete\">Delete</a>\n            </li>\n          </ul>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/tasks/opp_task"];
}).call(this);
