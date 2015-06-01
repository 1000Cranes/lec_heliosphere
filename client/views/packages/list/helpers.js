Template.packagesList.helpers({
  packages: function() {
    //, {sort: {score:-1}}
    return Packages.find({}, {sort: {"score": -1}, limit:50});
    //return Packages.find({});
  }
});