// Tag model
Tag = function(doc) {
  _.extend(this, doc);
};

_.extend(Tag.prototype, {
  // returns true if this tag can be edited by the current user
  canEdit: function() {
    return Meteor.user() === null ? false : true;
  }
});

// Tags collection
Tags = new Mongo.Collection("tags", {
  transform: function(doc) {
    return new Tag(doc);
  }
});

_.extend(Tags, {
  // returns a tags cursor for all tags on this comment
  findTags: function(packageID, options) {
    return Tags.find({packageID: packageID}, options);
  },
  // returns a tags cursor for all unique tags (by name) in the collection
  findUniqueTags: function() {
    return Tags.distinct("name");
  },
  // returns an array of label/value pairs of unique tags (by name) in the collection
  fetchUniqueTagsLabelValuePair: function () {
    var labelValueMap = [];
    _.each(this.findUniqueTags(), function(val) {
      labelValueMap.push({label: val.name, value: val.name});
    });
    return labelValueMap;
  }
});

Tags.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  packageID: {
    type: String,
    autoform: {
      type: "select-multiple",
      options: function () {
        return Tags.fetchUniqueTagsLabelValuePair()
      }
    }
  }
}));