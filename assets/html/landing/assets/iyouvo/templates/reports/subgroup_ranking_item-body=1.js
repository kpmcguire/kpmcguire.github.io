(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/reports/subgroup_ranking_item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr>\n  <td class=\"ranking-number\">\n    <div class=\"";
  if (helper = helpers.rankingClasses) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rankingClasses); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.index) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.index); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n  </td>\n  <td class=\"ranking-name\">\n    <a style=\"color: #000;\" href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subgroup)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subgroup)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n  </td>\n  ";
  if (helper = helpers.meterPct) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.meterPct); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <td class=\"numbers ggreen\"><strong class=\"";
  if (helper = helpers.ggreenClasses) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ggreenClasses); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subgroup)),stack1 == null || stack1 === false ? stack1 : stack1.members)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></td>\n  <td class=\"numbers\">\n    <strong class=\"";
  if (helper = helpers.numberClasses) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.numberClasses); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subgroup)),stack1 == null || stack1 === false ? stack1 : stack1.hours)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n  </td>\n</tr>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/reports/subgroup_ranking_item"];
}).call(this);
