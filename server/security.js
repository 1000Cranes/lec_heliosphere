Security.defineMethod("ifCanEditComment", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc.authorID || Comments.find({parentID: doc._id}).count() > 0;
  }
});

Comments.permit('insert').ifLoggedIn().apply();
Comments.permit('update').ifCanEditComment().apply();
Comments.permit('remove').ifCanEditComment().apply();

Tags.permit('insert').ifLoggedIn().apply();

Tutorials.permit('insert').ifLoggedIn().apply();