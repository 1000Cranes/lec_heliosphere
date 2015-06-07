AutoForm.hooks({
  updateCommentForm: {
    after:{
     update:function(error, result){
        $('#editCommentModal').closeModal();
       }
     }
  }
});