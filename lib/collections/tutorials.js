// Tutorial model
Tutorial = function(doc) {
  _.extend(this, doc);
};

_.extend(Tutorial.prototype, {
  // returns true if this tutorial can be edited by the current user
  canEdit: function() {
    var isAuthor = Meteor.userId() === this.userID;
    var user = Meteor.user();
    return isAuthor || (user !== null && user.roles !== undefined && user.roles['default-group'][0] == 'admin');  
  },
  // returns true if the current user can add a vote
  canVote: function() { 
    return !_.contains(this.voters, Meteor.userId()) &&  Meteor.userId();
  },
  // returns true if the current user can subtract a vote
  canRetractVote: function() { 
    return _.contains(this.voters, Meteor.userId()) &&  Meteor.userId();
  },
  // returns the domain name of the current tutorials
  fetchDomain: function() {
    var a = document.createElement('a');
    a.href = this.link;
    return a.hostname;
  },
  fetchCleanDescription: function() {
    return UniHTML.purify(this.description);
  },
  fetchCleanTitle: function() {
    return UniHTML.purify(this.title);
  },
  fetchUser: function() {
    return Meteor.users.findOne(this.userID);
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
    return Tutorials.find({packageID: packageID}, {sort: {votes:-1}}, options);
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
  voters: {
    type: [String],
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