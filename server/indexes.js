Meteor.startup(function () {
  Posts._ensureIndex({"ID": 1, 'date': 1});
});
