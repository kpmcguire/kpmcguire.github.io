

//TODO: Check where is used the requests global variable. Get rid of it if were posible
/*global requests:true */

(function (iYouVo) {

  iYouVo.fb = {
    opengraphIconUrl: "http://localhost:3000/assets/givegab-opengraph-icon.png",
    scope: 'offline_access',

    capitalize: function (text) {
      return (text) ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
    },

    // login to facebook if currently not logged in
    // execute callback after successful login
    // or if user already logged in
    login: function (callback) {
      var self = this;
      FB.getLoginStatus(function(response) {
       // already logged in
        if (response.status && response.status === "connected" && callback) {
          callback();
        }
        else {
          FB.login(function(response) {
            if (response.status && response.status === "connected" && callback) {
              callback();
            }
          }, {perms: self.perms});
        }
      });
    },

    // invites people to Givegab
    invite: function () {
      var self = this;
      this.login(function () {
        requests = FB.ui({
            method: 'apprequests',
            title: 'Join GiveGab',
            data: iY.currentUser.id,
            message: iY.currentUser.first_name + " " + iY.currentUser.last_name + " has invited you to join GiveGab - The Volunteer's Social Network."
          },
          function (response) {
            if (response && response.request_ids && response.request_ids.length > 0) {
              var message = '<div class="notice">Invitations were sent to ' +
                response.request_ids.length + ' people</div>';

              if (!$('#header').find('.flash').length) {
                $('#header').append('<div class="flash"></div>');
              }

              $('#header').find('.flash').html(message);
            }
          }
        );
      });
    },

    initShareButton: function (el) {
      var text = el.data('text');
      var url = el.data('url');
      var userName = el.data('username');
      try {
        iYouVo.fb.shareToWall(text, url, userName);
      }
      catch (e) {
        // facebook failed...
      }
      return false;
    },

    // share comments to wall
    shareToWall: function (text, url, name) {
      var self = this;

      this.login(function() {
        var obj = {
          method: 'feed',
          link: url,
          picture: iYouVo.fb.opengraphIconUrl,
          name: name + ' has posted in GiveGab.',
          description: text
        };

        FB.ui(obj);
      });
    },

    // posts the GiveGab opp and logistics to the user's Facebook wall
    shareOppToWall: function (el) {
      var oppName = el.data('oppname'),
          oppType = el.data('opptype'),
          oppOrgName = el.data('opporgname'),
          oppDate = el.data('oppdate') || "",
          oppLocation = el.data('opplocation'),
          oppLink = el.data('opplink');

      var caption = "";

      this.login(function() {
        if (oppType == "program") {
          caption = iYouVo.fb.capitalize(oppLocation) || "";
        } else if (oppLocation !== null) {
          caption = oppDate + " - " + iYouVo.fb.capitalize(oppLocation);
        }

        var text = "Looking for a new volunteering opportunity? Check out "
        text += oppName + " with " + oppOrgName + " on GiveGab!";

        var obj = {
          method: 'feed',
          link: oppLink,
          picture: iYouVo.fb.opengraphIconUrl,
          name: oppName + ' for ' + oppOrgName,
          caption: caption,
          description: text
        };


        FB.ui(obj);
      });
    },

    shareGroupCallback: function (el) {
      var groupName = el.data('groupname'),
          groupType = el.data('grouptype'),
          groupLink = el.data('grouplink');

      iYouVo.fb.shareGroupToWall(groupName, groupType, groupLink);
    },

    shareOrganizationCallback: function (el) {
      var organizationName = el.data('organizationname'),
          organizationLink = el.data('organizationlink');

      iYouVo.fb.shareOrganizationToWall(organizationName, organizationLink);
    },

    shareHoursCallback: function(el) {
      var name = el.data('username'),
          url = el.data('url'),
          text = el.data('text');

      iYouVo.fb.shareHoursToWall(name, url, text);
    },

    shareHoursToWall: function(name, url, text) {

      iYouVo.fb.login(function() {
        var obj = {
          method: 'feed',
          link: url,
          picture: iYouVo.fb.opengraphIconUrl,
          description: text
        };

        FB.ui(obj);
      });
    },

    shareGoals: function(el) {
      var url = el.data('url');
      var text = el.data('text');

      iYouVo.fb.login(function() {
        var obj = {
          method: 'feed',
          link: url,
          picture: "http://localhost:3000/assets/goal-getter-badge.png",
          description: text
        };

        FB.ui(obj);
      });
    },

    shareParticipatingCallback: function(el) {
      var title = el.data('title'),
          url = el.data('url'),
          text = el.data('text');

      iYouVo.fb.shareParticipatingToWall(title, url, text);
    },

    shareParticipatingToWall: function(title, url, text) {
      var self = this;

      this.login(function() {
        var obj = {
          method: 'feed',
          link: url,
          name: title,
          picture: iYouVo.fb.opengraphIconUrl,
          description: text
        };

        FB.ui(obj);
      });
    },

    // posts the Givegab group and logistics to the user's Facebook wall
    shareGroupToWall: function(groupName, groupType, groupLink) {
      var self = this, caption = "";

      this.login(function() {
        if (groupType !== null) {
          caption = iYouVo.fb.capitalize(groupType) || "";
        }

        var obj = {
          method: 'feed',
          link: groupLink,
          picture: iYouVo.fb.opengraphIconUrl,
          name: groupName,
          caption: caption,
          description: "Check out this volunteer community!  Come join me and others - we'll have fun while volunteering for a good cause." +
              "  It's easy to do, click on the link above to go to GiveGab where you can sign up!"
        };

        FB.ui(obj);
      });
    },

    // posts the Givegab nonprofit and logistics to the user's Facebook wall
    shareOrganizationToWall: function(organizationName, organizationLink) {
      var self = this, caption = "";

      this.login(function() {
        var obj = {
          method: 'feed',
          link: organizationLink,
          picture: iYouVo.fb.opengraphIconUrl,
          name: organizationName,
          caption: caption,
          description: "Check out this Nonprofit!  Come join me and others - we'll have fun while volunteering for a good cause." +
              "  It's easy to do, click on the link above to go to GiveGab where you can sign up!"
        };

        FB.ui(obj);
      });
    }
  };

})(iYouVo);

