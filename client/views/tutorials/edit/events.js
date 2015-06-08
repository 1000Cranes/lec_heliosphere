Template.editTutorial.events({
  'click .close-edit-tutorial-modal': function () {
    $('#editTutorialModal').closeModal();
  },
  'click .delete-tutorial' : function () {
    Meteor.call('deleteTutorial', Session.get("selectedTutorialId"));
    $('#editTutorialModal').closeModal();
  }
});