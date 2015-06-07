Security.defineMethod("ifCanEditComment", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc.authorID || Comments.find({parentID: doc._id}).count() > 0;
  }
});

// You need to be logged in to add a comment.  You can only modify your own
//   comments if there are no replies.
Comments.permit('insert').ifLoggedIn().apply();
Comments.permit('update').ifCanEditComment().apply();
Comments.permit('remove').ifCanEditComment().apply();

// You need to be logged in to insert or remove a tag.
Tags.permit('insert').ifLoggedIn().apply();
Tags.permit('remove').ifLoggedIn().apply();

// You need to be logged in to add, update, or delete a tutorial.
Tutorials.permit('insert').ifLoggedIn().apply();

// You need to be logged in to vote on a tutorial.  You can only
//   vote once per tutorial.  