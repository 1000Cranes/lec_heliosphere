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
  updateTutorialForm: {
    after:{
     update:function(error, result){
        $('#editTutorialModal').closeModal();
       }
     }
  }
});