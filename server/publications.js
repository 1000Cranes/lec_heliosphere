Meteor.publish('roles', function (){ 
  return Meteor.roles.find({})
})

Meteor.publish('comments', function() {
  return Comments.find({});
});

Meteor.publish('tags', function() {
  return Tags.find({});
});


Meteor.publish('tutorials', function() {
  return Tutorials.find({});
});


Meteor.publish('ratings', function() {
  return Ratings.find({});
});

Meteor.publish('packages', function(tags, ratings, search, limit) {
  var packageIDs = [];
      console.log('--------------------------------------------');
  
  if(ratings !== null && ratings !== undefined)
  {
    if(ratings.length > 0) { 
      console.log('-------->');
      var ratingsFromPackages = _.groupBy(_.pluck(Ratings.find({ rating: { $in: ratings } }).fetch(), '_id')); // rating IDs
      var potentialPackages = _.groupBy(_.pluck(Ratings.find({ rating: { $in: ratings  } }).fetch(), 'packageID')); // package IDs

      _.each(_.values(potentialPackages), function(pid) {
        console.log('-------->');
        console.log({PackageID: pid[0]});
        var ratingCount = -1;
        var rating = "";
        _.each(["Beginner","Intermediate","Advanced"], function(type) {
          var count = Ratings.findNumberOfRatingsByType(pid[0],type);
          if(count>ratingCount){
            rating = type;
            ratingCount = count;
          }     
        });
        if(_.contains(ratings, rating))
        {
          console.log("Added package: " + pid[0]);
          packageIDs.push(pid[0]);
        }
        console.log(rating);
      });
      console.log('===========');
      console.log('packageIds (after rating): ' + packageIDs);
    }
  }
  
  if(tags !== null && tags !== undefined)
  {
    if( tags.length > 0) {
      console.log('tags: ' + tags);

      var potentialPackages = Tags.find({ name: { $in: tags } }).map(function (connector) {
          return connector.packageID;
      }); // packages with correct tags
      console.log('packageIDs : ' + packageIDs );
      console.log('potentialPackages : ' + potentialPackages );
      if(packageIDs.length > 0 && potentialPackages.length > 0){
      } else {
        if(potentialPackages.length > 0){
          packageIDs = potentialPackages;
        }
      }
      
    }
  }
  
  //search for all packages with the search term in the name or in the description
  if(search !== null && search !== undefined && search.trim() !== "")
  {
    search = search.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    console.log('search: ' + search);
    if(packageIDs.length > 0){
      var newPackageIDs = [];
      // we only need to search the packages that made it this far.
      _.each(packageIDs, function(pid) {
        var matchName = Packages.findOne({_id: pid, name: new RegExp(search,"i") });
        var matchDescription = Packages.findOne({_id: pid, description: new RegExp(search,"i") });
        if(matchName !== undefined){
          newPackageIDs.push(matchName._id);
        } else {
          if(matchDescription !== undefined){
            newPackageIDs.push(matchDescription._id);
          }
        }
      });
      packageIDs = newPackageIDs;
    } else {
      packageIDs = _.union(_.pluck(Packages.find({name: new RegExp(search,"i") }).fetch(), '_id'), _.pluck(Packages.find({description: new RegExp(search,"i") }).fetch(), '_id'));
    }
    console.log('packageIds (after search term): ' + packageIDs);
  }
  
  // refactor this section to not hardcode limits - was
  //  getting strange error on Match error: Failed Match.OneOf or Match.Optional validation
  //  when just passing in limit
  if(packageIDs.length > 0) {
    if(limit == "40")
      return Packages.find({ _id: {$in: packageIDs },score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:40});
    if(limit == "60")
      return Packages.find({ _id: {$in: packageIDs },score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:60});
    if(limit == "100")
      return Packages.find({ _id: {$in: packageIDs },score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:100});
    if(limit === null || limit === undefined || parseInt(limit) === NaN)
      return Packages.find({ _id: {$in: packageIDs },score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:20});
    return Packages.find({ _id: {$in: packageIDs },score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:parseInt(limit)});
  } 
  else 
  {
    if(limit == "40")
      return Packages.find({score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:40});
    if(limit == "60")
      return Packages.find({score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:60});
    if(limit == "100")
      return Packages.find({score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:100});
    if(limit === null || limit === undefined || parseInt(limit) === NaN)
      return Packages.find({score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:20});
    return Packages.find({score: { $exists: true}, git: { $exists: true}}, {sort: {"score": -1}, limit:parseInt(limit)});
  }
});


//id
//name
//installs_per_year
//stars
//score
//git
//description

