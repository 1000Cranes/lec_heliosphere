AutoForm.hooks({
  insertReplyCommentForm: {
    after:{
     update:function(error, result){
        $('#replyCommentModal').closeModal();
        $('.modal-trigger').leanModal();
       }
     }
  }
});