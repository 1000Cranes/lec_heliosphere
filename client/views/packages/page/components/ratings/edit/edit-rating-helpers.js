Template.editRating.helpers({
  selectedRatingDoc: function () {
    return Ratings.findOne(Session.get("selectedRatingId"));
  },
    RatingSelectOptions: function() {
    return [
      {label: RatingTypes[0], value: RatingTypes[0]},
      {label: RatingTypes[1], value: RatingTypes[1]},
      {label: RatingTypes[2], value: RatingTypes[2]},
    ];
  }
});