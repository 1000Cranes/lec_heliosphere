Template.editTutorial.helpers({
  selectedTutorialDoc: function () {
    return Tutorials.findOne(Session.get("selectedTutorialId"));
  }
});