Template.editTutorial.events({
  'click .delete-tutorial' : function () {
    Meteor.call('deleteTutorial', Session.get("selectedTutorialId"));
    $('#editTutorialModal').closeModal();
  }
});