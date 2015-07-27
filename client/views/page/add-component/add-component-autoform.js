AutoForm.hooks({
  insertRatingForm: {
    after:{
     insert:function(error, result){
        $('#addRatingModel').closeModal();
        //$('.modal-trigger').leanModal();
       }
     }
  }
});

AutoForm.hooks({
  updateTutorialForm: {
    after:{
     update:function(error, result){
        $('#editTutorialModal').closeModal();
        //$('.modal-trigger').leanModal();
       }
     }
  }
});