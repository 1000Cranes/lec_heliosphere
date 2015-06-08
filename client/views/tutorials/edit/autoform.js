AutoForm.hooks({
  updateTutorialForm: {
    after:{
     update:function(error, result){
        $('#editTutorialModal').closeModal();
       }
     }
  }
});