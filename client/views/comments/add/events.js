Template.addComment.events({
  'click #addComment': function () {
    $('#addCommentForm').removeClass('hidden');
    $('#addComment').addClass('hidden');
  },
  'click #close-addComment-button': function () {
    $('#addCommentForm').addClass('hidden');
    $('#addComment').removeClass('hidden');
  }
});