Template.tutorialSection.events({
  'click .tutorialModalTrigger': function () {
    Session.set('selectedTutorialId', this._id);
  },
  'click .addVote': function () {
    Meteor.call('addVoteTutorial', this._id);
  },
  'click .removeVote': function () {
    Meteor.call('removeVoteTutorial', this._id);
  }
});