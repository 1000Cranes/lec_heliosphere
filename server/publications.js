Meteor.publish('posts', function() {
  return Posts.find();
});
Meteor.publish('packages', function() {
//   return Packages.find({}, {sort: {count:-1}, limit:25});
  return Packages.find();
});