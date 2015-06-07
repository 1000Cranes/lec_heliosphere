Meteor.methods({
  deleteComment: function (commentID) {
    Comments.remove({_id: commentID});
    return true;
  },
  deleteTag: function (tagID) {
    Tags.remove({_id: tagID});
    return true;
  }
});