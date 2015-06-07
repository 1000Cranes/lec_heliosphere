Template.tutorialSection.events({
  'click #addTutorial': function () {
    $('#addTutorialForm').removeClass('hidden');
    $('#addTutorial').addClass('hidden');
  },
  'click #close-addTutorial-button': function () {
    $('#addTutorialForm').addClass('hidden');
    $('#addTutorial').removeClass('hidden');
  }
});