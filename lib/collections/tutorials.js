// Tutorial model
Tutorial = function(doc) {
  _.extend(this, doc);
};

_.extend(Tutorial.prototype, {
  // returns true if this tutorial can be edited by the current user
  canEdit: function() {
    var user = Meteor.user();
    var isAuthor = Meteor.userId() === this.userID;
    return isAuthor;  
  }
});

// Tutorials collection
Tutorials = new Mongo.Collection("tutorials", {
  transform: function(doc) {
    return new Tutorial(doc);
  }
});

_.extend(Tutorials, {
  // returns a tutorials cursor for all tutorials on this comment
  findTutorials: function(packageID, options) {
    return Tutorials.find({packageID: packageID}, options);
  },
  // returns a bool if this package has tutorials
  hasTutorials: function(packageID) {
    return Tutorials.find({packageID: packageID}).count() > 0;
  }
});

Tutorials.attachSchema(new SimpleSchema({
  userID: {
    type: String,
    autoform: {
      omit: true
    }
  },
  title: {
    type: String,
    label: "Title"
  },
  link: {
    type: String,
    label: "URL",
    regEx: SimpleSchema.RegEx.Url
  },
  description: {
    type: String,
    optional: true,
    label: "Description (optional)"
  },
  votes: {
    type: Number,
    autoform: {
      type: "hidden"
    },
    optional: true
  },
  parentID: {
    type: String,
    autoform: {
      type: "hidden"
    },
    optional: true
  },
  packageID: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
}));