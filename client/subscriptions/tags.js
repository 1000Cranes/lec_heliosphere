Meteor.subscribe('tags');
// AutoForm.hooks({
//   insertTagForm:{
//     before:{
//      insert:function(doc){
//         doc.authorID = Meteor.userId();
//         doc.createDate = new Date();
//         return doc;
//        }
//      }
//   },
//   insertReplyCommentForm: {
//     before:{
//      insert:function(doc){
//         doc.authorID = Meteor.userId();
//         doc.createDate = new Date();
//         return doc;
//        }
//      }
//   }
// });