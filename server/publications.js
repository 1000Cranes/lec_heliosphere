Meteor.publish('packages', function() {
//   return Packages.find({}, {sort: {count:-1}, limit:25});
//   return Packages.find({'meteor.version.badgit': {$in: [null, false]}, 'meteor.version.git': {$exists: true}});
  return Packages.find({});
});

Meteor.publish('comments', function() {
  return Comments.find({});
});
Comments.permit('insert').ifLoggedIn().apply();

Meteor.publish('tags', function() {
  return Tags.find({});
});
Tags.permit('insert').ifLoggedIn().apply();
