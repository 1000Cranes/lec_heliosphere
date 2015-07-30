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
       if(!user.profile){
         doc.gravatar = ""; 
         doc.userName = ""; 
       } else {
         doc.gravatar = Gravatar.imageUrl(user.profile.name); // ? since meteor accounts don't give email
         doc.userName = user.profile.name; 
       }

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
       if(!user.profile){
         doc.gravatar = ""; 
         doc.userName = ""; 
       } else {
         doc.gravatar = Gravatar.imageUrl(user.profile.name); // ? since meteor accounts don't give email
         doc.userName = user.profile.name; 
       }
        return doc;
       }
     }
  }
});