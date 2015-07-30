Meteor.methods({
  deleteComment: function (commentID) {
    // to delete a comment you need to be the author or be the admin
    var user = Meteor.user();
    if (!user) 
      return false;
    var comment = Comments.findOne({_id: commentID});
    if(!comment)
      return false;
    var isAuthor = Meteor.userId() === comment.fetchAuthor()._id
    var isAdmin = user.roles !== undefined && user.roles['default-group'][0] == 'admin';
    var isParentComment = comment.hasReplies();
    
    if((isAuthor || isAdmin) && !isParentComment) {
      Comments.remove({_id: commentID});
      return true;
    }
    return false;
  },
  deleteTag: function (tagID) {
    // to delete a tag you need to be a user
    var user = Meteor.user();
    if (!user) 
      return false;
    var tag = Tags.findOne({_id: tagID});
    if(!tag)
      return false;
    Tags.remove({_id: tagID});
    return true;
  },
  deleteTutorial: function (tutorialID) {
    // to delete a tutorial you need to be the author or be the admin
    var user = Meteor.user();
    if (!user) 
      return false;
    var tutorial = Tutorials.findOne({_id: tutorialID});
    if(!tutorial)
      return false;
    var isUser = Meteor.userId() === tutorial.fetchUser()._id
    var isAdmin = user.roles !== undefined && user.roles['default-group'][0] == 'admin';
    
    if((isUser || isAdmin)) {
      Tutorials.remove({_id: tutorialID});
      return true;
    }
    return false;
  },
  deleteRating: function (ratingID) {
    // to delete a rating you must
    var user = Meteor.user();
    if (!user) 
      return false;
    
    var rating = Ratings.findOne({_id: ratingID});
    if(!rating)
      return false;
    var isUser = Meteor.userId() === rating.fetchUser()._id

    if((isUser)) {
      Ratings.remove({_id: ratingID});
      return true;
    }
    return false;
  },
  addVoteTutorial: function (tutorialID) {
    // you need to be a user to add a vote to a tutorial
    // you should only be able to vote once.
    var user = Meteor.user();
    if (!user) 
      return false;
    var tutorial = Tutorials.findOne({_id: tutorialID});
    if(!tutorial)
      return false;
    var votedTutorial = Tutorials.findOne({_id: tutorialID})
    if(votedTutorial.voters !== undefined && !_.contains(votedTutorial.voters, Meteor.userId()))
     return false;
    Tutorials.update(tutorialID, {$inc: {votes: 1}, $push: {voters: Meteor.userId()}, $pull: {downVoters: Meteor.userId()}});
    return true;
  },
  removeVoteTutorial: function (tutorialID) {
    // you need to be a user to remove a vote to a tutorial
    // you should only be able to remove your vote once.
    var user = Meteor.user();
    if (!user) 
      return false;
    var tutorial = Tutorials.findOne({_id: tutorialID});
    if(!tutorial)
      return false;
    var downVotedTutorial = Tutorials.findOne({_id: tutorialID})
    if(downVotedTutorial.downVoters !== undefined && !_.contains(downVotedTutorial.downVoters, Meteor.userId()))
     return false;
    Tutorials.update(tutorialID, {$inc: {votes: -1}, $pull: {voters: Meteor.userId()}, $push: {downVoters: Meteor.userId()}});
    return true;
  },
  getMaxInstalls: function() {
    return Packages.findOne({},{sort: {installs_per_year: -1}}).installs_per_year;
  }
});