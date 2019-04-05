(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/messages/reply"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<hr></hr>\n<div class=\"reply\">\n  <form id=\"reply_form\" method=\"POST\">\n    <input type=\"hidden\" name=\"to_user_id\" value=\"";
  if (helper = helpers.sender_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sender_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n    <input type=\"hidden\" name=\"subject\" value=\"re: ";
  if (helper = helpers.subject) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subject); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n    <textarea id=\"reply_body\" class=\"validate[required] form-control\" rows=\"3\" name=\"body\" placeholder=\"Reply to this message...\"></textarea>\n    <div class=\"clear\"></div>\n    <input id=\"reply_submit\" class=\"btn btn-primary\" name=\"commit\" type=\"submit\" value=\"Send\">\n  </form>\n</div>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/messages/reply"];
}).call(this);
