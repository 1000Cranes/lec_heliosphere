// Comment model
Comment = function(doc) {
  _.extend(this, doc);
};

_.extend(Comment.prototype, {
  // returns a user document for this comment's author
  fetchAuthor: function() {
    return Meteor.users.findOne(this.authorID);
  },

  // returns a comments cursor for all replies to this comment
  findReplies: function(options) {
    return Comments.find({parentID: this._id}, options);
  },

  // returns true if this comment has replies
  hasReplies: function() {
    return this.findReplies().count() > 0;
  },

  // returns true if this comment can be edited by the current user
  canEdit: function() {
    var user = Meteor.user();
    var isAuthor = Meteor.userId() === this.authorID;
    
    return (isAuthor && !this.hasReplies()) || (user !== null && user.roles !== undefined && user.roles['default-group'][0] == 'admin');
  },
  
  // returns true if this comment can be edited by the current user
  canAddReply: function() {
    var user = Meteor.user();
    return user === null ? false : true;
  },
  // get the relative time the comment was made
  fetchRelativeTime: function() {
    return moment(moment(this.createDate).format('MMMM Do YYYY, h:mm:ss a'), "MMMM Do YYYY, h:mm:ss a").fromNow();
  },
  // returns the comments text clean for outputting
  fetchCleanText: function() {
    return UniHTML.purify(this.text);
  }
});

// Comments collection
Comments = new Mongo.Collection("comments", {
  transform: function(doc) {
    return new Comment(doc);
  }
});

_.extend(Comments, {
  // returns a comments cursor for all comments without a parentId
  findRoots: function(packageID, options) {
    return Comments.find({parentID: {$exists: false}, packageID: packageID}, options);
  },
  // returns an int with the number of comments for the package
  findNumberOfComments: function(packageID) {
    return Comments.find({packageID: packageID}).count();
  }
});

// Schema for the Comments collection
Comments.attachSchema(new SimpleSchema({
  authorID: {
    type: String,
    autoform: {
      omit: true
    }
  },
  text: {
    type: String,
    label: "Comment"
  },
  userName: {
    type: String,
    autoform: {
      type: "hidden"
    },
    optional: true
  },
  gravatar: {
    type: String,
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
  },
  createDate: {
    type: Date,
    autoform: {
      omit: true
    }
  }
}));