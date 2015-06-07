Template.tagSection.helpers({
  packageTags: function() {
    console.log(Tags.findTags(this._id));
    return Tags.findTags(this._id);
  },
  hasTags: function() {
    return Tags.hasTags(this._id);
  }
})