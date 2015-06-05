Template.packagePage.helpers({
  rootComments: function() {
    return Comments.findRoots(this._id);
  }
});