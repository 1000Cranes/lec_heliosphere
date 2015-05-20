Meteor.startup(function () {
  //Packages.remove({});
  console.log('Package count ...' + Packages.find({}).count());
  //mPackagesUpdate();
  //githubsUpdate(100); 
  atmospheresUpdate(25);
  //Packages.runCommand({renameCollection:"atmos[0].installs-per-year",to:"atmos[0].installs_per_year"});
//   Meteor.setInterval(function() {
//     mPackagesUpdate();
//   }, 1000 * 10);
//   Meteor.setInterval(function() {
//     githubsUpdate();
//   }, 1000 * 60 * 10);
});