Template.packageItem.helpers({
  data: function() {
    return { 
      _id:this._id,
      stars: this.atmos[0].starCount,
      installs: this.atmos[0].installs_per_year,
      score: this.atmos[0].score,
      comments: 0, //Placeholder
      tutorials: 0, //Placeholder
      maxScore: 800,
      maxStars: 800,
      maxInstalls: 30000,
      maxComments: 10, //Placeholder
      maxTutorials: 10 //Placeholder
    };
  },
  id: function() { return this._id;},
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