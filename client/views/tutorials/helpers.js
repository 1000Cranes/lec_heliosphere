Template.tutorialSection.helpers({
  packageTutorials: function() {
    return Tutorials.findTutorials(this._id);
  },
  hasTutorials: function() {
    return Tutorials.hasTutorials(this._id);
  }
})