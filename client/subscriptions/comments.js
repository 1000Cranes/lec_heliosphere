Meteor.subscribe('comments');
AutoForm.hooks({
  insertRootCommentForm:{
    before:{
     insert:function(doc){
        doc.authorID = Meteor.userId();
        doc.createDate = new Date();
       var user = Meteor.user();
        doc.gravatar = Gravatar.imageUrl(user.emails[0].address);
        if(user.userName === null || user.userName === undefined  || user.userName.match(/^ *$/) !== null){
          doc.userName = user.emails[0].address.substring(0,3); // No username so return first three characters
        } else {
          doc.userName = userName; 
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
        doc.gravatar = Gravatar.imageUrl(user.emails[0].address);
        if(user.userName === null || user.userName === undefined || user.userName.match(/^ *$/) !== null){
          doc.userName = user.emails[0].address.substring(0,3); // No username so return first three characters
        } else {
          doc.userName = userName; 
        }
        return doc;
       }
     }
  }
});