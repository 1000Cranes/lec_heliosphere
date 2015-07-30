// Rating model
Rating = function(doc) {
  _.extend(this, doc);
};

_.extend(Rating.prototype, {

  // returns true if this rating has a vote by the same user on this package
  hasVote: function() {
    return Ratings.find({packageID: this.packageID, userID: Meteor.userId()}).count() > 1;
  },

  // returns true if this rating can be edited by the current user
  canEdit: function() {
    var user = Meteor.user();
    var isUser = Meteor.userId() === this.userID;
    return isUser && this.hasVote();
  },
  canAdd: function() {
    var user = Meteor.user();
    return Meteor.userId() && !this.hasVote();
  },
  fetchUser: function() {
    return Meteor.users.findOne(this.userID);
  }
});

// Ratings collection
Ratings = new Mongo.Collection("ratings", {
  transform: function(doc) {
    return new Rating(doc);
  }
});

_.extend(Ratings, {
  // returns a ratings cursor for all ratings on this package
  findRatings: function(packageID) {
    return Ratings.find({packageID: packageID});
  },
  // returns an int with the number of ratings of a type for this package
  findNumberOfRatingsByType: function(packageID, type) {
    return Ratings.find({packageID: packageID, rating: type}).count();
  },
  // returns an int with the number of ratings of a type for this package
  findNumberOfRatings: function(packageID) {
    return Ratings.find({packageID: packageID}).count();
  },
  hasRatings: function(packageID) {
    return Ratings.find({packageID: packageID}).count() > 0;
  },
  findHighestRating: function(packageID) {
    var ratingCount = -1;
    var rating = "";
    _.each(RatingTypes, function(type) {
      var count = Ratings.findNumberOfRatingsByType(packageID,type);
      if(count>ratingCount){
        rating = type;
        ratingCount = count;
      }     
    });
    return rating;
  },
  // returns a true if the current user can add a rating to the package
  //  the current user can only have one rating per package
  canAdd: function(packageID) {
    return Ratings.find({packageID: packageID, userID: Meteor.userId()}).count() === 0;
  },
  canEdit: function(packageID) {
    return Ratings.find({packageID: packageID, userID: Meteor.userId()}).count() === 1;
  }
});

// Made global so templates can access ... is there a better way?
RatingTypes = ["Beginner", "Intermediate", "Advanced"];

Ratings.attachSchema(new SimpleSchema({
  userID: {
    type: String,
    autoform: {
      omit: true
    }
  },
  rating: {
    type: String,
    label: "Rating",
    allowedValues: RatingTypes
  },
  packageID: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
}));