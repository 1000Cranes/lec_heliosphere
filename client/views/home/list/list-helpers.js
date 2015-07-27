Template.packagesList.helpers({
  packages: function() {
    return Packages.find({}, {sort: {"score": -1}});
  }
});