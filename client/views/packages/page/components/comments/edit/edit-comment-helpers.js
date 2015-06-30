Template.editComment.helpers({
  selectedCommentDoc: function () {
    return Comments.findOne(Session.get("selectedCommentId"));
  }
});