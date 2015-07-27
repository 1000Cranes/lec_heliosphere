Meteor.startup(function () {
  var adminUser = Meteor.users.findOne({ 'profile.name': 'lec' });
  if(adminUser !== undefined){
    var adminUserID = adminUser._id;
    if(!Roles.userIsInRole(adminUserID, ['admin'], 'default-group')) {
      Roles.addUsersToRoles(adminUserID, ['admin'], 'default-group');
    }
  }

  console.log('Package count ...' + Packages.find({}).count());

  mPackagesUpdate();

  Meteor.setInterval(function() {
    mPackagesUpdate();
  }, 1000 * 10);
  
  Meteor.setInterval(function() {
    atmospheresUpdate(100);
  }, 1000 * 30 * 10); //was 60
});