if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}

Meteor.startup(function () {
//   mPackagesUpdate();
//   githubsUpdate();
//   Meteor.setInterval(function() {
//     mPackagesUpdate();
//   }, 1000 * 10);
//   Meteor.setInterval(function() {
//     githubsUpdate();
//   }, 1000 * 60 * 10);
});