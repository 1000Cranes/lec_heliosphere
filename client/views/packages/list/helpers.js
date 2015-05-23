Template.packagesList.helpers({
  packages: function() {
    //, {sort: {score:-1}}
    return Packages.find({}, {sort: {"atmos.0.score": -1}, limit:10});
  }
});