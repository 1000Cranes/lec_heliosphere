Template.tutorialSection.helpers({
  packageTutorials: function() {
    console.log(Tutorials.findTutorials(this._id));
    return Tutorials.findTutorials(this._id);
  },
  hasTutorials: function() {
    return Tutorials.hasTutorials(this._id);
  }
})