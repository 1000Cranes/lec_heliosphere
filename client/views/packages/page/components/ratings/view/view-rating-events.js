Template.ratingSection.events({
  'click #editRatingModal': function () {
    var ratingID = Ratings.findOne({packageID: this._id, userID: Meteor.userId()})._id;
    Session.set('selectedRatingId', ratingID);
  }
});