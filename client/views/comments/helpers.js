Template.comments.helpers({
  isAddingAReply: function () {
    return Session.get('isAddingAReply' + Meteor.userId() + this._id);
  }
});