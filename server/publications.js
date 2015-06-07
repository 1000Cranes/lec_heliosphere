Meteor.publish('packages', function() {
//   return Packages.find({}, {sort: {count:-1}, limit:25});
//   return Packages.find({'meteor.version.badgit': {$in: [null, false]}, 'meteor.version.git': {$exists: true}});
  return Packages.find({});
});

Meteor.publish('comments', function() {
  return Comments.find({});
});


Meteor.publish('tags', function() {
  return Tags.find({});
});


Meteor.publish('tutorials', function() {
  return Tutorials.find({});
});

