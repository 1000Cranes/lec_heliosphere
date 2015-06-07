Meteor.methods({
  deleteComment: function (commentID) {
    Comments.remove({_id: commentID});
    return true;
  }
});