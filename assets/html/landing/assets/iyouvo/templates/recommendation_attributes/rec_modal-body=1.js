(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/recommendation_attributes/rec_modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-dialog\">\n  <div class=\"modal-content\">\n    <div class=\"modal-body\">\n      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n      <img src=\"";
  if (helper = helpers.picture_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picture_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"margin\"/>\n      <h4 class=\"center margin\"> ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " </h4>\n      <p class=\"padding\"> ";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " </p>\n      <h4> Rank </h4>\n      <div class=\"center\">\n        <button class=\"rank-button btn margin-small\" data-rank=\"1\">1</button>\n        <button class=\"rank-button btn margin-small\" data-rank=\"2\">2</button>\n        <button class=\"rank-button btn margin-small\" data-rank=\"3\">3</button>\n        <br>\n      </div>\n      <button type=\"button\" class=\"deselect btn margin-top-x hidden\" aria-hidden=\"true\">Deselect</button>\n    </div>\n  </div>\n</div>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/recommendation_attributes/rec_modal"];
}).call(this);
