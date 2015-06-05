Template.header.onRendered(function(){
  this.$(".button-collapse").sideNav();
  $("#at-nav-button").addClass('btn-floating').addClass('btn-large').removeClass('btn').html("<i class='large mdi-action-account-box'></i>");
});