Template.tagSection.events({
  'click #addTag': function () {
    $('#addTagForms').removeClass('hidden');
    $('#addTag').addClass('hidden');
  },
  'click #close-addTag-button': function () {
    $('#addTagForms').addClass('hidden');
    $('#addTag').removeClass('hidden');
  },
  'click .delete-tag-button': function () {
    Meteor.call('deleteTag', this._id);
  }
});