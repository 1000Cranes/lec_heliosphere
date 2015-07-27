//Package model
PackageModel = function(doc) {
  _.extend(this, doc);
};

_.extend(PackageModel.prototype, {
  // returns an int with the number of comments on this package;
  fetchNumberOfComments: function(options) {
    return Comments.find({packageID: this._id}).count();
  },
  fetchNumberOfTutorials: function(options) {
    return Tutorials.find({packageID: this._id}).count();
  },
  fetchRating: function(options) {
    return Ratings.findHighestRating({packageID: this._id});
  },
  findTags: function(options) {
    return Tags.findTags(this._id);
  },
  fetchAtmosLink: function(){
   var link = this.name.replace(':','/');
   if(link.indexOf('/') > -1)
     return link;
   return 'meteor/' + link;
  },
  fetchPackageOwner: function() {
   var owner = this.name.substring(0, this.name.indexOf(':'));
   if(this.name.indexOf(':') > -1)
     return owner;
   return 'meteor';
  },
  fetchPackageNameWithoutOwner: function() {
   if(this.name.indexOf(':') > -1)
     return this.name.substring(this.name.indexOf(':')+1, this.name.length);
   return this.name;
  }
});

// Packages collection
Packages = new Mongo.Collection("packages", {
  transform: function(doc) {
    return new PackageModel(doc);
  }
});

// Packages = new Mongo.Collection("packages");
_.extend(Packages, {
  // returns an int with the number of packages for the package
  findNumberOfPackages: function(packageID) {
    return Packages.find({}).count();
  }
});
