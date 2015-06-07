Template.packagePage.helpers({
  rootComments: function() {
    return Comments.findRoots(this._id);
  },
  numberofComments: function() {
    return Comments.findNumberOfComments(this._id);
  }
});