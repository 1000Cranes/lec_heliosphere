AutoForm.hooks({
  insertRatingForm: {
    after:{
     insert:function(error, result){
        $('#addRatingModel').closeModal();
       }
     }
  }
});

AutoForm.hooks({
  insertTagForm: {
    after:{
     insert:function(error, result){
        $('#addTagModel').closeModal();
       }
     }
  }
});

AutoForm.hooks({
  insertTutorialForm: {
    after:{
     insert:function(error, result){
        $('#addTutorialModel').closeModal();
       }
     }
  }
});

AutoForm.hooks({
  insertRootCommentForm: {
    after:{
     insert:function(error, result){
        $('#addCommentModel').closeModal();
       }
     }
  }
});

AutoForm.hooks({
  updateTutorialForm: {
    after:{
     update:function(error, result){
        $('#editTutorialModal').closeModal();
       }
     }
  }
});

//insertReplyCommentForm
AutoForm.hooks({
  insertReplyCommentForm: {
    after:{
     insert:function(error, result){
        $('#replyCommentModal').closeModal();
       }
     }
  }
});