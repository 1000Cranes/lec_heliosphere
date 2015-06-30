Meteor.methods({
  deleteComment: function (commentID) {
    Comments.remove({_id: commentID});
    return true;
  },
  deleteTag: function (tagID) {
    Tags.remove({_id: tagID});
    return true;
  },
  deleteTutorial: function (tutorialID) {
    Tutorials.remove({_id: tutorialID});
    return true;
  },
  deleteRating: function (ratingID) {
    Ratings.remove({_id: ratingID});
    return true;
  },
  addVoteTutorial: function (tutorialID) {
    Tutorials.update(tutorialID, {$inc: {votes: 1}, $push: {voters: Meteor.userId()}});
    return true;
  },
  removeVoteTutorial: function (tutorialID) {
    Tutorials.update(tutorialID, {$inc: {votes: -1}, $pull: {voters: Meteor.userId()}});
    return true;
  }
});