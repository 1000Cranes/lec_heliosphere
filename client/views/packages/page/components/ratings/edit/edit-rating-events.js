Template.editRating.events({
  'click .delete-rating' : function () {
    Meteor.call('deleteRating', Session.get("selectedRatingId"));
    $('#editRatingModal').closeModal();
  }
});