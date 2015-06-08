Template.comments.events({
  'click .reply-button': function () {
    Session.set('isAddingAReply' + Meteor.userId() + this._id, true);
  },
  'click .submit-reply-button': function () {
    Session.set('isAddingAReply' + Meteor.userId() + this._id, false);
  },
  'click .close-reply-button': function () {
    Session.set('isAddingAReply' + Meteor.userId() + this._id, false);
  },
  'click .comment-modal': function () {
    Session.set('selectedCommentId',this._id);
  }
});