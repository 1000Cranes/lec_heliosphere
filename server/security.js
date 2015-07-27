Security.defineMethod("ifCanEditComment", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc, fields, modifier) {
    return userId !== doc.authorID || Comments.find({parentID: doc._id}).count() > 0;
  }
});

Security.defineMethod("ifCanEditTutorial", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc, fields, modifier) {
    return userId !== doc.userID;
  }
});

Security.defineMethod("ifCanVoteOnTutorial", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc, fields, modifier) {
    // Users can only vote once.
    return _.contains(doc.voters, userId);
  }
});

Security.defineMethod("ifCanAddRating", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc, fields, modifier) {
    // Users can only rate once.
    return Ratings.find({packageID: doc.packageID, userID: userId}).count() > 0;
  }
});

Security.defineMethod("ifCanEditRating", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc, fields, modifier) {
    // Users can only edit their vote.
    return doc.userID !== userId;
  }
});

// You need to be logged in to add a comment. 
Comments.permit('insert').ifLoggedIn().apply();
// You can only modify your own comments if there are no replies and only if they don't try to change 
//   the 'authorID', 'parentID', 'packageID', 'createDate', 'userName', 'gravatar' properties.
Comments.permit('update').ifLoggedIn().ifHasRole({role: 'admin', group: 'default-group'}).apply();
Comments.permit('update').ifLoggedIn().ifCanEditComment().exceptProps(['authorID', 'parentID', 'packageID', 'createDate', 'userName', 'gravatar']).apply();
// You need to be logged in and owner to remove a comment. 
Comments.permit('remove').ifLoggedIn().ifCanEditComment().apply();

// You need to be logged in to insert or remove a tag.
Tags.permit('insert').ifLoggedIn().apply();
Tags.permit('remove').ifLoggedIn().apply();

// You need to be logged in to add a tutorial.
Tutorials.permit('insert').ifLoggedIn().apply();
// You can only modify your own tutorials and only if you don't try to change
//    the 'userID', 'votes', 'voters', 'parentID', 'packageID' properties.
Tutorials.permit('update').ifLoggedIn().ifHasRole({role: 'admin', group: 'default-group'}).apply();
Tutorials.permit('update').ifLoggedIn().ifCanEditTutorial().exceptProps(['userID', 'votes', 'voters', 'parentID', 'packageID']).apply();
// OR you can modify (add a vote) to a tutorial if you are logged in and you
//  don't try to change the 'userID', 'title', 'link', 'description',  'voters', 'parentID', 'packageID' properties
Tutorials.permit('update').ifLoggedIn().ifCanVoteOnTutorial().exceptProps(['userID', 'title', 'link', 'description',  'voters', 'parentID', 'packageID']).apply();
// You need to be logged in and owner to remove a tutorial. 
Tutorials.permit('remove').ifLoggedIn().ifCanEditTutorial().apply();

// You need to be logged in to insert or remove a rating.
Ratings.permit('insert').ifLoggedIn().ifCanAddRating().apply();
// You can only modify your own rating and only if you don't try to change
//    the 'userID', 'packageID' properties.
Ratings.permit('update').ifLoggedIn().ifCanEditRating().exceptProps(['userID', 'packageID']).apply();
// You need to be logged in and owner to remove a rating.
Ratings.permit('remove').ifLoggedIn().ifCanEditRating().apply();
 