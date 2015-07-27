Template.editComment.events({
  'click .close-edit-comment-modal': function () {
    $('#editCommentModal').closeModal();
  },
  'click .delete-comment' : function () {
    Meteor.call('deleteComment', Session.get("selectedCommentId"));
    $('#editCommentModal').closeModal();
  }
});