AutoForm.hooks({
  insertTutorialForm:{
    before:{
     insert:function(doc){
        doc.userID = Meteor.userId();
        doc.votes = 0;
        return doc;
       }
     }
  },
    insertRatingForm:{
    before:{
     insert:function(doc){
        doc.userID = Meteor.userId();
        return doc;
       }
     }
  },
    insertRootCommentForm:{
    before:{
     insert:function(doc){
        doc.authorID = Meteor.userId();
        doc.createDate = new Date();
       var user = Meteor.user();
        doc.gravatar = Gravatar.imageUrl(user.emails[0].address);
        doc.userName = user.profile.name; 
        return doc;
       }
     }
  },
  insertReplyCommentForm: {
    before:{
     insert:function(doc){
        doc.authorID = Meteor.userId();
        doc.createDate = new Date();
       var user = Meteor.user();
        doc.gravatar = Gravatar.imageUrl(user.emails[0].address);
        doc.userName = user.profile.name; 
        return doc;
       }
     }
  }
});