Template.tagSection.helpers({
  packageTags: function() {
    return Tags.findTags(this._id);
  },
  hasTags: function() {
    return Tags.hasTags(this._id);
  }
})