Template.packagePage.helpers({
  rootComments: function() {
    return Comments.findRoots(this._id);
  },
  numberofComments: function() {
    return Comments.findNumberOfComments(this._id);
  },
  canEdit: function() {
    return Meteor.userId();
  },
  hasComments: function() {
    return Comments.findNumberOfComments(this._id) > 0;
  }
});