Template.replyComment.helpers({
    replyToCommentID: function () {
      return Session.get('selectedCommentId');
    },
    packageID: function() {
      var comment = Comments.findOne({_id: Session.get('selectedCommentId')});
      if(comment === null || comment === undefined)
        return "";
      return comment.packageID;
    }
});