Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  },
  packages: function() {
    return Packages.find({}, {sort: {count:-1}, limit:25});
  }
});