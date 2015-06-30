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
  // returns a bool if this package has tags
  hasTags: function(packageID) {
    return Tags.find({packageID: packageID}).count() > 0;
  },
  // returns an array for all unique tags (by name) in the collection
  findUniqueTags: function() {
    var distinctSet = [];
    Tags.find({}).forEach( function(tag) {
      if($.inArray(tag.name, distinctSet) < 0)
      {
        distinctSet.push(tag.name);
      }
    });
    return distinctSet;
  },
  // returns an array of label/value pairs of unique tags (by name) in the collection
  fetchUniqueTagsLabelValuePair: function () {
    var labelValueMap = [];
    _.each(this.findUniqueTags(), function(val) {
      labelValueMap.push({label: val, value: val});
    });
    return labelValueMap;
  }
});

Tags.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Tag Name",
    unique: false,
    index: false,
    autoValue: function() {
      if (this.isSet && typeof this.value === "string") {
        return this.value.toLowerCase().trim();
      }
    },
    autoform: {
      type: "typeahead",
      options: function () {
        var tags = Tags.fetchUniqueTagsLabelValuePair();
        return tags === undefined || tags === null ? [] : tags;
      }
    }
  },
  packageID: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
}));