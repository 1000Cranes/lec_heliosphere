Template.ratingSection.helpers({
  ratingCount: function() {
    var type = Ratings.findHighestRating(this._id);
    return Ratings.findNumberOfRatingsByType(this._id, type);
  },
  totalRatingCount: function() {
    return Ratings.findNumberOfRatings(this._id);
  },
  rating: function() {
    return Ratings.findHighestRating(this._id);
  },
//   canAdd: function() {
//     return Ratings.canAdd(this._id);
//   },
//   canEdit: function() {
//     return Ratings.canEdit(this._id);
//   },
  ratingColor: function() {
    var type = Ratings.findHighestRating(this._id);
    if(type === RatingTypes[0])
      return "green darken-1";
    if(type === RatingTypes[1])
      return "yellow darken-3";
    if(type === RatingTypes[2])
      return "red darken-1";
    return "grey lighten-2";
  },
  hasRatings: function() {
    return Ratings.hasRatings(this._id);
  }
});