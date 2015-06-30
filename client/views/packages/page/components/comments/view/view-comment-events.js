Template.comments.events({
  'click .comment-modal': function () {
    Session.set('selectedCommentId',this._id);
  }
});