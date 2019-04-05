(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/surveys/survey_open_ended_question_form"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked='checked'";
  }

  buffer += "<div class='row'>\n  <div class='col-md-12'>\n    <form class='survey-question-form'>\n      <h4> Enter your question below </h4>\n      <textarea name='body' class='form-control' placeholder='eg. What is your t-shirt size?'>";
  if (helper = helpers.body) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.body); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n      <div class=\"checkbox pull-left\">\n        <label>\n          <input type='checkbox' id='required' name='required' value='1' ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "> Required\n        </label>\n      </div>\n    </form>\n    <div class='btn-toolbar pull-right'>\n      <button class='btn cancel'>Cancel</button>\n      <button class='btn btn-primary save'>Save</button>\n    </div>\n  </div>\n</div>\n\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/surveys/survey_open_ended_question_form"];
}).call(this);
