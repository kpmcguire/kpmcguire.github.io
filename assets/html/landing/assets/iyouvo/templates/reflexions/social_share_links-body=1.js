(function() {
  this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
  this.HandlebarsTemplates["iyouvo/templates/reflexions/social_share_links"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\n  <h4 class=\"center gteal\">Thanks for writing a reflection about your experience. We're certain your words will move others to want to volunteer and do good things in their community.</h4>\n\n  <h4 class=\"center margin-top-x gblue\">Share on Twitter and Facebook to let your friends know about your experience.</h4>\n  <div class=\"social-container center margin-bottom-x margin-top-x\">\n    <div class=\"margin-bottom\">\n      <a href=\"https://twitter.com/share\" class=\"twitter-share-button\" title=\"Share to Twitter\" data-url=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-size=\"large\" data-lang=\"en\" data-text=\"I just wrote about my volunteer experience, &#34;";
  if (helper = helpers.share_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.share_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&#34;. Join GiveGab and see how you can make a difference!\" data-via=\"givegab\" data-count=\"none\" data-related=\"givegab\"></a>\n      <a href=\"#\" class=\"facebook-share-button social-share flaticon social facebook-1\" data-username=\"";
  if (helper = helpers.user) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-url=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-text=\"I just wrote about my volunteer experience, &#34;";
  if (helper = helpers.share_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.share_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&#34;. Join GiveGab and see how you can make a difference!\" data-title=\"Wrote a reflection called ";
  if (helper = helpers.share_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.share_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n        Share\n      </a>\n    </div>\n  </div>\n</div>\n";
  return buffer;
  });
  return this.HandlebarsTemplates["iyouvo/templates/reflexions/social_share_links"];
}).call(this);
