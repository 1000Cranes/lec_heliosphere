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

  //search for all packages with the search term in the name or in the description
  if(search !== null && search !== undefined && search.trim() !== "")
  {
    search = search.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    console.log('search: ' + search);
    packageIDs = _.union(_.pluck(Packages.find({name: new RegExp(search,"i") }).fetch(), '_id'), _.pluck(Packages.find({description: new RegExp(search,"i") }).fetch(), '_id'));
    console.log('packageIds (after search term): ' + packageIDs);
  }
  if(ratings !== null && ratings !== undefined)
  {
    if(ratings.length > 0) { 
      
      var packageWithRating = _.groupBy(_.pluck(Ratings.find({ rating: { $in: ratings } }).fetch(), '_id')); // rating IDs
      if(packageIDs.length > 0) 
      {       
        var vaildPackagesWithRatings = _.union(packageIDs, _.pluck(Ratings.find({ _id: { $in: packageWithRating } }).fetch(), 'packageID')) ; //packageIDs with the right rating
        packagesWithRating = _.groupBy(_.pluck(Ratings.find({ packageID: { $in: vaildPackagesWithRatings } }).fetch(), '_id'));
      } 
      _.each(_.values(packageWithRating), function(p) {
        console.log('-------->');
        console.log({PackageID: p[0], Total: p.length});
        var groupedRatings = _.groupBy(_.pluck(Ratings.find({ _id: p[0] }).fetch(), 'rating'));
        var ratingCounts = [];
        _.each(_.values(groupedRatings), function(r) {
          console.log({Rating: r[0], Total: r.length});
          ratingCounts.push({Rating: r[0], Total: r.length});
        }); // end each
        if(_.contains(ratings, _.max(ratingCounts, function(rc){ return rc.Total; }).Rating))
        {
          console.log("Added package: " + Ratings.findOne({_id:p[0]}).packageID);
          packageIDs.push(Ratings.findOne({_id:p[0]}).packageID);
        }
      }); // end each
      console.log('--------=');
      console.log('packageIds (after rating): ' + packageIDs);
    }
  }
  
  if(tags !== null && tags !== undefined)
  {
    if( tags.length > 0) {
      console.log('tags: ' + tags);

      packageIDs = Tags.find({ name: { $in: tags } }).map(function (connector) {
          return connector.packageID;
      });
    }
  }
  

  if(limit !== null && limit !== undefined && limit > 0)
  {
      console.log('limit: ' + limit);

  }
  
  if(packageIDs.length > 0)
  {
    console.log('packageIds: ' + packageIDs);
    return Packages.find({ _id: {$in: packageIDs }}, {sort: {"score": -1}, limit:20});
  }
  console.log('return 20 packages');
  return Packages.find({}, {sort: {"score": -1}, limit:20});
  // Meteor.publish('users', function (tagIds) { // tags is an array of tag ids ['foo', 'baz']
//     var userIds = TagsUsers.find({ tagId: { $in: tagIds } }).map(function (connector) {
//         return connector.userId;
//     });

//     return Users.find({ _id: {$in: userIds } });
// });
});


//id
//name
//installs_per_year
//stars
//score
//git
//description

