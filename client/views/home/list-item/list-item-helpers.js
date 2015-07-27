Template.packageItem.helpers({
  findTags: function () {
    return Tags.findTags(this._id);
  },
  ratingColor: function() {
    if(Ratings.find({packageID: this._id}).count() > 0){
      var groupedRatings = _.groupBy(_.pluck(Ratings.find({ packageID: this._id }).fetch(), 'rating'));
      var type = Ratings.findHighestRating(this._id);
      if(type === RatingTypes[0])
        return "green darken-1";
      if(type === RatingTypes[1])
        return "yellow darken-3";
      if(type === RatingTypes[2])
        return "red darken-1";
    }
    return "";
  },
});