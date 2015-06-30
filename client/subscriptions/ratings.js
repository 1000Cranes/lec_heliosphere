Meteor.subscribe('ratings');
AutoForm.hooks({
  insertRatingForm:{
    before:{
     insert:function(doc){
        doc.userID = Meteor.userId();
        return doc;
       }
     }
  }
});