(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/surveys/survey_choice_form"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class='row margin-bottom-x'>\n  <div class='col-xs-10 col-sm-7 col-md-5'>\n    <input type='textbox' class='choice-body form-control' value='";
  if (helper = helpers.body) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.body); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'>\n  </div>\n  <div class='col-xs-1'>\n    <div class=\"flaticon stroke x-2 remove-choice\"></div>\n  </div>\n</div>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/surveys/survey_choice_form"];
}).call(this);
