// Meteor.startup(function () {
//   $(".button-collapse").sideNav();   
// });

Template.header.onRendered(function(){
  this.$(".button-collapse").sideNav();
});