Template.tutorialSection.events({
  'click #tutorialModalTrigger': function () {
    Session.set('selectedTutorialId',this._id);
  }
});