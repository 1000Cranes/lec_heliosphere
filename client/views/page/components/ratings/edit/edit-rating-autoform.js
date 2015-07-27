AutoForm.hooks({
  updateRatingForm: {
    after:{
     update:function(error, result){
        $('#editRatingModal').closeModal();
       }
     }
  }
});