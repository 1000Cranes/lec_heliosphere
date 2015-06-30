Meteor.startup(function () {
  //Packages.remove({});
  //Tags.remove({});
//   Comments.remove({});
  console.log('Package count ...' + Packages.find({}).count());
  //mPackagesUpdate();
  //atmospheresUpdate();
  //githubsUpdate(100); 
//   Meteor.setInterval(function() {
//     mPackagesUpdate();
//   }, 1000 * 10);
//   Meteor.setInterval(function() {
//     atmospheresUpdate(100);
//   }, 1000 * 60 * 10);
});