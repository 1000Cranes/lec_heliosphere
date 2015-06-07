Meteor.subscribe('tutorials');
AutoForm.hooks({
  insertTutorialForm:{
    before:{
     insert:function(doc){
        doc.userID = Meteor.userId();
        doc.votes = 0;
        return doc;
       }
     }
  }
});